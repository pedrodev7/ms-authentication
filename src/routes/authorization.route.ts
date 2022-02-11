import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.models";
import userRepository from "../repositories/user.repository";
import JWT from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes";
import basicAuthenticacionMiddleware from "../middleware/basic-authenticacion.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticacionMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = req.user;
        const jwtPayLoad = {username: user.username}
        const jwtOptions = {subject: user?.uuid}
        const secretKey = 'my_secret_key'
        
        const jwt = JWT.sign(jwtPayLoad, secretKey, jwtOptions);
        
        res.status(StatusCodes.OK).json({token: jwt})

    } catch (error) {
        next(error);
    }

});

export default authorizationRoute;