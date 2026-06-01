/* ========================================
   SMOOTH SCROLL FUNCTIONALITY
   Enhanced scroll behavior
   ======================================== */

class SmoothScroll {
    constructor(options = {}) {
        this.options = {
            duration: options.duration || 300,
            easing: options.easing || this.easeInOutCubic,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.setupScrollLinks();
        this.setupKeyboardNavigation();
    }
    
    setupScrollLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    this.scrollToElement(target);
                }
            });
        });
    }
    
    setupKeyboardNavigation() {
        const sections = document.querySelectorAll('section[id]');
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                this.scrollToNextSection();
            } else if (e.key === 'ArrowUp') {
                this.scrollToPreviousSection();
            }
        });
    }
    
    scrollToElement(element) {
        const targetPosition = element.offsetTop - 80;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.options.easing(timeElapsed / this.options.duration);
            window.scrollTo(0, startPosition + distance * run);
            
            if (timeElapsed < this.options.duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    scrollToNextSection() {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentScrollY = window.scrollY;
        
        const nextSection = sections.find(section => {
            return section.offsetTop > currentScrollY + 100;
        });
        
        if (nextSection) {
            this.scrollToElement(nextSection);
        }
    }
    
    scrollToPreviousSection() {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentScrollY = window.scrollY;
        
        const previousSection = sections.reverse().find(section => {
            return section.offsetTop < currentScrollY - 100;
        });
        
        if (previousSection) {
            this.scrollToElement(previousSection);
        }
    }
    
    // Easing functions
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    
    easeInOutExpo(t) {
        return t === 0 || t === 1 ? t : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
    }
}

// Initialize smooth scroll
new SmoothScroll();

// ======================================== 
// Scroll Position Memory
// ======================================== 

class ScrollPositionMemory {
    constructor() {
        this.scrollPositions = {};
        this.init();
    }
    
    init() {
        window.addEventListener('beforeunload', () => this.savePosition());
        window.addEventListener('load', () => this.restorePosition());
    }
    
    savePosition() {
        const pageKey = window.location.pathname;
        this.scrollPositions[pageKey] = window.scrollY;
        sessionStorage.setItem('scrollPositions', JSON.stringify(this.scrollPositions));
    }
    
    restorePosition() {
        const pageKey = window.location.pathname;
        const positions = JSON.parse(sessionStorage.getItem('scrollPositions')) || {};
        
        if (positions[pageKey]) {
            setTimeout(() => {
                window.scrollTo(0, positions[pageKey]);
            }, 100);
        }
    }
}

new ScrollPositionMemory();

// ======================================== 
// Scroll Spy
// ======================================== 

class ScrollSpy {
    constructor(navSelector = '.nav-menu', contentSelector = 'section') {
        this.nav = document.querySelector(navSelector);
        this.contents = document.querySelectorAll(contentSelector);
        this.navItems = this.nav.querySelectorAll('a');
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
    }
    
    updateActiveLink() {
        const currentPosition = window.scrollY + 100;
        
        this.contents.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (currentPosition >= sectionTop && currentPosition < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                this.navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
}

// Initialize scroll spy
new ScrollSpy();

// ======================================== 
// Parallax Scroll Effect
// ======================================== 

class ParallaxScroll {
    constructor(selector = '[data-parallax]') {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }
    
    init() {
        if (this.elements.length > 0) {
            window.addEventListener('scroll', () => this.updateParallax());
        }
    }
    
    updateParallax() {
        this.elements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            const yPos = window.scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Initialize parallax
new ParallaxScroll();

// ======================================== 
// Hash Navigation
// ======================================== 

class HashNavigation {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('hashchange', () => this.handleHashChange());
        // Handle initial hash on page load
        if (window.location.hash) {
            setTimeout(() => this.handleHashChange(), 100);
        }
    }
    
    handleHashChange() {
        const hash = window.location.hash.slice(1);
        const element = document.getElementById(hash);
        
        if (element) {
            const offset = 80;
            const targetPosition = element.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

new HashNavigation();

console.log('%cSmooth Scroll & Navigation System Loaded', 'color: #00d9ff; font-size: 12px; font-weight: bold;');
