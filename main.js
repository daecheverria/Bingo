
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

document.querySelector("#volver_inicio3").addEventListener("click", () => {
    MostrarVista("home")
});

document.querySelector("#boton_reiniciar").addEventListener("click", () => {
    MostrarVista("inicio")
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
    constructor(id, nombre, pts, carton, victorias) {
        this.id = id
        this.nombre = nombre
        this.pts = pts
        this.carton = carton
        this.victorias = victorias
    }
}

let jugadores = [];
let jugador_actual;
let pts_max;
function iniciarJuego() {
    MostrarVista("juego");
    document.getElementById("turnos").innerHTML = 0;
    document.getElementById("numero").innerHTML = 0;
    document.getElementById("puntos").innerHTML = 0;
    jugadores.length = 0
    n = document.getElementById("n_bingo").value;
    numerosSalidos.clear();
    pts_max = n*2 + 6;
    let jugador1 = new Jugador(1, document.getElementById("jugador1").value, 0, CrearCartones(n),null)
    let jugador2 = new Jugador(2, document.getElementById("jugador2").value, 0, CrearCartones(n),null)
    let jugador3 = new Jugador(3, document.getElementById("jugador3").value, 0, CrearCartones(n),null)
    let jugador4 = new Jugador(4, document.getElementById("jugador4").value, 0, CrearCartones(n),null)
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
                    if(i==j){if(verificarDiagonal1(jugador.carton, jugador.id)){
                        console.log(jugador.id,i,j)
                        jugador.pts += 3
                        if(jugador_actual===jugador){
                            document.getElementById("puntos").innerText = jugador.pts
                        }
                    }}
                    if(j==(jugador.carton.length-1-i)){if(verificarDiagonal2(jugador.carton, jugador.id)){
                        jugador.pts += 3
                        console.log(jugador.id, jugador.id,i,j)
                        if(jugador_actual===jugador){
                            document.getElementById("puntos").innerText = jugador.pts
                        }
                    }}
                    console.log(jugador.id, jugador.pts)
                }
            });
        });
    });
    jugadores.forEach(jugador => {
        if(jugador.pts == pts_max){
            jugador.pts += 5
            console.log(jugador.pts)
        }
    });
    jugadores.forEach(jugador => {
        if(jugador.pts == pts_max+5){
            FinJuego()
        }
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

function verificarDiagonal1(matriz, id) {
    
    let diagonal1 = true;
    
    for (let i = 0; i < matriz.length; i++) {
        let casilla = document.getElementById(`bingo${id}_${i}_${i}`);
        if (!casilla.classList.contains("aparecido")) {
            diagonal1 = false;
            break;
        }
    }
    return diagonal1
}
function verificarDiagonal2(matriz, id) {
    let diagonal2 = true;

    for (let i = 0; i < matriz.length; i++) {
        let casilla = document.getElementById(`bingo${id}_${i}_${matriz.length - 1 - i}`);
        if (!casilla.classList.contains("aparecido")) {
            diagonal2 = false;
            break;
        }
    }
    
    return diagonal2;
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

function FinJuego(){
    MostrarVista("resultados")
    jugadores.sort((a,b)=> b.pts-a.pts);
    tabla = JSON.parse(localStorage.getItem("puntuaciones") ?? "[]")
    jugadores.forEach(jugador => {
        const indice = tabla.findIndex(elemento => elemento.nombre == jugador.nombre);
        if (indice == -1) {
            tabla.push({nombre: jugador.nombre, victorias: 0 });
            jugador.victorias= 0;
        }else{
            jugador.victorias= tabla[indice].victorias;
        }
    });
    if(jugadores[0].pts == jugadores[1].pts){
        document.getElementById("ganador").innerHTML = "Ha habido un empate";
    } else {
        document.getElementById("ganador").innerHTML = `Ha ganado ${jugadores[0].nombre}`;
        jugadores[0].victorias += 1
        const indice_ganador = tabla.findIndex(elemento => elemento.nombre == jugadores[0].nombre);
        tabla[indice_ganador].victorias += 1
    }
    for (let i = 0; i < 4; i++) {
        document.getElementById(`Resultado${i+1}`).innerText = `${jugadores[i].nombre}: ${jugadores[i].pts}puntos (${jugadores[i].victorias} victoria(s))`;
    }
    console.log(tabla)
    localStorage.setItem("puntuaciones", JSON.stringify(tabla))
}
