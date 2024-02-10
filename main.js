
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
        MostrarVista("home")
    }else{
        alert("Verifique que ningun nombre se repita")
    }
})