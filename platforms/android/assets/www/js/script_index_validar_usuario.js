/*=============================================
* Funcion que se ejecuta cuando se abre la pagina web
*==============================================*/
$(document).ready(function(){ 
  /*
  * Llamamos la función verificarUsuario para saber si hay un paciente asignado al dispositivo
  */
  verificarUsuario();
  //alert("probando_script");
});

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("bd_proyecto_tele", "1.0", "proyecto_tele", 1000000);

/*=============================================
* FUNCION PARA DETECTAR SI SE PRESIONA EL BOTON ATRAS DEL DISPOSITIVO
*==============================================*/
document.addEventListener("backbutton", onBackKeyDown, false);
/*=============================================
* FUNCION PARA DENEGAR EL USO DEL BOTON ATRAS DEL DISPOSITIVO
* SE MUESTRA UNA ALERTA DE ADVERTENCIA
*==============================================*/
function onBackKeyDown(e) {
  e.preventDefault();
  if(navigator.notification && navigator.notification.alert){
    navigator.notification.alert("Advertencia:\n\n<<Acción no permitida>>", null, "Proyecto - Teleinformática II", "Ok");
  }else{
    alert("Advertencia:\n\n<<Acción no permitida>>");
  }
}

/*=============================================
* Funcion para hacer un select a la tabla usuario y verificar si esta creada la tabla usuario
* sino nos redirige a la pagina para crear un paciente
*==============================================*/
function verificarUsuario() {
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM usuario";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla usuario -> '+resultSet.rows.item(0).c);
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      //alert("Hay conexion a la red");
      window.localStorage.setItem('codigo_paciente', 0);
      if(navigator.notification && navigator.notification.alert){
        navigator.notification.alert("No hay un paciente asignado al dispositivo!!!", null, "Proyecto - Teleinformática II", "Aceptar");
      }else{
        alert("No hay un paciente asignado al dispositivo!!!");
      }
      window.location="./websites/crear_paciente.html";
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
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
    //alert("Hay conexión a internet!");
    //alert("Tenga paciencia se cargaran los archivos al servidor!");
  } else {
    alert("No tiene conexion a internet!");
    //location.href="./index.php";
  }
}

