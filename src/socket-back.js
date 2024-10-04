import { atualizaDocumento, encontrarDocumento } from "./documentosDb.js";
import io from "./servidor.js";

//se algum cliente emitir um evento c/ connection, io vai ouvir e executar funcao callback 
//um exemplo> em documento.html quero conexao c/ socket. em documento.js tenho o codigo const socket = io(); que cria um evento connection
//posso receber socket na callback e acessar varias informacoes, inclusive id do socket, eventos que sao enviados pelo socket
//socket na callback é o socket de 1 cliente
io.on("connection", (socket) => {
  console.log("um cliente se conectou com ID: " + socket.id);

  //Ouve o evento que informa em qual tipo de documento usuario esta. ex. js, node, etc
  //callback é uma funcao que esta vindo do emissor. nessa funcao callback tem a funcao atualizaTextoEditor() que vai ser executada;
  //é uma outra forma de responder, nao precisso emitir nada para resposta. vem uma funcao com emissor que sera executada como devolucao
  socket.on("selecionar_documento", async (nomeDocumento, devolverTexto ) => {
    //socket join colocaa conexao feita nesse socket em uma "sala". Ele agrupa conexoes sockets de clintes diferentes que tem o mesmo nomeDocumento
    socket.join(nomeDocumento);

    const documento = await encontrarDocumento(nomeDocumento);

    if(documento) {
      devolverTexto(documento.texto);
      // socket.emit("texto_nome_documento", documento.texto); //vai emitir apenas pro cliente desse socket
    }
    

  });

  //ouvindo o evento que vem la do front, nomeado texto_editor. Na callback recebe o valor enviado junto com o evento, no caso o valor do texto
  //front-end tbm envia o nome do documento para servidor emitir resposta aos sockets que estao nesse documento tbm: socket.join(nomeDocumento) acima
  socket.on("texto_editor", async ( { texto, nomeDocumento }  )  => {
    //salvando texto no bd documento antes de responder
    const atualiacao = await atualizaDocumento(nomeDocumento, texto);
    //metodo updateOne retorna modifiedCount false or true
    if(atualiacao.modifiedCount) {
      //com socket.broadcast.emit("texto_editor_clientes", texto) envio para todos os clientes conectados nos sockets, menos para quem enviou o evento. 
      //com io.emit envio evento para todos os clientes, inclusive o que está conectado ao socket.
      //com socket.emit envio o evento de volta para o cliente conectado ao socket.
      //se quiser enviar inclusive para cliente do socket uso io.to
      //enviar para mais de uma sala: socket.to([sala1, sala2])
      //except para nao enviar a alguma sala: io.to(["sala1", "sala2"]).except("sala3").emit("nome_do_evento"); - envia para todos, inclusive cliente do socket que gerou evento, menos para a sala 3
      
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto );
    }
  });


  socket.on("disconnect", (motivo) => {
    console.log(`Cliente socket id ${socket.id} desconectado. Motivo: ${motivo}`);
  });
});


