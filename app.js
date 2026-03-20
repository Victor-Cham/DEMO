// INICIO
document.addEventListener("DOMContentLoaded", () => {

mostrarRegistros();
mostrarOpcionesAudio();
mostrarProgramacion();

setInterval(verificarProgramacion, 10000);

});



//////////////////////////////
// REGISTROS
//////////////////////////////


// GUARDAR REGISTRO
function guardarRegistro(){

const texto = document.getElementById("texto").value.trim();

if(texto === ""){
alert("Escribe un texto");
return;
}

let registros = JSON.parse(localStorage.getItem("registros")) || [];

const nuevo = {

id: Date.now(),
texto: texto

};

registros.push(nuevo);

localStorage.setItem("registros", JSON.stringify(registros));

document.getElementById("texto").value="";

mostrarRegistros();
mostrarOpcionesAudio();

}



// MOSTRAR REGISTROS

function mostrarRegistros(){

let registros = JSON.parse(localStorage.getItem("registros")) || [];

const tabla = document.getElementById("listaRegistros");

tabla.innerHTML="";

registros.forEach(r=>{

const fila = document.createElement("tr");

fila.innerHTML = `

<td>${r.texto}</td>

<td>

<button onclick="reproducirTexto('${r.texto}')">▶</button>

<button onclick="editarRegistro(${r.id})">✏</button>

<button onclick="eliminarRegistro(${r.id})">❌</button>

</td>

`;

tabla.appendChild(fila);

});

}



// EDITAR REGISTRO

function editarRegistro(id){

let registros = JSON.parse(localStorage.getItem("registros")) || [];

const registro = registros.find(r=>r.id===id);

const nuevoTexto = prompt("Editar texto", registro.texto);

if(nuevoTexto){

registro.texto = nuevoTexto;

localStorage.setItem("registros", JSON.stringify(registros));

mostrarRegistros();
mostrarOpcionesAudio();

}

}



// ELIMINAR REGISTRO

function eliminarRegistro(id){

let registros = JSON.parse(localStorage.getItem("registros")) || [];

registros = registros.filter(r => r.id !== id);

localStorage.setItem("registros", JSON.stringify(registros));

mostrarRegistros();
mostrarOpcionesAudio();

}



//////////////////////////////
// TEXTO A VOZ
//////////////////////////////

function reproducirTexto(texto){

const speech = new SpeechSynthesisUtterance(texto);

speech.lang="es-ES";

speechSynthesis.speak(speech);

}



//////////////////////////////
// PROGRAMACION TIPO ZARARADIO
//////////////////////////////


// CARGAR SELECT

function mostrarOpcionesAudio(){

let registros = JSON.parse(localStorage.getItem("registros")) || [];

const select = document.getElementById("audioProgramado");

select.innerHTML="";

registros.forEach(r=>{

const option = document.createElement("option");

option.value = r.texto;
option.text = r.texto;

select.appendChild(option);

});

}



// PROGRAMAR AUDIO

function programarAudio(){

const hora = document.getElementById("horaProgramada").value;
const texto = document.getElementById("audioProgramado").value;

if(!hora){

alert("Selecciona una hora");
return;

}

let programacion = JSON.parse(localStorage.getItem("programacion")) || [];

const nuevo = {

id: Date.now(),
hora: hora,
texto: texto

};

programacion.push(nuevo);

localStorage.setItem("programacion", JSON.stringify(programacion));

mostrarProgramacion();

}



// MOSTRAR PROGRAMACION

function mostrarProgramacion(){

let programacion = JSON.parse(localStorage.getItem("programacion")) || [];

const tabla = document.getElementById("listaProgramacion");

tabla.innerHTML="";

programacion.forEach(p=>{

const fila = document.createElement("tr");

fila.innerHTML=`

<td>${p.hora}</td>

<td>${p.texto}</td>

<td>

<button onclick="reproducirTexto('${p.texto}')">▶</button>

<button onclick="editarProgramacion(${p.id})">✏</button>

<button onclick="eliminarProgramacion(${p.id})">❌</button>

</td>

`;

tabla.appendChild(fila);

});

}



// EDITAR PROGRAMACION

function editarProgramacion(id){

let programacion = JSON.parse(localStorage.getItem("programacion")) || [];

const prog = programacion.find(p=>p.id===id);

const nuevaHora = prompt("Editar hora (HH:MM)", prog.hora);

if(nuevaHora){

prog.hora = nuevaHora;

localStorage.setItem("programacion", JSON.stringify(programacion));

mostrarProgramacion();

}

}



// ELIMINAR PROGRAMACION

function eliminarProgramacion(id){

let programacion = JSON.parse(localStorage.getItem("programacion")) || [];

programacion = programacion.filter(p=>p.id!==id);

localStorage.setItem("programacion", JSON.stringify(programacion));

mostrarProgramacion();

}



//////////////////////////////
// AUTOMATIZACION
//////////////////////////////

function verificarProgramacion(){

const ahora = new Date();

const horaActual =
ahora.getHours().toString().padStart(2,'0') + ":" +
ahora.getMinutes().toString().padStart(2,'0');

let programacion = JSON.parse(localStorage.getItem("programacion")) || [];

programacion.forEach(p=>{

if(p.hora === horaActual){

reproducirTexto(p.texto);

}

});

}



//////////////////////////////
// DECIR HORA
//////////////////////////////

function decirHora(){

const ahora = new Date();

const horas = ahora.getHours();
const minutos = ahora.getMinutes();

const texto = `La hora actual es ${horas} horas con ${minutos} minutos`;

reproducirTexto(texto);

}



//////////////////////////////
// DECIR CLIMA
//////////////////////////////

async function decirClima(){

try{

const url="https://api.open-meteo.com/v1/forecast?latitude=-11.60&longitude=-76.14&current_weather=true";

const respuesta = await fetch(url);

const data = await respuesta.json();

const temperatura = data.current_weather.temperature;
const viento = data.current_weather.windspeed;

const texto = `La temperatura actual en MCP es ${temperatura} grados. Velocidad del viento ${viento} kilómetros por hora`;

reproducirTexto(texto);

}catch(error){

console.log(error);

reproducirTexto("No se pudo obtener el clima");

}

}
