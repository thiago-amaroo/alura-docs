import { atualizaTextoEditor } from "./documento.js";

//conecta a pessoa que entra em documento.html ao servidor js criado
//gera um evento connection que vai ser ouvido em servidor.js no codigo:
// io.on("connection", () => {
//     console.log("um cliente se conectou");
//   });
//como o front end esta sendo servido no mesmo dominio e porta do servidor (localhost:3000), nao preciso passar argumento algum. Mas se
//por exemplo, o front end estivesse sendo servido no localhost:5000 e o servidor no localhost:3000, precisaria passar:
//const socket = io("http://localhost:3000")
// eslint-disable-next-line no-undef
const socket = io();

//Outra forma de fazer: no terceiro argumento passo uma funcao. No servidor escuto esse evento recebendo a funcao e no retorno, em vez do servidor
//emitir outro evento ele executa essa funcao callback. Assim nao preciso ouvir aqui o evento de resposta no servidor
function selecionarDocumento(nomeDocumento) {
  socket.emit("selecionar_documento", nomeDocumento, (texto) => {
    atualizaTextoEditor(texto);
  });
}

//gerando um evento socket e mandando para o backend junto com o valor do texto editor. Primeiro argumento escolho qq nome pro evento, segundo o valor a ser enviado
//agora servidor precisa escutar esse evento.
function emitirTextoEditor ( dados ) {
  socket.emit("texto_editor", dados);
}

// socket.on("texto_nome_documento", (texto) => {
//   atualizaTextoEditor(texto);
// });

//escutando evento (resposta) do servidor
socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});


export { emitirTextoEditor, selecionarDocumento };