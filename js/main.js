window.abrirModal = function(nombre, desc, imgSrc) {
    const modal = document.getElementById("modalPersonaje");
    const mTitulo = document.getElementById("modalTitulo");
    const mDesc = document.getElementById("modalDesc");
    const mImg = document.getElementById("modalImg");
    
    if (modal && mTitulo && mDesc && mImg) {
        mTitulo.textContent = nombre;
        mDesc.textContent = desc;
        mImg.src = imgSrc;
        modal.style.display = "flex";
    }
};

window.abrirModalGaleria = function(titulo, desc, imgSrc) {
    const modal = document.getElementById("modalGaleria");
    const mTitulo = document.getElementById("modalGaleriaTitulo");
    const mDesc = document.getElementById("modalGaleriaDesc");
    const mImg = document.getElementById("modalGaleriaImg");
    
    if (modal && mTitulo && mDesc && mImg) {
        mTitulo.textContent = titulo;
        mDesc.textContent = desc;
        mImg.src = imgSrc;
        modal.style.display = "flex";
    }
};

document.addEventListener("DOMContentLoaded", () => {

    // --- ANIMACIONES DE SCROLL (NUEVO) ---
    // Seleccionamos automáticamente todos los elementos importantes
    const elementosAAnimar = document.querySelectorAll('.texto-centrado-seccion, .columna-der-interactiva, .tarjeta-lugar, .personaje-card, .item-mosaico, .seccion-video, .seccion-promo, .columna-texto, .columna-imagen, .seccion-contacto, .seccion-mapa-faq, .ayuda-card');
    
    elementosAAnimar.forEach(el => el.classList.add('scroll-anim')); // Les agregamos la clase base

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Aparecen cuando entran en pantalla
                observer.unobserve(entry.target); // Dejan de observarse para que la animación se haga 1 sola vez
            }
        });
    }, { threshold: 0.15 });

    elementosAAnimar.forEach(el => observer.observe(el));


    // --- MODALES ---
    const modales = document.querySelectorAll(".modal-oculto");
    const botonesCerrar = document.querySelectorAll(".cerrar-modal");

    botonesCerrar.forEach(btn => {
        btn.addEventListener("click", () => { modales.forEach(m => m.style.display = "none"); });
    });

    window.addEventListener("click", (event) => {
        modales.forEach(m => {
            if (event.target === m) { m.style.display = "none"; }
        });
    });

    // --- GACHAPÓN ---
    const btnGacha = document.getElementById("btnGacha");
    const capsulaGacha = document.getElementById("capsulaGacha");
    const premioGacha = document.getElementById("premioGacha");
    
    const premios = [
        { icono: "🦒", texto: "¡Figura dorada de Chi!" },
        { icono: "🐢", texto: "¡Juego de té miniatura de Moca!" },
        { icono: "🦊", texto: "¡Peluche exclusivo de Yori!" },
        { icono: "🥕", texto: "¡Un paquete de 500 zanahorias!" },
        { icono: "🐡", texto: "¡Un pez globo legendario!" },
        { icono: "🦆", texto: "¡Un patito de goma para el baño!" }
    ];

    if (btnGacha && capsulaGacha && premioGacha) {
        btnGacha.addEventListener("click", () => {
            btnGacha.disabled = true;
            premioGacha.classList.remove("visible");
            capsulaGacha.className = "capsula animacion-sacudir";
            capsulaGacha.textContent = "🥚";

            setTimeout(() => {
                const random = Math.floor(Math.random() * premios.length);
                const premio = premios[random];
                
                capsulaGacha.className = "premio-revelado";
                capsulaGacha.textContent = premio.icono;
                premioGacha.textContent = premio.texto;
                premioGacha.classList.add("visible");
                btnGacha.disabled = false;
                btnGacha.textContent = "¡Tirar de nuevo!";
            }, 1500); 
        });
    }

    // --- TEST DE AFINIDAD ---
    const btnSiguiente = document.getElementById("btnSiguiente");
    const formAfinidad = document.getElementById("formAfinidad");
    const contenedorResultado = document.getElementById("contenedorResultado");
    const mensajeResultado = document.getElementById("mensajeResultado");
    const btnReiniciar = document.getElementById("btnReiniciar");
    const pasos = document.querySelectorAll(".paso-encuesta");
    const textoEncuesta = document.getElementById("textoEncuesta");

    const resultadosTest = {
        chi: "¡Sos Chi! Disfrutás de la calma y de una buena historia.",
        moca: "¡Sos Moca! Te encantan los placeres caseros y hechos a mano.",
        yori: "¡Sos Yori! Alguien noble que valora un paseo tranquilo.",
        tsuki: "¡Sos Tsuki! Un espíritu libre, predispuesto a relajarse."
    };

    if (btnSiguiente && formAfinidad && pasos.length > 0) {
        let pasoActual = 0;
        let respuestas = [];
        
        if (pasos.length > 1) { btnSiguiente.textContent = "Siguiente"; }

        btnSiguiente.addEventListener("click", () => {
            const pasoNode = pasos[pasoActual];
            const seleccion = pasoNode.querySelector('input[type="radio"]:checked');

            if (seleccion) {
                respuestas.push(seleccion.value);
                pasoNode.classList.remove("activo");
                pasoActual++;

                if (pasoActual < pasos.length) {
                    pasos[pasoActual].classList.add("activo");
                    if (pasoActual === pasos.length - 1) {
                        btnSiguiente.textContent = "Descubrir mi personaje";
                    }
                } else {
                    formAfinidad.style.display = "none";
                    textoEncuesta.style.display = "none";
                    
                    const conteo = {};
                    let maxVotos = 0;
                    let pjGanador = "tsuki"; 
                    
                    respuestas.forEach(r => {
                        conteo[r] = (conteo[r] || 0) + 1;
                        if (conteo[r] > maxVotos) { maxVotos = conteo[r]; pjGanador = r; }
                    });

                    mensajeResultado.textContent = resultadosTest[pjGanador];
                    contenedorResultado.classList.add("activo");
                }
            } else {
                alert("Por favor, seleccioná una opción para continuar.");
            }
        });

        btnReiniciar.addEventListener("click", () => {
            formAfinidad.reset();
            respuestas = [];
            pasoActual = 0;
            contenedorResultado.classList.remove("activo");
            formAfinidad.style.display = "flex";
            textoEncuesta.style.display = "block";
            btnSiguiente.textContent = "Siguiente";
            pasos.forEach(p => p.classList.remove("activo"));
            pasos[0].classList.add("activo");
        });
    }

    // --- FORMULARIO ---
    const formContacto = document.getElementById("formContacto");
    if (formContacto) {
        formContacto.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("¡Mensaje enviado a la Aldea Hongo con éxito! Tsuki lo leerá pronto.");
            formContacto.reset();
        });
    }
});