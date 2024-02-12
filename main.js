// desactiva la visibilidad de todas las vistas y luego activa la que se le paso como parametro
function MostrarVista(id) {
    document.querySelectorAll(".vista").forEach(vista => {
        vista.classList.remove("vista_activa")
    })
    document.getElementById(id)?.classList.add("vista_activa")
};

// similar a lo anterior, hace que solo el carton del jugador que se paso como parametro este visible
function cambiarTableroActivo(id) {
    document.querySelectorAll(".bingo_carton").forEach(carton => {
        carton.classList.remove("activo");
    });

    const cartonActivo = document.getElementById(`bingo${id}`);
    cartonActivo.classList.add("activo");
}

// event listeners para cada boton de modo que al hacerles click cambien la vista activa
document.querySelector("#iniciar").addEventListener("click", () => {
    MostrarVista("inicio")
});

document.querySelector("#puntuaciones").addEventListener("click", () => {
    crearTabla()
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

// inicializar variables para las siguientes funciones. Una con todos los inputs y otra con el boton de iniciar partida
const inputs = document.querySelectorAll("input");
const boton_input = document.getElementById("inicio_bingo");

// event listeners para que cada vez que se modifique un input se compruebe si se puede habilitar el boton de inicio
inputs.forEach(input => {
    input.addEventListener("input", ValidarInputs)
})

// valida si cada input tiene contenido y el numero esta entre 3 y 5. Si se cumplen ambas condiciones, se activa el boton
function ValidarInputs() {
    const input_completo = Array.from(inputs).every(input => input.value.trim() !== "");
    input_num = document.getElementById("n_bingo").value;
    const num_valido = input_num >= 3 && input_num <= 5;
    boton_input.disabled = !input_completo  || !num_valido;

}

// variable con los nombres de los jugadores introducidos en los inputs
const nombres = document.querySelectorAll(".input_jugador");

// verifica si los nombres estan repetidos. Si no lo estan avanza al juego. De lo contrario avisa al usuario
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


// creacion del objeto persona
class Jugador {
    constructor(id, nombre, pts, carton, victorias) {
        this.id = id
        this.nombre = nombre
        this.pts = pts
        this.carton = carton
        this.victorias = victorias
    }
}

// inicializa un array donde estaran los jugadores, el jugador que se esta mostrando en pantalla y la puntuacion maxima
let jugadores = [];
let jugador_actual;
let pts_max;

function iniciarJuego() {
    // cambia de vista y asegura que los datos se reinicien al iniciar una nueva partida
    MostrarVista("juego");
    document.getElementById("turnos").innerHTML = 0;
    document.getElementById("numero").innerHTML = 0;
    document.getElementById("puntos").innerHTML = 0;
    jugadores.length = 0
    // calcula la puntuacion maxima dependiendo del tamano del carton y elimina los numeros que habian salido en la partida anterior en caso de reinicio
    n = document.getElementById("n_bingo").value;
    numerosSalidos.clear();
    pts_max = n * 2 + 6;
    // crea a los jugadores y los guarda en un array para manipularlos con mayor facilidad posteriormente. Las victorias se calculan al final de la partida
    let jugador1 = new Jugador(1, document.getElementById("jugador1").value, 0, CrearCartones(n), null)
    let jugador2 = new Jugador(2, document.getElementById("jugador2").value, 0, CrearCartones(n), null)
    let jugador3 = new Jugador(3, document.getElementById("jugador3").value, 0, CrearCartones(n), null)
    let jugador4 = new Jugador(4, document.getElementById("jugador4").value, 0, CrearCartones(n), null)
    jugadores.push(jugador1, jugador2, jugador3, jugador4);
    //crea los cartones para cada jugador en el HTML
    jugadores.forEach(jugador => {
        imprimirMatriz(jugador.carton, `bingo${jugador.id}`);
    });
    // establece por defecto al jugador 1 como el actual
    document.getElementById("jugador_actual").innerText = jugador1.nombre
    jugador_actual = jugador1
    // console.log para verificar la creacion correcta de los jugadores
    jugadores.forEach(jugador => {
        console.log(`ID: ${jugador.id}, Nombre: ${jugador.nombre}, Puntos: ${jugador.pts}, Carton: ${jugador.carton}`)
    })
}

//busca a un jugador por su id 
function BuscarPorId(id) {
    return jugadores.find(jugador => jugador.id === id);
}

//event listener para la flecha de la izquierda
document.querySelector("#boton_izquierda").addEventListener("click", () => {
    CambioIzquierda()
});

//cambia el jugador que se esta viendo y muestra sus datos correspondiente. Se mueve de forma 4-3-2-1-4
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

//igual que lo anterior pero para la flecha derecha. El cambio ahora se hace en orden 1-2-3-4-1
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

//crea las matrices nxn de cada jugador segun el tamano pasado como parametro
function CrearCartones(n) {
    let tamano = n;
    let carton = [];
    // guarda los numeros que ya se han colocado en la matriz
    let numeros = [];
    for (let i = 0; i < tamano; i++) {
        carton[i] = [];
        for (let j = 0; j < tamano; j++) {
            let numero;
            // coloca numeros entre 1 y 50 en la matriz y se repite hasta que se llene con numeros unicos
            do {
                numero = Math.floor(Math.random() * 50) + 1;
            } while (numeros.includes(numero));
            carton[i][j] = numero;
            numeros.push(numero);
        }
    }
    // verificacion de creacion correcta de matriz
    console.log(carton);
    return carton;
}

//crea los elementos necesarios para la creacion del carton. 
//A cada casilla se le asigna el valor correspondiente de la matriz y se le da un id unico
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
    //va pasando los turnos y acaba el juego si ya han pasado 25
    document.getElementById("turnos").innerText = parseInt(document.getElementById("turnos").innerText) + 1;
    if (document.getElementById("turnos").innerText == 26) {
        FinJuego()
    }
    //obtiene el numero que sale del bingo y lo muestra en pantalla 
    n = nuevoNumero();
    document.getElementById("numero").innerText = n;
    //verifica en cada jugador si el numero salido coincido con alguno de su carton
    // de ser asi cambia el color de la casilla y suma los puntos correspondientes de darse el caso
    jugadores.forEach(jugador => {
        jugador.carton.forEach((fila, i) => {
            fila.forEach((num, j) => {
                if (num === n) {
                    let id = `bingo${jugador.id}_${i}_${j}`
                    document.getElementById(id)?.classList.add("aparecido")
                    if (verificarFila(jugador.carton, i, jugador.id)) {
                        jugador.pts += 1
                        if (jugador_actual === jugador) {
                            document.getElementById("puntos").innerText = jugador.pts
                        }
                    }
                    if (verificarColumna(jugador.carton, j, jugador.id)) {
                        jugador.pts += 1
                        if (jugador_actual === jugador) {
                            document.getElementById("puntos").innerText = jugador.pts
                        }
                    }
                    //solo verifica las diagonales si la casilla esta en la diagonal correspondiente
                    if (i == j) {
                        if (verificarDiagonal1(jugador.carton, jugador.id)) {
                            console.log(jugador.id, i, j)
                            jugador.pts += 3
                            if (jugador_actual === jugador) {
                                document.getElementById("puntos").innerText = jugador.pts
                            }
                        }
                    }
                    if (j == (jugador.carton.length - 1 - i)) {
                        if (verificarDiagonal2(jugador.carton, jugador.id)) {
                            jugador.pts += 3
                            if (jugador_actual === jugador) {
                                document.getElementById("puntos").innerText = jugador.pts
                            }
                        }
                    }
                    //verifica si se cambio la puntuacion y a quien
                    console.log(jugador.id, jugador.pts);
                }
            });
        });
    });
    // verifica si algun jugador completo el tablero y suma los puntos por hacerlo
    jugadores.forEach(jugador => {
        if (jugador.pts == pts_max) {
            jugador.pts += 5
            // verifica si la suma total esta bien
            console.log(jugador.pts)
        }
    });
    // termina el juego despues de que el/los jugadores que completaron el tablero sumen los puntos
    jugadores.forEach(jugador => {
        if (jugador.pts == pts_max + 5) {
            FinJuego()
        }
    });
});

// verifican si la fila/columna/diagonal de la casilla esta completa
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

// aqui se guardan los numeros que vayan saliendo en el bingo 
let numerosSalidos = new Set();

//genera un numero aleatorio entre el 1 y 50 para el bingo y asegura que no haya salido antes
function nuevoNumero() {
    let n;

    do {
        n = Math.floor(Math.random() * 50) + 1;
    } while (numerosSalidos.has(n));

    numerosSalidos.add(n);
    return n;
}


function FinJuego() {
    // cambia vista y ordena a los jugadores segun su puntuacion
    MostrarVista("resultados")
    jugadores.sort((a, b) => b.pts - a.pts);
    // obtiene la tabla de victorias. Si el jugador no existia, lo anade. De lo contrario le asigna las victorias que ya tenia
    tabla = JSON.parse(localStorage.getItem("puntuaciones") ?? "[]")
    jugadores.forEach(jugador => {
        const indice = tabla.findIndex(elemento => elemento.nombre == jugador.nombre);
        if (indice == -1) {
            tabla.push({ nombre: jugador.nombre, victorias: 0 });
            jugador.victorias = 0;
        } else {
            jugador.victorias = tabla[indice].victorias;
        }
    });
    //Si hay empate lo muestra en pantalla. Si no, le suma una victoria al ganador.
    if (jugadores[0].pts == jugadores[1].pts) {
        document.getElementById("ganador").innerHTML = "Ha habido un empate";
    } else {
        document.getElementById("ganador").innerHTML = `Ha ganado ${jugadores[0].nombre}`;
        jugadores[0].victorias += 1
        const indice_ganador = tabla.findIndex(elemento => elemento.nombre == jugadores[0].nombre);
        tabla[indice_ganador].victorias += 1
    }
    // Muestra en pantalla a los jugadores con los puntos obtenidos durante la partida y su total de victorias
    for (let i = 0; i < 4; i++) {
        document.getElementById(`Resultado${i + 1}`).innerText = `${jugadores[i].nombre}: ${jugadores[i].pts}puntos (${jugadores[i].victorias} victoria(s))`;
    }
    //verifica los valores y guarda los resultados 
    console.log(tabla)
    localStorage.setItem("puntuaciones", JSON.stringify(tabla))
}

function crearTabla() {
    // obtiene las victorias y las ordena de mayor a menor
    const puntuaciones = JSON.parse(localStorage.getItem("puntuaciones") ?? "[]");
    puntuaciones.sort((a, b) => b.victorias - a.victorias).slice(0, 10);
    const tabla = document.getElementById("tabla_resultados");
    // elimina la tabla para volver a crearla
    tabla.innerHTML = "";
    //inicializa contador de las filas de la tabla
    let contador = 0;
    // crea la fila de titulos de la tabla
    const fila = tabla.insertRow();
    const posicion = fila.insertCell(0);
    posicion.textContent = "Posicion"
    const nombre = fila.insertCell(1);
    nombre.textContent = "Nombre";
    const victorias = fila.insertCell(2);
    victorias.textContent = "Victorias";
    // crea filas para cada jugador e inserta su nombre y victorias (y posicion en la tabla)
    puntuaciones.forEach(jugador => {
        if (contador < 10) {
            const fila = tabla.insertRow();
            const posicion = fila.insertCell(0);
            posicion.textContent = contador + 1;
            const nombre = fila.insertCell(1);
            const victorias = fila.insertCell(2);

            nombre.textContent = jugador.nombre;
            victorias.textContent = jugador.victorias;
            contador += 1;
        }
    });
    // si se crean menos de 10 filas porque aun hay menos de 10 jugadores registrados, crea filas vacias
    if(contador<10){    do {
            const fila = tabla.insertRow();
            const posicion = fila.insertCell(0);
            posicion.textContent = contador + 1;
            const nombre = fila.insertCell(1);
            const victorias = fila.insertCell(2);

            nombre.textContent = "";
            victorias.textContent = "";
            contador += 1;
            console.log(contador)
        } while (contador < 10)}
}