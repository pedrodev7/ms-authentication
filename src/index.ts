import express from "express";
import statusRoutes from "./routes/status.routes";
import usersRoute from "./routes/users.routes";

const app = express();

// Configurações da Aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurações de Rotas
app.use(usersRoute);
app.use(statusRoutes);

// Configurações do Servidor
app.listen(3000, () => {
  console.log("Aplicação Executando na porta 3000");
});
