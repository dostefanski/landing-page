document.addEventListener('DOMContentLoaded', () => {
    // Animação de entrada para os elementos
    animateOnScroll();
    
    // Efeito de hover nos botões sociais
    setupSocialButtons();
    
    // Efeito de digitação para o título da profissão
    typewriterEffect();
    
    // Inicializar o carrossel de projetos
    initProjectCarousel();
});

// Função para animar elementos quando entrarem na viewport
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });
    
    // Adicionar estilos CSS necessários
    const style = document.createElement('style');
    style.textContent = `
        .hidden {
            opacity: 0;
            transform: translateY(20px);
            transition: none;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `;
    document.head.appendChild(style);
}

// Configurar efeitos nos botões sociais
function setupSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', (e) => {
            // Adicionar efeito de ripple ao clicar
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            button.appendChild(ripple);
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Adicionar estilos CSS para o efeito ripple
    const style = document.createElement('style');
    style.textContent = `
        .social-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Efeito de digitação para o título da profissão
function typewriterEffect() {
    const professionElement = document.querySelector('.profile-text h2');
    const professionText = professionElement.textContent;
    professionElement.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < professionText.length) {
            professionElement.textContent += professionText.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            // Adicionar cursor piscante no final
            professionElement.innerHTML += '<span class="cursor">|</span>';
            setInterval(() => {
                const cursor = document.querySelector('.cursor');
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }, 100);
    
    // Adicionar estilos CSS para o cursor
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            color: var(--primary);
            font-weight: bold;
            transition: opacity 0.1s;
        }
    `;
    document.head.appendChild(style);
}

// Adicionar tema escuro/claro (preparado para implementação futura)
function setupThemeToggle() {
    // Esta função pode ser expandida no futuro para adicionar
    // funcionalidade de alternância entre temas claro e escuro
    console.log('Theme toggle functionality prepared for future implementation');
}

// Carrossel de Projetos
function initProjectCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-card');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dots = document.querySelectorAll('.carousel-dot');
    
    let currentIndex = 0;
    const cardCount = cards.length;
    
    // Adicionar classe para animação inicial
    setTimeout(() => {
        cards[0].classList.add('active');
    }, 100);
    
    // Função para atualizar o carrossel
    function updateCarousel() {
        // Atualizar posição do track
        track.style.transform = `translateX(-${currentIndex * 33.333}%)`;
        
        // Atualizar classes ativas
        cards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentIndex) {
                setTimeout(() => {
                    card.classList.add('active');
                }, 50);
            }
        });
        
        // Atualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Adicionar efeito 3D nos cards
        applyCardEffect();
    }
    
    // Botão próximo
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cardCount;
        updateCarousel();
    });
    
    // Botão anterior
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cardCount) % cardCount;
        updateCarousel();
    });
    
    // Navegação por dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Efeito 3D nos cards
    function applyCardEffect() {
        cards.forEach((card) => {
            card.addEventListener('mousemove', handleCardMove);
            card.addEventListener('mouseleave', handleCardLeave);
        });
    }
    
    function handleCardMove(e) {
        const card = this.querySelector('.project-card');
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 10;
        const rotateX = ((centerY - y) / centerY) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        
        // Efeito de brilho
        const glare = card.querySelector('.project-overlay');
        if (glare) {
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.4) 80%)`;
        }
    }
    
    function handleCardLeave() {
        const card = this.querySelector('.project-card');
        card.style.transform = '';
        
        // Resetar efeito de brilho
        const glare = card.querySelector('.project-overlay');
        if (glare) {
            glare.style.background = 'rgba(0, 0, 0, 0.4)';
        }
    }
    
    // Inicializar efeito 3D
    applyCardEffect();
    
    // Auto-rotação do carrossel
    let autoplayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % cardCount;
        updateCarousel();
    }, 5000);
    
    // Parar auto-rotação quando o usuário interagir
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cardCount;
            updateCarousel();
        }, 5000);
    });
    
    // Suporte para gestos de swipe em dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe para esquerda - próximo slide
            currentIndex = (currentIndex + 1) % cardCount;
            updateCarousel();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe para direita - slide anterior
            currentIndex = (currentIndex - 1 + cardCount) % cardCount;
            updateCarousel();
        }
    }
}