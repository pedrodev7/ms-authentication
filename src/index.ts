import express from "express";
import errorHandler from "./middleware/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoutes from "./routes/status.routes";
import usersRoute from "./routes/users.routes";

const app = express();

// Configurações da Aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurações de Rotas
app.use(usersRoute);
app.use(statusRoutes);
app.use(authorizationRoute);

// Configuração dos Handlers de Erro
app.use(errorHandler);

// Configurações do Servidor
app.listen(3000, () => {
  console.log("Aplicação Executando na porta 3000");
});
