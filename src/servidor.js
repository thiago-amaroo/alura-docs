import "dotenv/config";
import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import "./dbConnect.js";

const app = express();
const porta = process.env.porta || 3000;

//isso da o caminho atual que estou, incluindo pastas ate servidor.js
const caminhoAtual = url.fileURLToPath(import.meta.url);
//join, caminho atual, subo 2 niveis pra raiz e terceiro argumento public
const diretorioPublico = path.join(caminhoAtual, "../../", "public");

//informo ao express que meu diretorio static é diretorioPublico
app.use(express.static(diretorioPublico));

//vou usar o servidor http do node pq socket io precisa ter mais controle sobre ele. Nao uso o servidor do express (app.listen)
const servidorHttp = http.createServer(app);

servidorHttp.listen(porta, () => {
  console.log(`Servidor escuntando na porta ${porta}`);
});

//metodos do socket
const io = new Server(servidorHttp);

export default io;