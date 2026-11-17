let imagenes = ["🍎", "🐶", "🚗", "🏠",
                "🍎", "🐶", "🚗", "🏠"];
let primeraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let parejas = 0;
let movimientos = 0;
function iniciarJuego() {
    imagenes.sort(() => Math.random() - 0.5);
    primeraCarta = null;
    segundaCarta = null;
    bloqueado = false;
    parejas = 0;
    movimientos = 0;
    document.getElementById("parejas").textContent = 0;
    document.getElementById("movimientos").textContent = 0;
    document.getElementById("mensaje").textContent = "¡Vamos a jugar!";
    let tablero = document.getElementById("tablero");
    tablero.innerHTML = "";
    for (let i = 0; i < imagenes.length; i++) {
        let carta = document.createElement("button");
        carta.className = "carta";
        carta.textContent = "?";
        carta.dataset.imagen = imagenes[i];
        carta.onclick = function() {
            seleccionarCarta(carta);
        };
        tablero.appendChild(carta);
    }
}
function seleccionarCarta(carta) {
    if (bloqueado || carta.classList.contains("visible")
        || carta.classList.contains("acertada")) {
        return;
    }
    carta.textContent = carta.dataset.imagen;
    carta.classList.add("visible");
    if (primeraCarta == null) {
        primeraCarta = carta;
    } else {
        segundaCarta = carta;
        movimientos++;
        document.getElementById("movimientos").textContent = movimientos;
        if (primeraCarta.dataset.imagen === segundaCarta.dataset.imagen) {
            primeraCarta.classList.add("acertada");
            segundaCarta.classList.add("acertada");
            parejas++;
            document.getElementById("parejas").textContent = parejas;
            document.getElementById("mensaje").textContent =
                "¡Muy bien! Has encontrado una pareja.";
            primeraCarta = null;
            segundaCarta = null;
            if (parejas === 4) {
                document.getElementById("mensaje").textContent =
                    "¡Enhorabuena! ¡Has encontrado todas las parejas!";
            }
        } else {
            bloqueado = true;
            document.getElementById("mensaje").textContent =
                "¡Buen intento! Sigue buscando.";
            setTimeout(function() {
                primeraCarta.textContent = "?";
                segundaCarta.textContent = "?";
                primeraCarta.classList.remove("visible");
                segundaCarta.classList.remove("visible");
                primeraCarta = null;
                segundaCarta = null;
                bloqueado = false;
            }, 1000);
        }
    }
}
iniciarJuego();