function obtenerMensaje(){
    let id=$("#idMensaje").val();

    $.ajax({
        url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message/' +  id,
        type : 'GET',
        //dataType: 'json',
        //contentType:'application/json',
        success : function(response) {
            let cs=response.items;
            $("#listaMensajes").empty();
            for(i=0;i<cs.length;i++){
              $("#cuerpoMensaje").val(cs[i].messagetext);
              $("#listaMensajes").append(cs[i].id+" <b>"+cs[i].messagetext+"</b> ");
              $("#listaMensajes").append("<button onclick='borrarMensaje("+cs[i].id+")'>Borrar</button><br> </br>");
            }
        },
        error : function(xhr, status) {
            console.log("Ha ocurrido un problema al mostrar los clientes");

        }
    });
}

function leerMensajes(){
    //FUNCION GET
      $.ajax({
          url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message',
          type : 'GET',
          //dataType: 'json',
          //contentType:'application/json',
          success : function(response) {
                 let cs=response.items;
                 $("#listaMensajes").empty();
                 for(i=0;i<cs.length;i++){
                     $("#listaMensajes").append(cs[i].id+" <b>"+cs[i].messagetext+"</b> ");
                     $("#listaMensajes").append("<button onclick='borrarMensaje("+cs[i].id+")'>Borrar</button><br>");
                 }
          },
          error : function(xhr, status) {
            console.log("Ha ocurrido un problema al mostrar los mensajes");
          }
      });
}


function guardarMensaje() {
    let id=$("#idMensaje").val();
    let cuerpoMensaje=$("#cuerpoMensaje").val();

    let data={
        id:parseInt(id),
        messagetext:cuerpoMensaje
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);


    $.ajax({
        url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message',
        type : 'post',
        dataType: 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            //alert("El mensaje se ha enviado correctamente");
        },
        error : function(xhr, status) {
            //alert('Ha ocurrido un problema al enviar el mensaje');
        },
        complete: function(){
            leerMensajes();
        }
    });
}


function editarMensaje(){
    let id=$("#idMensaje").val();
    let cuerpoMensaje=$("#cuerpoMensaje").val();

    let data={
        id:parseInt(id),
        messagetext:cuerpoMensaje
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message',
        type : 'PUT',
         dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            //alert("El mensaje se ha enviado correctamente");
        },
        error : function(xhr, status) {
           //alert('Ha ocurrido un problema al actualizar el mensaje');
        },
        complete: function(){
            leerMensajes();
        }
    });

}

function borrarMensaje(idMensaje){
    let data={
        id:idMensaje
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message',
        type : 'DELETE',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            console.log("El mensaje se ha borrado correctamente");
        },
        error : function(xhr, status) {
           alert('Ha ocurrido un problema al borrar el mensaje');
        },
        complete: function(){
            leerMensajes();
        }
    });

}
