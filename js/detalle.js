// Hemos omitido los acentos en los comentarios por compatibilidad
function cargarInfo(id){ //Funcion que busca los elementos dentro del json
  $.ajax({
    url: "info.json", 
    type:'GET'
  }).done(function(respuesta){
     response = respuesta.eventos; 
     var elemento = buscarElemento(response, id); 
     colocarElemento(elemento);
  })
}

function colocarElemento(elemento){ // Funcion que coloca los elementos dentro del html
  var html = `<div class="col-12 card text-left">
                <br>
                <h1>${elemento.nombre}</h1>
                <p> ${elemento.fecha} - ${elemento.lugar} </p>
                <p><strong>${elemento.descripcion} </strong>
                <p>Costo: ${elemento.precio}</p>
                <p>Invitados: ${elemento.invitados}</p>
              </div>
  ` ; 

  $("#evento").append(html)

}

function buscarElemento(respuesta, id){ //funcion que busca el elemento con el id dentro del arreglo
  var elemento ;
  for(let i = 0 ; i<respuesta.length ; i++){
    if(respuesta[i].id == id ){
      elemento = respuesta[i];
    }
  }
  return elemento ; 
}
$(document).ready(function () {
  var id = location.search.match(/id=(\d)*/)[1];
  cargarInfo(id);

  //Esta es la instruccion para tomar el id del URL detalle.html?id=<identificador>

  //Carga los datos que estan en el JSON (info.json) usando AJAX

  //Guarda el resultado en una variable

  //Busca el elemento en el arreglo

  //Crea un string que contenga el HTML que describe el detalle del evento

  //Modifica el DOM agregando el html generado dentro del div con id=evento

});
