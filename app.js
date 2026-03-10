// cargar registros al iniciar
document.addEventListener("DOMContentLoaded", () => {

mostrarRegistros();
mostrarOpcionesAudio();

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

<button onclick="eliminarRegistro(${r.id})">❌</button>

</div>
`;

lista.appendChild(li);

});

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
