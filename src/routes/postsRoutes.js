import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controlers/postControler.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configuração do armazenamento para uploads de imagens
const storage = multer.diskStorage({
    // Define o destino dos arquivos enviados
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão armazenados
    },
    // Define o nome do arquivo salvo no servidor
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Usa o nome original do arquivo
    }
});

// Configuração do middleware de upload com o Multer
const upload = multer({ 
    dest: "./uploads",  // Define o destino padrão
    storage             // Usa a configuração de armazenamento personalizada
});

const routes = (app) => {
    // Middleware para interpretar JSON no corpo das requisições
    app.use(express.json());
    app.use(cors(corsOptions))

    // Rota para listar todos os posts
    app.get("/posts", listarPosts);

    // Rota para criar um novo post
    app.post("/posts", postarNovoPost);

    // Rota para upload de imagem e criação de post com a imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);

    // Rota para atualizar um post
    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;