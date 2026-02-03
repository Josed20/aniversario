// ============================================
// CONFIGURACIÓN - PERSONALIZA AQUÍ
// ============================================
const RELATIONSHIP_START_DATE = '2025-09-03'; // 3 de Septiembre de 2025 ❤️

// ============================================
// CONTROL DE MÚSICA
// ============================================
const backgroundMusic = document.getElementById('backgroundMusic');
const musicControl = document.getElementById('musicControl');
let isPlaying = false;

musicControl.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        musicControl.textContent = '🔇';
        musicControl.classList.add('paused');
        musicControl.title = 'Reproducir música';
    } else {
        backgroundMusic.play();
        musicControl.textContent = '🎵';
        musicControl.classList.remove('paused');
        musicControl.title = 'Pausar música';
    }
    isPlaying = !isPlaying;
});

// ============================================
// PANTALLA DE BIENVENIDA
// ============================================
const surpriseBtn = document.getElementById('surpriseBtn');
const welcomeScreen = document.getElementById('welcomeScreen');
const mainContent = document.getElementById('mainContent');

surpriseBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    
    // Iniciar música de fondo
    backgroundMusic.play().then(() => {
        isPlaying = true;
        musicControl.textContent = '🎵';
    }).catch(error => {
        console.log('Autoplay bloqueado, haz clic en el botón de música para reproducir');
    });
    
    setTimeout(() => {
        mainContent.classList.add('visible');
        startHeartRain();
        updateCounter();
        setInterval(updateCounter, 1000);
    }, 500);
});

// ============================================
// LLUVIA DE CORAZONES
// ============================================
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    
    const colors = ['#ff6b9d', '#ffa8c5', '#b8a1d6', '#ff8fab'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    document.getElementById('heartsContainer').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

function startHeartRain() {
    setInterval(createHeart, 300);
}

// ============================================
// CONTADOR DE TIEMPO
// ============================================
function updateCounter() {
    const startDate = new Date(RELATIONSHIP_START_DATE);
    const now = new Date();
    
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    
    if (hours < 0) {
        days--;
        hours += 24;
    }
    
    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
}

// ============================================
// CARRUSEL DE FOTOS
// ============================================
let currentSlide = 0;
const carouselInner = document.getElementById('carouselInner');
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;
const dotsContainer = document.getElementById('carouselDots');

// Crear dots de navegación
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.carousel-dot');

function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Event listeners para las flechas
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Auto-play del carrusel (cambia cada 5 segundos)
setInterval(nextSlide, 5000);

// ============================================
// PARTÍCULAS DECORATIVAS
// ============================================
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Crear partículas brillantes cada medio segundo
setInterval(createSparkle, 500);
