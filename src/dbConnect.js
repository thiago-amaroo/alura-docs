import { MongoClient } from "mongodb";

const cliente = new MongoClient("mongodb+srv://admin:123@aluracluster.v1cry.mongodb.net/?retryWrites=true&w=majority&appName=aluraCluster");

//para variavel nao ficar presa no bloco try e poder ser usada em outros lugares
let documentosColecao;

try {
  await cliente.connect();

  const db = cliente.db("alura-websockets");
  documentosColecao = db.collection("documentos");

  //Se conseguiu conectar ao db e à colecao, exibe console.log. Se deu algum erro já foi pro catch
  console.log("Conexao com o banco de dados feita com sucesso");

} catch(erro) {
  console.log(erro);
}



export { documentosColecao };