/* ========================================
   MAIN JAVASCRIPT
   Core functionality, theme toggle, nav
   ======================================== */

// ======================================== 
// Theme Toggle
// ======================================== 

const htmlElement = document.documentElement;
htmlElement.setAttribute('data-theme', 'light');

// ======================================== 
// Navbar Scroll Effect
// ======================================== 

const navbar = document.getElementById('navbar');
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ======================================== 
// Mobile Navigation Toggle
// ======================================== 

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ======================================== 
// Intersection Observer for Animations
// ======================================== 

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ======================================== 
// Scroll Reveal Animation
// ======================================== 

const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

// Apply reveal effect to cards
document.querySelectorAll('.card, .project-card, .skill-category, .cert-card, .profile-card, .timeline-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(element);
});

// ======================================== 
// Active Navigation Link
// ======================================== 

function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ======================================== 
// Smooth Scroll Behavior
// ======================================== 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ======================================== 
// Floating Cards Animation
// ======================================== 

const floatingCards = document.querySelectorAll('.floating-card');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    floatingCards.forEach((card, index) => {
        const speed = (index + 1) * 10;
        const offsetX = (x - 0.5) * speed;
        const offsetY = (y - 0.5) * speed;
        
        card.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
});

// ======================================== 
// Scroll To Top Button
// ======================================== 

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.id = 'scrollToTop';
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    border: none;
    color: var(--bg-primary);
    font-size: 24px;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});

// ======================================== 
// Page Load Animation
// ======================================== 

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ======================================== 
// Performance Optimization
// ======================================== 

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ======================================== 
// Form Validation (for future contact form)
// ======================================== 

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formData) {
    if (!formData.name || formData.name.trim().length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters' };
    }
    
    if (!validateEmail(formData.email)) {
        return { valid: false, message: 'Please enter a valid email' };
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        return { valid: false, message: 'Message must be at least 10 characters' };
    }
    
    return { valid: true, message: 'Form is valid' };
}

// ======================================== 
// Utility Functions
// ======================================== 

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ======================================== 
// Analytics (Optional - Add your tracker)
// ======================================== 

// Uncomment and add your analytics code
// function trackEvent(eventName, eventData) {
//     console.log('Event:', eventName, eventData);
//     // Add your analytics tracking here
// }

// ======================================== 
// Console Message
// ======================================== 

console.log('%c👋 Welcome to Bhuvanesh\'s Portfolio!', 'color: #00d9ff; font-size: 16px; font-weight: bold;');
console.log('%cCheck out the source code on GitHub: https://github.com/Bhuvanesh2024', 'color: #7c3aed; font-size: 12px;');
