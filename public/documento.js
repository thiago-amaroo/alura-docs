import { emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

//Pegando o nome do documento (JS, node, etc) da url
const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

//atualizando o titulo do documento na pagina
const tituloDocumento = document.getElementById("titulo-documento");
tituloDocumento.textContent = nomeDocumento || "Documento sem título";

//informando ao socket qual documento usuario esta, js, node, etc. Assim que alguem abre conexao no socket
selecionarDocumento(nomeDocumento);

const textoEditor = document.getElementById("editor-texto");

textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({
    texto: textoEditor.value, 
    nomeDocumento: nomeDocumento
  }) ;
});

//essa funcao vai ser chamada em socket-front-documento.js quando escuta a resposta do servidor socket pra atualizar a caixa de texto
function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

export {atualizaTextoEditor};
