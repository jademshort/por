// jade's archive - Pixelated portfolio JavaScript
class PixelPortfolio {
    constructor() {
        this.pixelTitleContainer = document.getElementById('pixelTitleContainer');
        this.pixelTitle = document.getElementById('pixelTitle');
        this.portfolioContent = document.getElementById('portfolioContent');
        
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.createCustomCursor();
        // Start typing immediately
        this.createPixelTitle();
    }
    
    createPixelTitle() {
        const text = "jade's archive";
        
        // Clear the container
        this.pixelTitle.innerHTML = '';
        
        // Create container for the typing text
        const typingContainer = document.createElement('div');
        typingContainer.style.display = 'inline-block';
        
        // Split text into individual letters and spaces
        const characters = [];
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            
            if (char === ' ') {
                span.className = 'space';
                span.innerHTML = '&nbsp;';
            } else {
                span.className = 'letter';
                span.textContent = char;
            }
            
            characters.push(span);
            typingContainer.appendChild(span);
        }
        
        // Add typing cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor typing';
        typingContainer.appendChild(cursor);
        
        this.pixelTitle.appendChild(typingContainer);
        
        // Start typing animation
        this.typeLetters(characters, cursor);
    }
    
    typeLetters(characters, cursor) {
        let currentIndex = 0;
        const typingSpeed = 150; // milliseconds between each character
        
        const typeNextLetter = () => {
            if (currentIndex < characters.length) {
                // Make current character visible
                characters[currentIndex].classList.add('typed');
                
                // Move cursor to after the current character
                const currentChar = characters[currentIndex];
                currentChar.parentNode.removeChild(cursor);
                
                // Insert cursor after current character
                if (currentIndex + 1 < characters.length) {
                    characters[currentIndex + 1].parentNode.insertBefore(cursor, characters[currentIndex + 1]);
                } else {
                    // If this is the last character, append cursor at the end
                    currentChar.parentNode.appendChild(cursor);
                }
                
                currentIndex++;
                
                // Continue typing after delay
                setTimeout(typeNextLetter, typingSpeed);
            } else {
                // Finished typing - change cursor to finished blinking state
                cursor.classList.add('finished');
                
                // Show portfolio after a pause
                setTimeout(() => {
                    this.showPortfolioContent();
                }, 2000);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeNextLetter, 500);
    }
    
    showPortfolioContent() {
        this.portfolioContent.classList.remove('hidden');
        
        // Scroll to content smoothly
        setTimeout(() => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }, 500);
    }
    
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.section');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const sectionId = item.getAttribute('data-section');
                
                // Update active nav
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // Show section
                sections.forEach(section => section.classList.remove('active'));
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
                
                this.addClickEffect(item);
            });
        });
        
        // Show about section by default
        if (navItems.length > 0) {
            setTimeout(() => navItems[0].click(), 100);
        }
    }
    
    addClickEffect(element) {
        element.style.transform = 'translateY(-2px)';
        element.style.textShadow = '0 0 15px var(--accent-mauve)';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.textShadow = '';
        }, 200);
    }
    
    createCustomCursor() {
        document.addEventListener('mousemove', (e) => {
            document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
        });
    }
    
    addGlitchEffect() {
        const glitchText = document.querySelector('.glitch-text');
        if (glitchText) {
            // Random glitch intervals
            setInterval(() => {
                if (Math.random() < 0.1) { // 10% chance every interval
                    glitchText.style.animation = 'none';
                    setTimeout(() => {
                        glitchText.style.animation = 'glitch 2s infinite';
                    }, 50);
                }
            }, 3000);
        }
    }
    
    addClickEffect(element) {
        // Create a temporary glow effect
        element.style.boxShadow = '0 0 30px rgba(184, 134, 157, 0.8)';
        element.style.transform = 'translateY(-5px) scale(1.02)';
        
        setTimeout(() => {
            element.style.boxShadow = '';
            element.style.transform = '';
        }, 200);
        
        // Add some terminal-like feedback
        this.showTerminalFeedback(`Accessing ${element.querySelector('.menu-label').textContent}...`);
    }
    
    addHoverEffect(element) {
        // Subtle pulse effect on hover
        const icon = element.querySelector('.menu-icon');
        if (icon) {
            icon.style.textShadow = '0 0 10px rgba(255, 107, 157, 0.8)';
            setTimeout(() => {
                icon.style.textShadow = '';
            }, 200);
        }
    }
    
    showTerminalFeedback(message) {
        // Create temporary feedback in the terminal style
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: #00ff41;
            padding: 10px 20px;
            border: 1px solid #00ff41;
            border-radius: 4px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        feedback.textContent = message;
        
        document.body.appendChild(feedback);
        
        // Animate in
        setTimeout(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateX(100px)';
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 2000);
    }
    
    // Easter eggs and additional interactivity
    addKonamiCode() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.activateEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }
    
    activateEasterEgg() {
        // Secret synthwave mode
        document.body.style.animation = 'rainbow 2s infinite';
        this.showTerminalFeedback('SYNTHWAVE_MODE.EXE ACTIVATED');
        
        // Add rainbow animation to CSS dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            document.head.removeChild(style);
        }, 10000);
    }
}

// Matrix rain effect for background
class MatrixRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.1;
        `;
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.init();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const fontSize = 14;
        const columns = Math.floor(this.canvas.width / fontSize);
        const drops = Array(columns).fill(0);
        
        const draw = () => {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.fillStyle = '#b8869d';
            this.ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                
                this.ctx.fillText(text, x, y);
                
                if (y > this.canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                } else {
                    drops[i]++;
                }
            }
        };
        
        setInterval(draw, 50);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new PixelPortfolio();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});
