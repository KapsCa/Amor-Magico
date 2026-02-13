// --- CONFIGURACIÓN DE LA HISTORIA (ESPIRAL ÁUREA) ---
// Coordenadas ajustadas para parecer un remolino desde el centro
const historia = [
    { id: 0, x: 50, y: 50, mensaje: "El Origen...", fecha: "202X", foto: "img/foto1.jpg" }, // Centro
    { id: 1, x: 55, y: 43, mensaje: "Primeros pasos", fecha: "202X", foto: "img/foto2.jpg" }, // Arriba-Der
    { id: 2, x: 62, y: 55, mensaje: "Avanzando", fecha: "202X", foto: "img/foto3.jpg" },      // Derecha-Abajo
    { id: 3, x: 48, y: 65, mensaje: "Profundizando", fecha: "202X", foto: "img/foto4.jpg" },  // Abajo
    { id: 4, x: 35, y: 52, mensaje: "Creciendo", fecha: "202X", foto: "img/foto5.jpg" },      // Izquierda
    { id: 5, x: 40, y: 30, mensaje: "Soñando", fecha: "202X", foto: "img/foto6.jpg" },        // Arriba-Izq
    { id: 6, x: 70, y: 35, mensaje: "Construyendo", fecha: "202X", foto: "img/foto7.jpg" },   // Arriba-Der (Lejos)
    { id: 7, x: 75, y: 65, mensaje: "Para siempre", fecha: "202X", foto: "img/foto8.jpg" }    // Abajo-Der (Lejos)
];

let pasoActual = 0;
let snitchActiva = true;
let faseVuelo = 1;

// (Las funciones patrullarSnitch, entradaMagica y crearExplosionHumo se quedan igual)

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
    inicializarEstrellas();
    configurarPergamino();
    entradaMagica();
});

function inicializarEstrellas() {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "opacity": { "value": 0.8, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "push" } }
        },
        "retina_detect": true
    });
}

// --- LÓGICA DE LA SNITCH Y PERGAMINO ---
function configurarPergamino() {
    const contenedor = document.getElementById('pergamino-contenedor');

    contenedor.addEventListener('click', () => {
        if (!snitchActiva) return;
        snitchActiva = false;

        // 1. Detener y Centrar
        contenedor.style.transform = '';
        contenedor.classList.remove('observando');
        contenedor.classList.add('capturada');

        // 2. Temblor de duda
        setTimeout(() => { contenedor.classList.add('curiosa'); }, 800);

        // 3. Transformación
        setTimeout(() => {
            contenedor.classList.remove('curiosa');
            crearExplosionHumo(contenedor);
            contenedor.classList.add('estado-captura');

            setTimeout(() => { contenedor.classList.add('estado-rollo'); }, 200);

            setTimeout(() => {
                contenedor.classList.remove('capturada');
                contenedor.classList.add('modo-lectura');
                contenedor.classList.add('estado-abierto');

                const divTexto = document.getElementById('mensaje-carta');
                setTimeout(() => { escribirMensaje(divTexto); }, 1000);
            }, 1500);
        }, 2000);
    });
}

function escribirMensaje(elemento) {
    const mensaje = "Se dice que cuando miras a las estrellas,\nmiras el pasado...\n\nY en ellas vive nuestra historia.\n\n¿Quieres verla?";

    elemento.style.opacity = 1;
    elemento.innerHTML = "";
    elemento.classList.add('tinta-magica');

    let i = 0;
    const velocidad = 90;

    function escribir() {
        if (i < mensaje.length) {
            if (mensaje.charAt(i) === '\n') {
                elemento.innerHTML += '<br>';
            } else {
                elemento.innerHTML += mensaje.charAt(i);
            }
            i++;
            setTimeout(escribir, velocidad);
        } else {
            agregarBotonViaje(elemento);
        }
    }
    escribir();
}

function agregarBotonViaje(contenedor) {
    const boton = document.createElement('button');
    boton.innerHTML = "✨ Mirar al Pasado ✨";
    boton.className = "boton-magico";

    boton.onclick = function () {
        iniciarViajeEstelar();
    };

    contenedor.appendChild(boton);
    setTimeout(() => { boton.style.opacity = 1; }, 100);
}

// --- EL VIAJE (WARP SPEED) ---
function iniciarViajeEstelar() {
    // 1. Desvanecer pergamino
    const pergamino = document.getElementById('pergamino-contenedor');
    pergamino.style.transition = "opacity 1s ease-out";
    pergamino.style.opacity = 0;
    setTimeout(() => { pergamino.style.display = 'none'; }, 1000);

    // 2. Apagar fondo actual
    const fondoEstrellas = document.getElementById('particles-js');
    fondoEstrellas.style.transition = "opacity 0.5s ease";
    fondoEstrellas.style.opacity = 0;

    // 3. Activar Hiperespacio
    activarHiperespacio(3500);

    // 4. Programar llegada
    setTimeout(() => {
        frenarNave();
    }, 3300);
}

function activarHiperespacio(duracion) {
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 9999, pointerEvents: 'none', background: 'transparent',
        opacity: 0, transition: 'opacity 0.5s ease'
    });
    document.body.appendChild(canvas);
    requestAnimationFrame(() => canvas.style.opacity = 1);

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth, height = window.innerHeight;
    canvas.width = width; canvas.height = height;

    const stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width
    }));

    let animationId;
    function draw() {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#fff';

        const cx = width / 2, cy = height / 2;
        stars.forEach(star => {
            star.z -= 25; // Velocidad del warp
            if (star.z <= 0) {
                star.z = width;
                star.x = Math.random() * width - cx;
                star.y = Math.random() * height - cy;
            }
            const k = 128.0 / star.z;
            const px = star.x * k + cx;
            const py = star.y * k + cy;

            if (px >= 0 && px <= width && py >= 0 && py <= height) {
                const size = (1 - star.z / width) * 4;
                ctx.beginPath();
                ctx.lineWidth = size;
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - star.z / width})`;
                ctx.moveTo((star.x * (128.0 / (star.z + 40))) + cx, (star.y * (128.0 / (star.z + 40))) + cy);
                ctx.lineTo(px, py);
                ctx.stroke();
            }
        });
        animationId = requestAnimationFrame(draw);
    }
    draw();

    setTimeout(() => {
        canvas.style.opacity = 0;
        setTimeout(() => { cancelAnimationFrame(animationId); canvas.remove(); }, 500);
    }, duracion);
}

function frenarNave() {
    console.log("Llegando al destino...");
    // Re-encender fondo
    const fondoEstrellas = document.getElementById('particles-js');
    setTimeout(() => {
        fondoEstrellas.style.transition = "opacity 2s ease-in";
        fondoEstrellas.style.opacity = 1;
    }, 500);

    // INICIAR CONSTELACIÓN
    iniciarConstelacion();
}

// --- CONSTELACIÓN EN ESPIRAL ---
function iniciarConstelacion() {
    const contenedor = document.getElementById('contenedor-constelacion');
    contenedor.innerHTML = '';

    historia.forEach((hito, index) => {
        const estrella = document.createElement('div');
        estrella.classList.add('estrella-historia');
        estrella.id = `estrella-${index}`;
        estrella.style.left = `${hito.x}%`;
        estrella.style.top = `${hito.y}%`;

        estrella.addEventListener('click', () => {
            if (index === pasoActual) {
                mostrarRecuerdo(hito);
            }
        });
        contenedor.appendChild(estrella);
    });

    setTimeout(() => { activarEstrella(0); }, 1500);
}

function activarEstrella(index) {
    if (index >= historia.length) return;
    const estrella = document.getElementById(`estrella-${index}`);
    estrella.style.transform = "translate(-50%, -50%) scale(1)";
    estrella.classList.add('activa');
}

function mostrarRecuerdo(dato) {
    const popup = document.createElement('div');
    popup.classList.add('tarjeta-recuerdo');
    popup.innerHTML = `
        <h3>${dato.fecha}</h3>
        <img src="${dato.foto}" alt="Recuerdo">
        <p>${dato.mensaje}</p>
        <button class="cerrar-tarjeta">Cerrar</button>
    `;
    document.body.appendChild(popup);

    setTimeout(() => popup.classList.add('abierta'), 10);

    const botonCerrar = popup.querySelector('.cerrar-tarjeta');
    botonCerrar.onclick = () => {
        popup.classList.remove('abierta');
        setTimeout(() => popup.remove(), 400);

        const estrellaVieja = document.getElementById(`estrella-${pasoActual}`);
        estrellaVieja.classList.remove('activa');
        estrellaVieja.classList.add('visitada');

        pasoActual++;
        if (pasoActual < historia.length) {
            activarEstrella(pasoActual);
        } else {
            // FIN DE LA HISTORIA
            setTimeout(() => alert("Has recorrido toda nuestra historia... ❤️"), 1000);
        }
    };
}

// --- UTILIDADES SNITCH (Movimiento y Humo) ---
function patrullarSnitch() {
    if (!snitchActiva) return;
    const snitch = document.getElementById('pergamino-contenedor');
    snitch.classList.remove('observando');
    const x = Math.random() * (window.innerWidth - 80);
    const y = Math.random() * (window.innerHeight - 80);

    setTimeout(() => {
        if (!snitchActiva) return;
        snitch.style.transform = `translate(${x}px, ${y}px)`;
        setTimeout(() => {
            if (!snitchActiva) return;
            snitch.classList.add('observando');
            const tiempo = faseVuelo === 1 ? 400 : 1000;
            setTimeout(() => {
                if (!snitchActiva) return;
                if (faseVuelo === 1) { faseVuelo = 2; patrullarSnitch(); }
                else { faseVuelo = 1; setTimeout(patrullarSnitch, Math.random() * 100 + 100); }
            }, tiempo);
        }, 500);
    }, 50);
}

function entradaMagica() {
    const pergamino = document.getElementById('pergamino-contenedor');
    setTimeout(() => {
        const x = Math.random() * (window.innerWidth - 100) + 50;
        const y = Math.random() * (window.innerHeight - 100) + 50;
        pergamino.style.transform = `translate(${x}px, ${y}px)`;
        setTimeout(patrullarSnitch, 1500);
    }, 1000);
}

function crearExplosionHumo(target) {
    const rect = target.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 12; i++) {
        const humo = document.createElement('div');
        humo.classList.add('particula-humo');
        const tam = Math.random() * 60 + 40;
        humo.style.width = `${tam}px`; humo.style.height = `${tam}px`;
        humo.style.left = `${cx - tam / 2}px`; humo.style.top = `${cy - tam / 2}px`;
        humo.style.setProperty('--moveX', `${(Math.random() - 0.5) * 100}px`);
        humo.style.setProperty('--moveY', `${(Math.random() - 0.5) * 100}px`);
        document.body.appendChild(humo);
        setTimeout(() => humo.remove(), 800);
    }
}