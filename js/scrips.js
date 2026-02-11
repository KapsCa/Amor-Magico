// Función para configurar el fondo estelar
function inicializarEstrellas() {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 100, // ¿Cuántas estrellas queremos?
                "density": { "enable": true, "value_area": 800 }
            },
            "color": { "value": "#ffffff" },
            "shape": {
                "type": "image", // Usaremos una imagen vectorial (SVG)
                "image": {
                    // Este es un SVG de un rombo estilizado/destello
                    "src": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMEMxMiAwIDEyLjYgOC44IDI0IDEyQzEyLjYgMTUuMiAxMiAyNCAxMiAyNEMxMiAyNCAxMS40IDE1LjIgMCAxMkMxMS40IDguOCAxMiAwIDEyIDBaIi8+PC9zdmc+",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.8,
                "random": true, // Estrellas con diferente brillo
                "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.5,
                    "sync": false
                }
            },
            "line_linked": { "enable": false }, // Queremos estrellas, no una red
            "move": {
                "enable": true,
                "speed": 0.3, // Movimiento muy lento y mágico
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out"
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "bubble" }, // Efecto al pasar el dedo
                "onclick": { "enable": true, "mode": "push" }
            },
            "modes": {
                "bubble": { "distance": 100, "size": 5, "duration": 2, "opacity": 8, "speed": 3 }
            }
        },
        "retina_detect": true
    });
}
function configurarPergamino() {
    const contenedor = document.getElementById('pergamino-contenedor');

    contenedor.addEventListener('click', () => {
        contenedor.classList.toggle('abierto');

        // Si se abre, podríamos disparar la música o la escritura después
        if (contenedor.classList.contains('abierto')) {
            console.log("El pergamino se está abriendo...");
            // Aquí llamaremos a la función de escribir texto después
        }
    });
}

let movimientosRealizados = 0;
let faseVuelo = 1;

function patrullarSnitch() {
    const snitch = document.getElementById('pergamino-contenedor');
    if (snitch.classList.contains('abierto')) return;
    snitch.classList.remove('observando');

    // 1. Calculamos destino aleatorio
    const x = Math.random() * (window.innerWidth - 80); // 80 es el ancho del icono
    const y = Math.random() * (window.innerHeight - 80);

    // 2. Volamos al punto (usamos translate para mejor performance)
    setTimeout(() => {
        snitch.style.transform = `translate(${x}px, ${y}px)`;

        // 3. Esperamos a que termine el vuelo (600ms según tu CSS)
        setTimeout(() => {
            snitch.classList.add('observando');

            // Tiempo de observación (inquietud)
            const tiempoObservacion = faseVuelo === 1 ? 400 : 1000;

            setTimeout(() => {
                snitch.classList.remove('observando');

                if (faseVuelo === 1) {
                    faseVuelo = 2;
                    patrullarSnitch(); // Segunda fase inmediata
                } else {
                    faseVuelo = 1;
                    // Descanso aleatorio antes de reiniciar el ciclo de 2 puntos
                    const descanso = Math.random() * 2000 + 1000;
                    setTimeout(patrullarSnitch, descanso);
                }
            }, tiempoObservacion);
        }, 500);
    }, 50);
}

function entradaMagica() {
    const pergamino = document.getElementById('pergamino-contenedor');

    // Pequeño delay para que el usuario vea la entrada desde fuera
    setTimeout(() => {
        // Primera posición aleatoria para entrar
        const x = Math.random() * (window.innerWidth / 2);
        const y = Math.random() * (window.innerHeight / 2);

        pergamino.style.transform = `translate(${x}px, ${y}px)`;

        // Iniciamos el patrullaje después de entrar
        setTimeout(patrullarSnitch, 1000);
    }, 500);
}

// 🏁 El "Cerebro" que enciende todo
document.addEventListener("DOMContentLoaded", () => {
    inicializarEstrellas();
    configurarPergamino();
    entradaMagica(); // <-- Iniciamos la magia aquí
});