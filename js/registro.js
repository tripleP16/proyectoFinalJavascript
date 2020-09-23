// Hemos omitido los acentos en los comentarios por compatibilidad

function validar(formulario) {
  if (formulario.nombres.value.trim().length == 0){
    document.getElementById("errornombres").innerHTML = "Este Campo es Obligatorio"; 
    formulario.nombres.focus(); 
    return false; 
  }
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(formulario.email.value)) {
    document.getElementById("errorEmail").innerText = "Campo invalido";
    formulario.email.focus();
    return false;
  }

  if(formulario.contrasena.value.trim().length < 7){
    document.getElementById("errorContrasena").innerText = "La contrasena debe tener al menos 7 caracteres";
    formulario.contrasena.focus();
    return false; 
  }

  if (formulario.contrasena.value != formulario.confirmacion.value) {
    document.getElementById("errorConfirmacion").innerText = "No coincide con contrasena ";
    formulario.confirmacion.focus();
    return false;
  }

  if(formulario.tipo.value == "-1"){
    document.getElementById("errorTipo").innerHTML = "Este campo es obligatorio"; 
    formulario.tipo.focus(); 
    return false; 
  }
  if(!formulario.acepto.checked){
    document.getElementById("errorAcepto").innerHTML = "Este campo es obligatorio";
    return false;
  }
  //Expresion regular del correo
  return true;
}
