// Variable global para controlar si la Snitch sigue activa
let snitchActiva = true;
let faseVuelo = 1;

function inicializarEstrellas() {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": {
                "type": "image",
                "image": {
                    "src": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMEMxMiAwIDEyLjYgOC44IDI0IDEyQzEyLjYgMTUuMiAxMiAyNCAxMiAyNEMxMiAyNCAxMS40IDE1LjIgMCAxMkMxMS40IDguOCAxMiAwIDEyIDBaIi8+PC9zdmc+",
                    "width": 100, "height": 100
                }
            },
            "opacity": { "value": 0.8, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 4, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.5, "sync": false } },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 0.3, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "push" } },
            "modes": { "bubble": { "distance": 100, "size": 5, "duration": 2, "opacity": 8, "speed": 3 } }
        },
        "retina_detect": true
    });
}

function configurarPergamino() {
    const contenedor = document.getElementById('pergamino-contenedor');

    contenedor.addEventListener('click', () => {
        if (!snitchActiva) return; // Evita múltiples clics

        snitchActiva = false; // Detenemos el vuelo inmediatamente

        // PASO 1: Acercamiento (Zoom)
        contenedor.classList.add('capturada');
        console.log("¡Atrapada! Iniciando acercamiento...");

        // PASO 2: Después de un breve momento (300ms), empieza a temblar de curiosidad
        setTimeout(() => {
            contenedor.classList.add('curiosa'); // Aquí empieza el "baile" lento
            console.log("La Snitch duda...");
        }, 1200);

        // PASO 3: El gran final. Le damos 2 segundos de "duda" para crear tensión
        // ... dentro del setTimeout de 3200ms (el del Puf) ...

        // ... dentro del setTimeout de 3200ms (después del humo) ...

        setTimeout(() => {
            // 1. Limpieza y Humo
            crearExplosionHumo(contenedor);

            // LIMPIEZA TOTAL: Borramos cualquier estilo inline que haya dejado el vuelo
            contenedor.removeAttribute('style');

            // Borramos todas las clases anteriores (snitch, capturada, curiosa, etc.)
            contenedor.className = '';

            // Aseguramos el ID
            contenedor.id = 'pergamino-contenedor';

            // 2. APARECE EL ROLLO CERRADO
            contenedor.classList.add('pergamino-cerrado');

            // 3. LA APERTURA MÁGICA (800ms después)
            // ... dentro de configurarPergamino ...

            // 3. LA APERTURA MÁGICA
            setTimeout(() => {
                contenedor.classList.remove('pergamino-cerrado');
                contenedor.classList.add('pergamino-abierto');

                console.log("📜 Pergamino desplegado");

                // --- NUEVO CÓDIGO AQUÍ ---

                // 1. Creamos el contenedor del texto dinámicamente
                const divTexto = document.createElement('div');
                divTexto.id = 'mensaje-carta';
                contenedor.appendChild(divTexto);

                // 2. Esperamos a que el papel termine de abrirse (1.2s del CSS)
                setTimeout(() => {
                    escribirMensaje(divTexto);
                }, 1200);

            }, 800);;

        }, 3200);
    });
}

function patrullarSnitch() {
    // Si la snitch ya no está activa, salimos de la función inmediatamente
    if (!snitchActiva) return;

    const snitch = document.getElementById('pergamino-contenedor');
    snitch.classList.remove('observando');

    const x = Math.random() * (window.innerWidth - 80);
    const y = Math.random() * (window.innerHeight - 80);

    setTimeout(() => {
        if (!snitchActiva) return; // Doble chequeo antes de mover
        snitch.style.transform = `translate(${x}px, ${y}px)`;

        setTimeout(() => {
            if (!snitchActiva) return;
            snitch.classList.add('observando');

            const tiempoObservacion = faseVuelo === 1 ? 400 : 1000;

            setTimeout(() => {
                if (!snitchActiva) return;

                if (faseVuelo === 1) {
                    faseVuelo = 2;
                    patrullarSnitch();
                } else {
                    faseVuelo = 1;
                    const descanso = Math.random() * (200 - 100) + 100;
                    setTimeout(patrullarSnitch, descanso);
                }
            }, tiempoObservacion);
        }, 500);
    }, 50);
}


function entradaMagica() {
    const pergamino = document.getElementById('pergamino-contenedor');

    // Esperamos 1 segundo para crear suspenso... el escenario está vacío...
    setTimeout(() => {
        // Coordenadas de entrada (un punto visible en el escenario)
        // Usamos valores aleatorios para que no siempre entre al mismo lugar
        const x = Math.random() * (window.innerWidth - 100) + 50;
        const y = Math.random() * (window.innerHeight - 100) + 50;

        // ¡Entra volando! (CSS hará la transición desde -150px hasta aquí)
        pergamino.style.transform = `translate(${x}px, ${y}px)`;

        // Una vez que llega, comienza a patrullar
        setTimeout(patrullarSnitch, 1500); // 1.5s coincide con la transición CSS
    }, 1000);
}

function crearExplosionHumo(target) {
    const rect = target.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) { // Generamos 12 nubes
        const humo = document.createElement('div');
        humo.classList.add('particula-humo');

        // Tamaño aleatorio para cada nube de la explosión
        const tamano = Math.random() * 60 + 40;
        humo.style.width = `${tamano}px`;
        humo.style.height = `${tamano}px`;

        // Posición inicial (en el centro de la Snitch)
        humo.style.left = `${centroX - tamano / 2}px`;
        humo.style.top = `${centroY - tamano / 2}px`;

        // Añadimos un pequeño desplazamiento aleatorio para que se expandan
        const moveX = (Math.random() - 0.5) * 100;
        const moveY = (Math.random() - 0.5) * 100;
        humo.style.setProperty('--moveX', `${moveX}px`);
        humo.style.setProperty('--moveY', `${moveY}px`);

        document.body.appendChild(humo);

        // Limpiamos el DOM eliminando el humo tras la animación
        setTimeout(() => humo.remove(), 800);
    }
}
// Función para el efecto de máquina de escribir
function escribirMensaje(elemento) {
    // 💌 TU MENSAJE AQUÍ 💌
    // Usa \n para saltos de línea
    const mensaje = "Juro solemnemente que mis intenciones no son buenas...\n\n¿Quieres ser mi San Valentín?\n\nTravesura Realizada.";

    elemento.style.opacity = 1; // Hacemos visible el contenedor
    elemento.innerHTML = ""; // Limpiamos por si acaso

    let i = 0;
    const velocidad = 50; // Milisegundos por letra (ajusta para más rápido/lento)

    function escribir() {
        if (i < mensaje.length) {
            // Si es un salto de línea, usamos <br>, si no, la letra
            if (mensaje.charAt(i) === '\n') {
                elemento.innerHTML += '<br>';
            } else {
                elemento.innerHTML += mensaje.charAt(i);
            }
            i++;
            setTimeout(escribir, velocidad);
        }
    }

    escribir();
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarEstrellas();
    configurarPergamino();
    entradaMagica();
});