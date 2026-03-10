// INICIO
document.addEventListener("DOMContentLoaded", () => {

mostrarRegistros();
mostrarOpcionesAudio();
mostrarProgramacion();

setInterval(verificarProgramacion, 60000);

});



// GUARDAR REGISTRO
function guardarRegistro(){

const texto = document.getElementById("texto").value;

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

const lista = document.getElementById("listaRegistros");

lista.innerHTML="";

registros.forEach(r=>{

const li = document.createElement("li");

li.innerHTML = `
${r.texto}

<div>

<button onclick="reproducirTexto('${r.texto}')">▶</button>

<button onclick="editarRegistro(${r.id})">✏</button>

<button onclick="eliminarRegistro(${r.id})">❌</button>

</div>
`;

lista.appendChild(li);

});

}



// EDITAR

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



// ELIMINAR

function eliminarRegistro(id){

let registros = JSON.parse(localStorage.getItem("registros")) || [];

registros = registros.filter(r => r.id !== id);

localStorage.setItem("registros", JSON.stringify(registros));

mostrarRegistros();
mostrarOpcionesAudio();

}



// TEXTO A VOZ

function reproducirTexto(texto){

const speech = new SpeechSynthesisUtterance(texto);

speech.lang="es-ES";

speechSynthesis.speak(speech);

}



//////////////////////////////
// PROGRAMACION TIPO ZARARADIO
//////////////////////////////


// CARGAR OPCIONES EN SELECT

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

const lista = document.getElementById("listaProgramacion");

lista.innerHTML="";

programacion.forEach(p=>{

const li = document.createElement("li");

li.innerHTML=`

${p.hora} - ${p.texto}

<button onclick="eliminarProgramacion(${p.id})">❌</button>

`;

lista.appendChild(li);

});

}



// ELIMINAR PROGRAMACION

function eliminarProgramacion(id){

let programacion = JSON.parse(localStorage.getItem("programacion")) || [];

programacion = programacion.filter(p=>p.id!==id);

localStorage.setItem("programacion", JSON.stringify(programacion));

mostrarProgramacion();

}



// VERIFICAR HORARIO

function verificarProgramacion(){

const ahora = new Date();

const horaActual = ahora.getHours().toString().padStart(2,'0') + ":" +
ahora.getMinutes().toString().padStart(2,'0');

let programacion = JSON.parse(localStorage.getItem("programacion")) || [];

programacion.forEach(p=>{

if(p.hora === horaActual){

reproducirTexto(p.texto);

}

});

}
