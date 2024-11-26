import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Controlador para listar todos os posts
export async function listarPosts(req, res) {
    const posts = await getTodosPosts(); // Chama a função para obter os posts do banco
    res.status(200).json(posts);        // Retorna os posts como JSON
}

// Controlador para criar um novo post
export async function postarNovoPost(req, res) {
    const novoPost = req.body; // Obtém os dados do post do corpo da requisição
    try {
        const postCriado = await criarPost(novoPost); // Insere o post no banco
        res.status(200).json(postCriado);            // Retorna o post criado
    } catch (erro) {
        console.error(erro.message);                // Loga o erro no console
        res.status(500).json({ "Erro": "Falha na requisição" }); // Retorna erro ao cliente
    }
}

// Controlador para upload de imagem e criação de post com ela
export async function uploadImagem(req, res) {
    // Cria um novo post com informações da imagem enviada
    const novoPost = {
        descricao: "",                 // Descrição padrão
        imgUrl: req.file.originalname, // Nome original da imagem
        alt: ""                        // Texto alternativo vazio
    };

    try {
        const postCriado = await criarPost(novoPost); // Insere o post no banco
        // Renomeia o arquivo para incluir o ID gerado no banco
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada); // Renomeia o arquivo local
        res.status(200).json(postCriado);              // Retorna o post criado
    } catch (erro) {
        console.error(erro.message);                  // Loga o erro no console
        res.status(500).json({ "Erro": "Falha na requisição" }); // Retorna erro ao cliente
    }
}

// Controlador para atualizar um novo post
export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postCriado = await atualizarPost(id, post); // Insere o post no banco
        res.status(200).json(postCriado);            // Retorna o post criado
    } catch (erro) {
        console.error(erro.message);                // Loga o erro no console
        res.status(500).json({ "Erro": "Falha na requisição" }); // Retorna erro ao cliente
    }
}