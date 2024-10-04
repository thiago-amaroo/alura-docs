import { documentosColecao } from "./dbConnect.js";

function encontrarDocumento ( nomeDocumento ) {
  const documento = documentosColecao.findOne( {
    nome: nomeDocumento
  });
    //documento é uma promisse do js. Executo-a com await antes
  return documento;
}
  
function atualizaDocumento ( nomeDocumento, texto ) {
  const atualizacao = documentosColecao.updateOne( {
    nome: nomeDocumento
  }, {
    $set: { 
      texto: texto
    }
  });
    //documento é uma promisse do js. Executo-a com await antes
  return atualizacao;
}

export { encontrarDocumento, atualizaDocumento };