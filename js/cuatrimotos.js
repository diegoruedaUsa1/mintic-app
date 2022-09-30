function obtenerCuatrimoto(){
	let id=$("#idCuatrimoto").val();

	$.ajax({
	    url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/quadbike/quadbike/' +  id,
	    type : 'GET',
			dataType: 'json',
			contentType:'application/json',
	    success : function(response) {
	   		let cs=response.items;
	   		$("#listaCuatrimotos").empty();
	   		for(i=0;i<cs.length;i++){
					$("#marcaCuatrimoto").val(cs[i].brand);
					$("#modeloCuatrimoto").val(cs[i].model);
					$("#idCategoriaCuatrimoto").val(cs[i].category_id);
					$("#nombreCuatrimoto").val(cs[i].name);
	   			$("#listaCuatrimotos").append(cs[i].id+" <b>"+cs[i].brand+"</b> "+cs[i].model+" "+cs[i].category_id+"<b>"+" "+cs[i].name + " ");
	   			$("#listaCuatrimotos").append("<button onclick='borrarCuatrimoto("+cs[i].id+")'>Borrar</button></br> </br>");
	   		}
	    },
	    error : function(xhr, status) {
	      alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}

function leerCuatrimotos(){
    //FUNCION GET
      $.ajax({
          url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/quadbike/quadbike',
          type : 'GET',
          //dataType: 'json',
          //contentType:'application/json',
					header: 'Access-Control-Allow-Origin: *',
          success : function(response) {
                 let cs=response.items;
                 $("#listaCuatrimotos").empty();
                 for(i=0;i<cs.length;i++){
                     $("#listaCuatrimotos").append(cs[i].id+" <b>"+cs[i].brand+"</b> "+cs[i].model+" "+cs[i].category_id+" "+ cs[i].name);
                     $("#listaCuatrimotos").append("<button onclick='borrarCuatrimoto("+cs[i].id+")'>Borrar</button><br>");
                 }
          },
          error : function(xhr, status) {
            alert("Ha ocurrido un problema al mostrar las cuatrimotos");
          }
      });
    }


function guardarCuatrimoto() {
    let id=$("#idCuatrimoto").val();
    let modelo=$("#modeloCuatrimoto").val();
    let marca=$("#marcaCuatrimoto").val();
    let idCategoria=$("#idCategoriaCuatrimoto").val();
    let nombre=$("#nombreCuatrimoto").val();

    let data={
        id:parseInt(id),
        brand:marca,
        model:modelo,
        category_id:parseInt(idCategoria),
        name:nombre
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);


    $.ajax({
        url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/quadbike/quadbike',
        type : 'post',
        dataType: 'json',
        data:dataToSend,
        contentType:'application/json',
				header: 'Access-Control-Allow-Origin: *',
        success : function(response) {
            //console.log("La cuatrimoto se ha guardado correctamente");
        },
        error : function(xhr, status) {
            //console.log('Ha ocurrido un problema al guardar la cuatrimoto');
        },
        complete: function(){
            leerCuatrimotos();
        }
    });
}


function editarCuatrimoto(){
    let id=$("#idCuatrimoto").val();
    let modelo=$("#modeloCuatrimoto").val();
    let marca=$("#marcaCuatrimoto").val();
    let idCategoria=$("#idCategoriaCuatrimoto").val();
    let nombre=$("#nombreCuatrimoto").val();

    let data={
        id:parseInt(id),
        brand:marca,
        model:modelo,
        category_id:parseInt(idCategoria),
        name:nombre
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/quadbike/quadbike',
        type : 'PUT',
         dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            //console.log("La cuatrimoto se ha actualizado correctamente");
        },
        error : function(xhr, status) {
            //console.log('Ha ocurrido un problema al actualizar la cuatrimoto');
        },
        complete: function(){
            leerCuatrimotos();
        }
    });

}

function borrarCuatrimoto(idCuatrimoto){
    let data={
        id:idCuatrimoto
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/quadbike/quadbike',
        type : 'DELETE',
        //dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            console.log("La cuatrimoto se ha borrado correctamente");
        },
        error : function(xhr, status) {
           alert('Ha ocurrido un problema al borrar la cuatrimoto');
        },
        complete: function(){
            leerCuatrimotos();
        }
    });

}
