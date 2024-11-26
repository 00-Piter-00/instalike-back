import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conexão com o banco de dados usando a string de conexão
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função para buscar todos os posts na coleção "posts"
export async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes"); // Acessa o banco de dados
    const colecao = db.collection("posts");     // Obtém a coleção "posts"
    return colecao.find().toArray();            // Retorna todos os documentos da coleção
}

// Função para criar um novo post na coleção "posts"
export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes"); // Acessa o banco de dados
    const colecao = db.collection("posts");     // Obtém a coleção "posts"
    return colecao.insertOne(novoPost);         // Insere um novo documento na coleção
}

// Função para atualizar um novo post na coleção "posts"
export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes"); // Acessa o banco de dados
    const colecao = db.collection("posts");     // Obtém a coleção "posts"
    const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost}); // Atualiza um post
}