$(document).ready(function(){ 
  probar_conexion_red();
});

/*=============================================
* Funcion que nos permite conectarnos al servidor y capturar el codigo del ultimo paciente creado en el servidor
* el codigo capturado sera el asignado al paciente del dispositivo
*==============================================*/
function verificarCodUsuario(){
  $.ajax({
    url: "http://proyectotele2.co.nf/php/cargar_codigo_paciente.php",
    type: "POST",
    dataType : "JSON",
    beforeSend: function () {
      $('#txt_codigo').val("Procesando, espere por favor...");
      $('#txt_nombre_usuario').val("Procesando, espere por favor...");
    },
    success: function(response){ //response recibe los datos en formato JSON
      $.each(response, function(i,items){
        $('#txt_codigo').val(items.k_codusuario);
        $('#txt_nombre_usuario').val("Paciente_"+items.k_codusuario);
      });
    }
  });
}

/* /////////////////// VERIFICAR CONEXION A INTERNET ////////////////////////// */

function probar_conexion_red(){
  /*--- primero probamos la conexion a la red 
  se crea un campo donde se carga una imagen, si esta carga hay conexion ---*/
  var tabla = $('#dataTable').attr("id");
  addRow(tabla);
}

function addRow(tableID) { 
  /*----Se toma el valor del control [tableID], 
        donde queremos que aparezcan los controles 
        creados dinamicamente ------------*/
  var table = document.getElementById(tableID);
  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);

  //---------- Se crea el campo oculto donde se carga la imagen ------------//

  var cell1 = row.insertCell(0);
  cell1.innerHTML =  '<img src="http://static.forosdelweb.com/fdwtheme/logo-navidad.png?'+Math.random()+
  '" style="display:none" onload="valor_conexion(1)" onerror="valor_conexion(0)" />';
}

function valor_conexion(conexion) {
  if (conexion==1) {
    //alert("Hay conexion conexión a internet!");
    verificarCodUsuario();
  } else {
    alert("No tiene conexión a internet!");
    location.href="../index.html";
  }
}