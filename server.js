import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
app.use(express.static("uploads"));
// Configura as rotas no aplicativo Express
routes(app);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor Escutando..."); // Loga no console que o servidor está ativo
});