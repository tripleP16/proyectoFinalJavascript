var fechaActual;
var eventos;
function cargarInfo(){  //Funcion que obtiene la informacion del JSON
  $.ajax({
    url:"info.json", 
    type:'GET'
  }).done(function(respuesta){
    fechaActual = respuesta.fechaActual;
    eventos = respuesta.eventos; 
    var aux = convertirFecha(fechaActual)
    compararEventos(aux, eventos); 
    
  })
}

function comparadorFechas(fechaActual, evento){ //Funcion que devuelve True si la fechActual es mayor que el evento 
  var fechaEvento = convertirFecha(evento);
  if(fechaActual > fechaEvento){
    return true;
  }else {
    return false;
  }
}

function convertirFecha(fechaActual){ // Funcion que convoerte de un string con guiones ej : 2018-12-12 al formato date 
  var fecha = fechaActual.split("-", 3); 
  var aux = new Date (parseInt(fecha[0]), parseInt(fecha[1])-1, parseInt(fecha[2])); 
  return aux; 
}
function compararEventos(fechaActual, eventos){ // Funcion que compara con la fecha actual del JSON y los clsifica entre eventos a futuros y los que ya pasaron
  var arrayPasados = [];
  var arrayFuturos = [];
  for (let i = 0; i < eventos.length; i++) {
    if(comparadorFechas(fechaActual, eventos[i].fecha)){
      arrayPasados.push(eventos[i]);
    }else {
      arrayFuturos.push(eventos[i]);
    }
  }
  arrayPasados = ordenarArray(arrayPasados);
  arrayFuturos = ordenarArray(arrayFuturos);

  colocarElemento(arrayFuturos, true);
  colocarElemento(arrayPasados, false); 
}

function ordenarArray(array){ // funcion que ordena los array por fecha de menor a mayor 
  let temp ; 
  let j ;
  for (let i = 1; i < array.length; i++) {
    j = i ; 
    temp = array[i];
    while(j > 0 && comparadorFechas(convertirFecha(array[j-1].fecha), temp.fecha )){
      array[j] = array[j-1]; 
      j--;
     
    }
    array[j] = temp;
  }
  return array;
}

function colocarElemento(array, check){ // funcion que coloca los dos elementos en el array 
  if (check == true){
    var html_1 = ""; 
  
    html_1 += ` <div class="col-5 card text-left">
                  <br>
                  <h1><a href="detalle.html?id=${array[0].id}">${array[0].nombre}</a></h1>
                  <p> ${array[0].fecha} </p>
                  <p> <strong>${array[0].descripcion} </strong>
                </div>
                <div class="col-1"></div>
                <div class="col-5 card">
                  <br>
                  <h1><a href="detalle.html?id=${array[1].id}">${array[1].nombre}</a></h1>
                  <p> ${array[1].fecha} </p>
                  <p> <strong>${array[1].descripcion} </strong>
                </div>
                `
   
    $("#proximos").append(html_1);
  }else{
    var html_1 = ""; 
  
    html_1 += ` <div class="col-5 card text-left">
                  <br>
                  <h1><a href="detalle.html?id=${array[array.length-1].id}">${array[array.length-1].nombre}</a></h1>
                  <p> ${array[array.length-1].fecha} </p>
                  <p> <strong>${array[array.length-1].descripcion} </strong>
                </div>
                <div class="col-1"></div>
                <div class="col-5 card">
                  <br>
                  <h1><a href="detalle.html?id=${array[array.length-2].id}">${array[array.length-2].nombre}</a></h1>
                  <p> ${array[array.length-2].fecha} </p>
                  <p> <strong>${array[array.length-2].descripcion} </strong>
                </div>
                `
    $("#pasados").append(html_1);
  }
}

$(document).ready(function () {
  cargarInfo();
});
