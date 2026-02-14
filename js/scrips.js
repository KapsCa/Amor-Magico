// --- CONFIGURACIÓN DE LA HISTORIA (ESPIRAL SUAVE) ---
const historia = [
    // Centro (El inicio)
    { id: 0, x: 50, y: 50, mensaje: "Al principio no parecía que fuera a durar...", fecha: "2015", foto: "../img/festejo2015.webp" },
    // Empieza el giro corto (sentido horario)
    { id: 1, x: 63, y: 45, mensaje: "Pero siempre fuiste alguien especial para mí", fecha: "2016", foto: "../img/quinceaños.webp" },
    { id: 2, x: 68, y: 55, mensaje: "Mientras más tiempo pasaba cada vez más me gustaba la idea de estar contigo", fecha: "2018", foto: "../img/musevi.webp" },
    // Se abre el arco hacia abajo
    { id: 3, x: 55, y: 65, mensaje: "A pesar de que no siempre soy el más romántico ", fecha: "2019", foto: "../img/fiesta2019.webp" },
    // Curva amplia hacia la izquierda
    { id: 4, x: 38, y: 60, mensaje: "Me encanta cuando veo tu carita de sorpresa cuando te regalo algo", fecha: "202X", foto: "../img/besohamaca.webp" },
    // Sube por la izquierda
    { id: 5, x: 32, y: 45, mensaje: "Me encanta cuando me dices te amo", fecha: "2023", foto: "../img/navidad.webp" },
    // Arco superior grande
    { id: 6, x: 40, y: 35, mensaje: "Amo cada parte de ti", fecha: "2024", foto: "../img/bodaabues.webp" },
    { id: 7, x: 60, y: 30, mensaje: "Cada momento que no trajo hasta aquí", fecha: "2025", foto: "../img/graduacion.webp" },
    // Salida hacia la derecha (Futuro)
    { id: 8, x: 83, y: 40, mensaje: "Y todo lo que aún tenemos por vivir...", fecha: "2025", foto: "../img/graduacion2.webp" }
];

let pasoActual = 0;
let snitchActiva = true;
let faseVuelo = 1;

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
    inicializarEstrellas();
    configurarPergamino();
    entradaMagica();
});


// 1. FONDO DE ESTRELLAS CON SPARKS (CORREGIDO)
function inicializarEstrellas() {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": {
                "type": "image", // ¡Aquí activamos la imagen!
                "image": {
                    // SVG del destello de 4 puntas
                    "src": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMEMxMiAwIDEyLjYgOC44IDI0IDEyQzEyLjYgMTUuMiAxMiAyNCAxMiAyNEMxMiAyNCAxMS40IDE1LjIgMCAxMkMxMS40IDguOCAxMiAwIDEyIDBaIi8+PC9zdmc+",
                    "width": 100, "height": 100
                }
            },
            "opacity": {
                "value": 0.8,
                "random": true,
                "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
            },
            "size": {
                "value": 6, // Tamaño aumentado para que se note la forma
                "random": true,
                "anim": { "enable": true, "speed": 2, "size_min": 2, "sync": false }
            },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 0.5, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "push" } },
            "modes": { "bubble": { "distance": 100, "size": 10, "duration": 2, "opacity": 8, "speed": 3 } }
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

        contenedor.style.transform = '';
        contenedor.classList.remove('observando');
        contenedor.classList.add('capturada');

        setTimeout(() => { contenedor.classList.add('curiosa'); }, 800);

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
    const pergamino = document.getElementById('pergamino-contenedor');
    pergamino.style.transition = "opacity 1s ease-out";
    pergamino.style.opacity = 0;
    setTimeout(() => { pergamino.style.display = 'none'; }, 1000);

    const fondoEstrellas = document.getElementById('particles-js');
    fondoEstrellas.style.transition = "opacity 0.5s ease";
    fondoEstrellas.style.opacity = 0;

    activarHiperespacio(3500);

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
            star.z -= 25;
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
    const fondoEstrellas = document.getElementById('particles-js');
    setTimeout(() => {
        fondoEstrellas.style.transition = "opacity 2s ease-in";
        fondoEstrellas.style.opacity = 1;
    }, 500);

    iniciarConstelacion();
}

// --- CONSTELACIÓN EN ESPIRAL (CORREGIDO) ---
function iniciarConstelacion() {
    const contenedor = document.getElementById('contenedor-constelacion');

    // 1. Preparar el SVG
    let svg = document.getElementById('svg-lineas');
    if (!svg) {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = "svg-lineas";
        contenedor.appendChild(svg);
    } else {
        svg.innerHTML = ''; // Limpiar lienzo
    }

    // 2. Limpiar estrellas viejas
    const estrellasViejas = document.querySelectorAll('.estrella-historia');
    estrellasViejas.forEach(e => e.remove());

    // 3. DIBUJAR TODO EL MAPA (Líneas tenues + Estrellas apagadas)

    // Primero las líneas (para que queden al fondo)
    crearMapaLineas(svg);

    // Luego las estrellas
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

    // Encendemos la primera estrella para empezar
    setTimeout(() => { activarEstrella(0); }, 1500);
}

// NUEVA FUNCIÓN: Dibuja todas las líneas apagadas al inicio
function crearMapaLineas(svg) {
    // Recorremos hasta el penúltimo punto para conectar i con i+1
    for (let i = 0; i < historia.length - 1; i++) {
        const origen = historia[i];
        const destino = historia[i + 1];

        const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");

        linea.setAttribute("x1", `${origen.x}%`);
        linea.setAttribute("y1", `${origen.y}%`);
        linea.setAttribute("x2", `${destino.x}%`);
        linea.setAttribute("y2", `${destino.y}%`);

        // Clase base (tenue)
        linea.classList.add("linea-conexion");

        // Le damos un ID único para encontrarla luego y encenderla
        linea.id = `linea-${i}`;

        svg.appendChild(linea);
    }
}

function activarEstrella(index) {
    if (index >= historia.length) return;
    const estrella = document.getElementById(`estrella-${index}`);
    if (estrella) {
        estrella.classList.add('activa');
    }
}

// FUNCIÓN MODIFICADA: Ya no crea, solo "Enciende"
function encenderLinea(indice) {
    const linea = document.getElementById(`linea-${indice}`);
    if (linea) {
        linea.classList.add('activa'); // El CSS hará la transición de color
    }
}

function mostrarRecuerdo(dato) {
    const popup = document.createElement('div');
    popup.classList.add('tarjeta-recuerdo');

    // 1. CALCULAR EL ORIGEN DEL ZOOM 📐
    // Como las coordenadas de la historia están en %, necesitamos convertirlas
    // a una posición relativa al centro de la pantalla para el 'transform'

    // (dato.x - 50) nos da la distancia desde el centro en porcentaje
    // Multiplicamos por el ancho de la ventana (window.innerWidth) para pixeles aproximados
    const distanciaX = (dato.x - 50) + "vw";
    const distanciaY = (dato.y - 50) + "vh";

    // Pasamos estas distancias al CSS como variables
    popup.style.setProperty('--origen-x', distanciaX);
    popup.style.setProperty('--origen-y', distanciaY);

    popup.innerHTML = `
        <h3>${dato.fecha}</h3>
        <img src="${dato.foto}" alt="Recuerdo">
        <p>${dato.mensaje}</p>
        <button class="cerrar-tarjeta">Cerrar</button>
    `;
    document.body.appendChild(popup);

    // Pequeño delay para permitir que el navegador lea la posición inicial antes de animar
    requestAnimationFrame(() => {
        setTimeout(() => popup.classList.add('abierta'), 10);
    });

    const botonCerrar = popup.querySelector('.cerrar-tarjeta');
    botonCerrar.onclick = () => {
        popup.classList.remove('abierta');
        setTimeout(() => popup.remove(), 600); // Esperamos a que termine la animación de vuelta

        // Marcar estrella actual como visitada
        const estrellaVieja = document.getElementById(`estrella-${pasoActual}`);
        if (estrellaVieja) {
            estrellaVieja.classList.remove('activa');
            estrellaVieja.classList.add('visitada');
        }

        // AVANCE EN LA HISTORIA
        const pasoAnterior = pasoActual;
        pasoActual++;

        if (pasoActual < historia.length) {
            encenderLinea(pasoAnterior); // Asegúrate de tener esta función o usar conectarEstrellas
            activarEstrella(pasoActual);
        } else {
            setTimeout(() => alert("Feliz dia del Amor \n Al amor de mi vida... ❤️"), 1000);
        }
    };
}

// --- UTILIDADES SNITCH ---
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