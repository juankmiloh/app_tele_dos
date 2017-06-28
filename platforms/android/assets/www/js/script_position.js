$(document).ready(function(){ 
  //alert("probando script!!");
  iniciar();
  fechaFooter();
  //setTimeout('recargar()',10000);
});

function iniciar(){
  obtener();
}
 
function obtener(){
  navigator.geolocation.getCurrentPosition(mostrar, gestionarErrores);
}
 
function mostrar(posicion){
  $('#id_latitud').val(posicion.coords.latitude);
  $('#id_longitud').val(posicion.coords.longitude); 
  enviarDatos();
}

function enviarDatos(){
  var latitud = $('#id_latitud').val();
  var longitud = $('#id_longitud').val();

  $.post('http://proyectotele2.co.nf/php/guardar_ubicacion.php',{
    Latitud: latitud,
    Longitud: longitud,
  },function(e){
    location.href="./ubicacion_temporal.html";
  });
}

function recargar(){
  location.href="./ubicacion_temporal.html";
}
 
function gestionarErrores(error){
  alert('Error: '+error.code+' '+error.message+ '\n\nPor favor compruebe que está conectado '+
  'a internet y habilite la opción permitir compartir ubicación física');
}

/* Fecha del footer */
function fechaFooter(){
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
  var f = new Date();
  var fecha = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
  $('#fecha_footer').text(fecha);
}