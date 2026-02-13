// ===================================
// VARIABLES GLOBALES
// ===================================
let btnYes, btnNo, proposalSection, acceptanceSection, treeContainer, loveMusic;
const yesClickCount = { count: 0 };

// ===================================
// INICIALIZACIÓN
// ===================================
window.addEventListener("DOMContentLoaded", function() {
    btnYes = document.getElementById('btnYes');
    btnNo = document.getElementById('btnNo');
    proposalSection = document.getElementById('proposalSection');
    acceptanceSection = document.getElementById('acceptanceSection');
    treeContainer = document.getElementById('treeContainer');
    loveMusic = document.getElementById('loveMusic');

    // Verificar que los elementos existen
    if (!btnYes || !btnNo || !proposalSection || !acceptanceSection || !treeContainer) {
        console.error("No se encontraron todos los elementos");
        return;
    }

    // Resetear secciones
    proposalSection.classList.remove("hidden");
    acceptanceSection.classList.remove("visible");
    treeContainer.classList.remove("visible");

    // ===================================
    // EFECTO BOTON NO
    // ===================================
    btnNo.addEventListener('click', function() {
        yesClickCount.count++;

        // El SÍ crece mucho más
        const sizeYes = 1 + yesClickCount.count * 0.3;
        btnYes.style.transform = `scale(${sizeYes})`;

        // El No se hace pequeño
        const sizeNo = 1 - yesClickCount.count * 0.15;
        btnNo.style.transform = `scale(${sizeNo})`;

        const textos = [
            "No 💔","¿Segura? 😢","¿Piénsalo 😿?","No me hagas esto 😭",
            "Última oportunidad 💔"
        ];
        btnNo.textContent = textos[Math.min(yesClickCount.count, textos.length - 1)];

        if (yesClickCount.count > 5) {
            btnNo.style.display = "none";
        }
    });

    // ===================================
    // BOTON SI
    // ===================================
    btnYes.addEventListener('click', function() {
        proposalSection.classList.add("hidden");
        acceptanceSection.classList.add("visible");

        // Reproducir música de fondo
        if (loveMusic) {
            loveMusic.play().catch(function(error) {
                console.log("No se pudo reproducir la música automáticamente:", error);
            });
        }

        setTimeout(function() {
            treeContainer.classList.add("visible");
            createTreeHearts();
            createCupidArrow();
        }, 500);

        startFallingHearts();
        startTimer();
        createCelebrationHearts();
    });
});

// ===================================
// CORAZON EN FORMA CORRECTA
// ===================================
function createTreeHearts() {
    const container = document.getElementById("treeHearts");
    if (!container) return;
    container.innerHTML = "";

    const colors = ["#ff1744","#f50057","#ff4081","#e91e63","#ff6b9d"];
    const symbols = ["❤️","💖","💗","💕","💓"];

    // Obtener el tamaño actual del contenedor dinámicamente
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const total = 200;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    const scale = Math.min(containerWidth, containerHeight) / 53;

    for (let i = 0; i < total; i++) {
        const t = Math.random() * Math.PI * 2;

        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);

        const heart = document.createElement("div");
        heart.className = "heart";

        if (Math.random() > 0.5) {
            heart.textContent = "♥";
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        } else {
            heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        }

        heart.style.left = (centerX + x * scale) + "px";
        heart.style.top = (centerY - y * scale) + "px";
        heart.style.fontSize = (14 + Math.random() * 10) + "px";

        container.appendChild(heart);
    }

    // Agregar iniciales C y K en el centro
    const initials = document.createElement("div");
    initials.className = "heart-initials";
    initials.innerHTML = "<span class='initial-c'>C</span><span class='initial-y'>y</span><span class='initial-k'>K</span>";
    initials.style.position = "absolute";
    initials.style.left = "39%";
    initials.style.top = "50%";
    initials.style.transform = "translate(-50%, -50%)";
    initials.style.zIndex = 10;
    initials.style.display = "flex";
    initials.style.gap = "3px";
    initials.style.alignItems = "center";
    initials.style.justifyContent = "center";

    container.appendChild(initials);
}

// ===================================
// CORAZONES CAYENDO
// ===================================
function createFallingHeart() {
    const container = document.getElementById("fallingHearts");
    if (!container) return;

    const heart = document.createElement("div");
    const symbols = ["❤️","💖","💗","💕","💓"];

    heart.className = "falling-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (12 + Math.random() * 18) + "px";

    container.appendChild(heart);

    setTimeout(function() { heart.remove(); }, 10000);
}

function startFallingHearts() {
    // Crear varios corazones iniciales
    for (let i = 0; i < 10; i++) {
        setTimeout(createFallingHeart, i * 300);
    }
    // Crear corazones continuamente con más frecuencia
    setInterval(createFallingHeart, 600);
}

// ===================================
// CONFETI
// ===================================
function createCelebrationHearts() {
    const symbols = ["💖","💕","💗","💓","❤️","💘","💝"];

    for (let i = 0; i < 80; i++) {
        setTimeout(function() {
            const h = document.createElement("div");
            h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            h.style.position = "fixed";
            h.style.left = "50%";
            h.style.top = "50%";
            h.style.fontSize = (20 + Math.random() * 20) + "px";
            h.style.transition = "2s";
            h.style.zIndex = "1000";
            h.style.pointerEvents = "none";
            document.body.appendChild(h);

            setTimeout(function() {
                const a = Math.random() * Math.PI * 2;
                const d = 200 + Math.random() * 200;
                h.style.left = (window.innerWidth / 2 + Math.cos(a) * d) + "px";
                h.style.top = (window.innerHeight / 2 + Math.sin(a) * d) + "px";
                h.style.opacity = "0";
            }, 50);

            setTimeout(function() { h.remove(); }, 2000);
        }, i * 40);
    }
}

// ===================================
// TIMER
// ===================================
function startTimer() {
    updateTimer();
    setInterval(updateTimer, 1000);
}

function updateTimer() {
    // Fecha de inicio de la relación: 01/10/2022
    const startDate = new Date('2022-10-01');
    const diff = new Date() - startDate;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.textContent = Math.floor(diff / 86400000);
    if (hoursEl) hoursEl.textContent = Math.floor(diff / 3600000) % 24;
    if (minutesEl) minutesEl.textContent = Math.floor(diff / 60000) % 60;
    if (secondsEl) secondsEl.textContent = Math.floor(diff / 1000) % 60;
}

// ===================================
// FLECHA DE CUPIDO
// ===================================
function createCupidArrow() {
    setTimeout(function() {
        const container = document.getElementById("treeHearts");
        if (!container) return;

        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;

        // Crear la flecha (solo el emoji)
        const arrow = document.createElement("div");
        arrow.className = "cupid-arrow";
        arrow.innerHTML = "🏹";
        arrow.style.position = "absolute";
        arrow.style.left = centerX + "px";
        arrow.style.top = (centerY - 50) + "px";
        arrow.style.fontSize = "0px";
        arrow.style.transform = "translate(-50%, -50%)";
        arrow.style.transition = "all 1.5s ease-out";
        arrow.style.zIndex = 20;
        arrow.style.opacity = "0";

        container.appendChild(arrow);

        // Animar la flecha atravesando
        setTimeout(function() {
            arrow.style.fontSize = "60px";
            arrow.style.opacity = "1";
            arrow.style.top = (centerY + 50) + "px";
        }, 100);

        // Desaparecer
        setTimeout(function() {
            arrow.style.opacity = "0";
            arrow.style.transform = "translate(-50%, -50%) scale(1.5)";
        }, 2500);

        setTimeout(function() { arrow.remove(); }, 3000);

    }, 2500);

    // Crear más flechas periódicamente
    setInterval(function() {
        const container = document.getElementById("treeHearts");
        if (!container) return;

        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        const angle = Math.random() * 360;

        const arrow = document.createElement("div");
        arrow.className = "cupid-arrow";
        arrow.innerHTML = "🏹";
        arrow.style.position = "absolute";
        arrow.style.left = centerX + "px";
        arrow.style.top = (centerY - 40) + "px";
        arrow.style.fontSize = "0px";
        arrow.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";
        arrow.style.transition = "all 1s ease-out";
        arrow.style.zIndex = 20;
        arrow.style.opacity = "0";

        container.appendChild(arrow);

        setTimeout(function() {
            arrow.style.fontSize = "45px";
            arrow.style.opacity = "1";
            arrow.style.top = (centerY + 40) + "px";
        }, 50);

        setTimeout(function() {
            arrow.style.opacity = "0";
        }, 2000);

        setTimeout(function() { arrow.remove(); }, 2500);

    }, 10000);
}


