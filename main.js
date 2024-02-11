
function MostrarVista(id) {
    document.querySelectorAll(".vista").forEach(vista => {
        vista.classList.remove("vista_activa")
    })
    document.getElementById(id)?.classList.add("vista_activa")
};

function cambiarTableroActivo(id) {
    document.querySelectorAll(".bingo_carton").forEach(carton => {
        carton.classList.remove("activo");
    });

    const cartonActivo = document.getElementById(`bingo${id}`);
    cartonActivo.classList.add("activo");
}
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
input_num.addEventListener("input", () => {
    const n = input_num.value
    if (n < 3) {
        input_num.value = 3
    } else if (n > 5) {
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
    if (!nombres_repetidos) {
        iniciarJuego()
    } else {
        alert("Verifique que ningun nombre se repita")
    }
})

class Jugador {
    constructor(id, nombre, pts, carton) {
        this.id = id
        this.nombre = nombre
        this.pts = pts
        this.carton = carton
    }
}

let jugadores = []
let jugador_actual

function iniciarJuego() {
    MostrarVista("juego")
    n = document.getElementById("n_bingo").value
    let jugador1 = new Jugador(1, document.getElementById("jugador1").value, 0, CrearCartones(n))
    let jugador2 = new Jugador(2, document.getElementById("jugador2").value, 0, CrearCartones(n))
    let jugador3 = new Jugador(3, document.getElementById("jugador3").value, 0, CrearCartones(n))
    let jugador4 = new Jugador(4, document.getElementById("jugador4").value, 0, CrearCartones(n))
    jugadores.push(jugador1, jugador2, jugador3, jugador4);
    jugadores.forEach(jugador => {
        imprimirMatriz(jugador.carton, `bingo${jugador.id}`);
    });
    document.getElementById("jugador_actual").innerText = jugador1.nombre
    jugador_actual = jugador1
    jugadores.forEach(jugador => {
        console.log(`ID: ${jugador.id}, Nombre: ${jugador.nombre}, Puntos: ${jugador.pts}, Carton: ${jugador.carton}`)
    })
}

document.querySelector("#boton_izquierda").addEventListener("click", () => {
    CambioIzquierda()
});

function BuscarPorId(id) {
    return jugadores.find(jugador => jugador.id === id);
}

function CambioIzquierda() {
    let nuevo_id = 0
    if (jugador_actual.id === 1) {
        nuevo_id = 4
    } else if (jugador_actual.id > 1) {
        nuevo_id = jugador_actual.id - 1
    }
    let nuevo_jugador = BuscarPorId(nuevo_id)
    document.getElementById("jugador_actual").innerText = nuevo_jugador.nombre
    document.getElementById("puntos").innerText = nuevo_jugador.pts
    cambiarTableroActivo(nuevo_jugador.id)
    jugador_actual = nuevo_jugador
}
document.querySelector("#boton_derecha").addEventListener("click", () => {
    CambioDerecha()
});

function CambioDerecha() {
    let nuevo_id = 0
    if (jugador_actual.id === 4) {
        nuevo_id = 1
    } else {
        nuevo_id = jugador_actual.id + 1
    }
    let nuevo_jugador = BuscarPorId(nuevo_id)
    document.getElementById("jugador_actual").innerText = nuevo_jugador.nombre
    document.getElementById("puntos").innerText = nuevo_jugador.pts
    cambiarTableroActivo(nuevo_jugador.id)
    jugador_actual = nuevo_jugador
}

function CrearCartones(n) {
    let tamano = n;
    let carton = [];
    let numeros = [];
    for (let i = 0; i < tamano; i++) {
        carton[i] = [];
        for (let j = 0; j < tamano; j++) {
            let numero;
            do {
                numero = Math.floor(Math.random() * 50) + 1;
            } while (numeros.includes(numero));
            carton[i][j] = numero;
            numeros.push(numero);
        }
    }
    console.log(carton);
    return carton;
}

function imprimirMatriz(matriz, tableroId) {
    let bingoDiv = document.getElementById(tableroId);
    bingoDiv.innerHTML = ""; 

    for (let i = 0; i < matriz.length; i++) {
        let filaDiv = document.createElement("div");
        filaDiv.classList.add("fila"); 
        
        for (let j = 0; j < matriz[i].length; j++) {
            let casillaDiv = document.createElement("div");
            casillaDiv.classList.add("casilla");
            casillaDiv.textContent = matriz[i][j];
            casillaDiv.id = `${tableroId}_${i}_${j}`
            filaDiv.appendChild(casillaDiv); 
        }
        
        bingoDiv.appendChild(filaDiv); 
    }
}

document.querySelector("#boton_avanzar").addEventListener("click", () => {
    document.getElementById("turnos").innerText = parseInt(document.getElementById("turnos").innerText) + 1;
    n = nuevoNumero();
    document.getElementById("numero").innerText = n;
    jugadores.forEach(jugador => {
        jugador.carton.forEach((fila, i) => {
            fila.forEach((num, j) => {
                if (num === n) {
                    let id = `bingo${jugador.id}_${i}_${j}`
                    document.getElementById(id)?.classList.add("aparecido")
                    if(verificarFila(jugador.carton,i, jugador.id)){
                        jugador.pts += 1
                        if(jugador_actual===jugador){
                            document.getElementById("puntos").innerText = jugador.pts
                        }
                    }
                    if(verificarColumna(jugador.carton,j, jugador.id)){
                        jugador.pts += 1
                        if(jugador_actual===jugador){
                            document.getElementById("puntos").innerText = jugador.pts
                        }
                    }
                }
            });
        });
    });
});

function verificarFila(matriz, indiceF, id) {
    let filaCompleta = true;
    for (let j = 0; j < matriz.length; j++) {
        let casilla = document.getElementById(`bingo${id}_${indiceF}_${j}`);
        if (!casilla.classList.contains("aparecido")) {
            filaCompleta = false;
            break;
        }
    }
    return filaCompleta;
}

function verificarColumna(matriz, indiceC, id) {
    let columnaCompleta = true;
    for (let i = 0; i < matriz.length; i++) {
        let casilla = document.getElementById(`bingo${id}_${i}_${indiceC}`);
        if (!casilla.classList.contains("aparecido")) {
            columnaCompleta = false;
            break;
        }
    }
    return columnaCompleta;
}


let numerosSalidos = new Set();

function nuevoNumero() {
    let n;

    do {
        n = Math.floor(Math.random() * 50) + 1;
    } while (numerosSalidos.has(n));

    numerosSalidos.add(n);
    return n;
} 

