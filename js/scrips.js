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

// Aquí es donde "encendemos" todo cuando el sitio carga
document.addEventListener("DOMContentLoaded", () => {
    inicializarEstrellas();
    // Aquí irán las funciones del pergamino después...
});