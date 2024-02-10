
function MostrarVista(id) {
    document.querySelectorAll(".vista").forEach(vista => {
        vista.classList.remove("vista_activa")
    })
    document.getElementById(id)?.classList.add("vista_activa")
};

document.querySelector("#iniciar").addEventListener("click", () => {
    MostrarVista("inicio")
});

document.querySelector("#puntuaciones").addEventListener("click", () => {
    MostrarVista("tabla")
});


document.querySelector("#volver_inicio").addEventListener("click", () => {
    MostrarVista("home")
});

document.querySelector("#volver_inicio2").addEventListener("click", () => {
    MostrarVista("home")
});

const input_num = document.getElementById("n_bingo");
input_num.addEventListener("input", ()=> {
    const n = input_num.value
    if (n<3){
        input_num.value = 3
    } else if (n>5){
        input_num.value = 5
    }
})
const inputs = document.querySelectorAll("input");
const boton_input = document.getElementById("inicio_bingo");

inputs.forEach(input => {
    input.addEventListener("input", ValidarInputs)
})

function ValidarInputs() {
        const input_completo = Array.from(inputs).every(input => input.value.trim() !== "");
        boton_input.disabled = !input_completo;
}

const nombres = document.querySelectorAll(".input_jugador");

boton_input.addEventListener('click', () => {
    const nombres_jugadores = new Set();
    let nombres_repetidos = false;
    nombres.forEach(input => {
        const nombre = input.value.trim();
        
            if (nombres_jugadores.has(nombre)) {
                nombres_repetidos = true;
                return;
            }
            nombres_jugadores.add(nombre);
        
    })
    if (!nombres_repetidos){
        iniciarJuego()
    }else{
        alert("Verifique que ningun nombre se repita")
    }
})

class Jugador{
    constructor(id, nombre, pts){
        this.id = id
        this.nombre = nombre
        this.pts = pts
    }
}
let jugadores = []
let jugador_actual = null
function iniciarJuego(){
    MostrarVista("juego")
    let jugador1 = new Jugador(1, document.getElementById("jugador1").value,1)
    let jugador2 = new Jugador(2, document.getElementById("jugador2").value,2)
    let jugador3 = new Jugador(3, document.getElementById("jugador3").value,3)
    let jugador4 = new Jugador(4, document.getElementById("jugador4").value,4)
    jugadores.push(jugador1, jugador2, jugador3, jugador4);
    document.getElementById("jugador_actual").innerText = jugador1.nombre
    jugador_actual = jugador1

    jugadores.forEach(jugador => {
    console.log(`ID: ${jugador.id}, Nombre: ${jugador.nombre}, Puntos: ${jugador.pts}`)})
}

document.querySelector("#boton_izquierda").addEventListener("click", () => {
    CambioIzquierda()
});

function BuscarPorId(id) {
    return jugadores.find(jugador => jugador.id === id);
}

function CambioIzquierda() {
    let nuevo_id = 0
    if(jugador_actual.id===1){
        nuevo_id = 4
    } else if(jugador_actual.id>1){
        nuevo_id = jugador_actual.id - 1
    }
    let nuevo_jugador = BuscarPorId(nuevo_id)
    document.getElementById("jugador_actual").innerText = nuevo_jugador.nombre
    document.getElementById("puntos").innerText = nuevo_jugador.pts
    jugador_actual = nuevo_jugador
}
document.querySelector("#boton_derecha").addEventListener("click", () => {
    CambioDerecha()
});

mkkkkk

function CambioDerecha() {
    let nuevo_id = 0
    if(jugador_actual.id===4){
        nuevo_id = 1
    } else {
        nuevo_id = jugador_actual.id + 1
    }
    let nuevo_jugador = BuscarPorId(nuevo_id)
    document.getElementById("jugador_actual").innerText = nuevo_jugador.nombre
    document.getElementById("puntos").innerText = nuevo_jugador.pts
    jugador_actual = nuevo_jugador
}