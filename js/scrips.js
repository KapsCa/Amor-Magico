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
        if (!snitchActiva) return;
        snitchActiva = false;

        // 1. DETENER Y CENTRAR (Zoom)
        // Limpiamos la transformación de vuelo para que el CSS tome el control
        contenedor.style.transform = '';
        contenedor.classList.remove('observando'); // Quitamos el aleteo de vuelo
        contenedor.classList.add('capturada'); // Zoom al 150% y centrado

        console.log("¡Atrapada! Centrando...");

        // 2. LA DUDA (Opcional pero recomendado)
        // 800ms después de atraparla, empieza a temblar
        setTimeout(() => {
            contenedor.classList.add('curiosa');
        }, 800);

        // 3. LA TRANSFORMACIÓN (2 segundos después del click)
        setTimeout(() => {
            console.log("¡Transformación!");

            // Quitamos el temblor antes de explotar
            contenedor.classList.remove('curiosa');

            // FASE 1: Puf de humo y Snitch desaparece
            crearExplosionHumo(contenedor);
            contenedor.classList.add('estado-captura');

            // FASE 2: Aparece el Rollo (200ms después del humo)
            setTimeout(() => {
                contenedor.classList.add('estado-rollo');
            }, 200);

            // FASE 3: Se abre la hoja (1.5s después para que luzca el rollo)
            setTimeout(() => {
                // CAMBIO DE ZOOM: De gigante (captura) a normal (lectura)
                contenedor.classList.remove('capturada');
                contenedor.classList.add('modo-lectura');

                // Transición visual a hoja abierta
                contenedor.classList.add('estado-abierto');

                // Iniciar escritura del texto
                const divTexto = document.getElementById('mensaje-carta');
                setTimeout(() => {
                    escribirMensaje(divTexto);
                }, 1000);

            }, 1500);

        }, 2000); // TIEMPO TOTAL DE LA SNITCH ATRAPADA (2 segundos)
    });
} 1

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

function escribirMensaje(elemento) {
    const mensaje = "Se dice que cuando miras a las estrellas,\nmiras el pasado...\n\nY en ellas vive nuestra historia.\n\n¿Quieres verla?";

    elemento.style.opacity = 1;
    elemento.innerHTML = "";

    // Agregamos la clase de magia al contenedor del texto
    elemento.classList.add('tinta-magica');

    let i = 0;
    const velocidad = 100; // 🐢 Más lento y solemne

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
            // Cuando termina de escribir, llamamos al botón
            agregarBotonViaje(elemento);
        }
    }

    escribir();
}

function agregarBotonViaje(contenedor) {
    const boton = document.createElement('button'); // Usar etiqueta button es mejor práctica
    boton.innerHTML = "✨ Mirar al Pasado ✨";
    boton.className = "boton-magico";

    // Función del click (la definiremos en el siguiente paso)
    boton.onclick = function () {
        console.log("Iniciando viaje estelar...");
        iniciarViajeEstelar();
    };

    contenedor.appendChild(boton);

    // Pequeño truco para que la transición de opacidad funcione
    // Necesitamos un micro-retraso para que el navegador registre que el elemento existe antes de cambiar su opacidad
    setTimeout(() => {
        boton.style.opacity = 1;
    }, 100);
}

function iniciarViajeEstelar() {
    // 1. Desvanecer el pergamino
    const pergamino = document.getElementById('pergamino-contenedor');
    pergamino.style.transition = "opacity 1s ease-out";
    pergamino.style.opacity = 0;
    setTimeout(() => { pergamino.style.display = 'none'; }, 1000);

    // 2. APAGAR EL FONDO (NUEVO) 🌑
    // Ocultamos las estrellas viejas para que no estorben al viaje
    const fondoEstrellas = document.getElementById('particles-js');
    fondoEstrellas.style.transition = "opacity 0.5s ease"; // Transición rápida
    fondoEstrellas.style.opacity = 0;

    // 3. ACTIVAR EL HIPERESPACIO
    activarHiperespacio(3000);

    // 4. PROGRAMAR LA LLEGADA
    setTimeout(() => {
        frenarNave();
    }, 2800);
}

function frenarNave() {
    console.log("Llegando al destino...");

    // 1. RE-ENCENDER EL FONDO (NUEVO) ✨
    const fondoEstrellas = document.getElementById('particles-js');
    // Le damos tiempo al canvas del warp para desaparecer antes de mostrar el fondo
    setTimeout(() => {
        fondoEstrellas.style.transition = "opacity 2s ease-in"; // Aparecen suavemente
        fondoEstrellas.style.opacity = 1;
    }, 500);

    // 2. Aquí llamaremos a la función que dibuja la constelación
    // iniciarConstelacion(); 
}

function activarHiperespacio(duracion = 3000) {
    const canvas = document.createElement('canvas');
    canvas.id = 'warp-canvas';
    Object.assign(canvas.style, {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 9999, pointerEvents: 'none', background: 'transparent',
        opacity: 0, transition: 'opacity 0.5s ease' // Transición suave al aparecer
    });
    document.body.appendChild(canvas);

    // Fade in suave
    requestAnimationFrame(() => canvas.style.opacity = 1);

    const ctx = canvas.getContext('2d');
    let width, height, cx, cy;

    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        cx = width / 2; cy = height / 2;
    };
    window.addEventListener('resize', resize);
    resize();

    const stars = [];
    const numStars = 200;
    const speed = 20;

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width - cx,
            y: Math.random() * height - cy,
            z: Math.random() * width
        });
    }

    let animationId;

    function draw() {
        // TRUCO DE TRANSPARENCIA:
        // Borramos suavemente el frame anterior dejando ver el CSS de fondo
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, width, height);

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#ffffff'; // Color de las estrellas

        stars.forEach(star => {
            star.z -= speed;

            if (star.z <= 0) {
                star.z = width;
                star.x = Math.random() * width - cx;
                star.y = Math.random() * height - cy;
            }

            const k = 128.0 / star.z;
            const px = star.x * k + cx;
            const py = star.y * k + cy;
            const size = (1 - star.z / width) * 4;

            if (px >= 0 && px <= width && py >= 0 && py <= height) {
                ctx.beginPath();
                const oldX = (star.x * (128.0 / (star.z + speed * 1.5))) + cx;
                const oldY = (star.y * (128.0 / (star.z + speed * 1.5))) + cy;

                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - star.z / width})`; // Fade in por distancia
                ctx.lineWidth = size;
                ctx.moveTo(oldX, oldY);
                ctx.lineTo(px, py);
                ctx.stroke();
            }
        });

        animationId = requestAnimationFrame(draw);
    }

    draw();

    // Limpieza al terminar
    setTimeout(() => {
        canvas.style.opacity = 0; // Fade out suave
        setTimeout(() => {
            cancelAnimationFrame(animationId);
            canvas.remove();
            window.removeEventListener('resize', resize);
        }, 500);
    }, duracion);
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarEstrellas();
    configurarPergamino();
    entradaMagica();
});