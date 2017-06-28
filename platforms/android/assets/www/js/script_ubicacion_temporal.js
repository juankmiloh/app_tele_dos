$(document).ready(function(){
	//alert("Probando script!");
	fechaFooter();
	setTimeout('recargar()',5000);
	$('.fb').show();
  	$('.fbback').show();
	$('body').css('overflow','hidden');
});

function recargar(){
	location.href="./ubicacion_persona.html";
}

/* Fecha del footer */
function fechaFooter(){
	var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
	var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
	var f = new Date();
	var fecha = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
	$('#fecha_footer').text(fecha);
}

/*=============================================
* Funcion que permite cerrar la ventana que aparece mientras se cargan las tablas a la base de datos
*==============================================*/
function cerrarVentanaCarga(){
  $('#fbdrag1').fadeOut().prev().fadeOut();
  $('body').css('overflow','auto');
}