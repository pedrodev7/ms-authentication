import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.models";
import userRepository from "../repositories/user.repository";



async function basicAuthenticacionMiddleware (req: Request, res: Response, next: NextFunction) {
    try{
        const authorizationHeader = req.headers['authorization']; 

        if(!authorizationHeader){
            throw new ForbiddenError('Credenciais não informadas.');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Basic' || !token){
            throw new ForbiddenError('Tipo de autenticação Invalido.');
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
        const [username, password] = tokenContent.split(':')

        if(!username || !password){
            throw new ForbiddenError('Credenciais não preenchidas.');
        }

        const user = await userRepository.findByUserNameAndPassword(username, password);

        if(!user){
            throw new ForbiddenError('Usuário ou senha inválidos');
        }

        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
}

export default basicAuthenticacionMiddleware;