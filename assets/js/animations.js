document.addEventListener('DOMContentLoaded', () => {
    const loaderWrapper = document.getElementById('loaderWrapper');
    if (loaderWrapper) {
        window.setTimeout(() => {
            loaderWrapper.classList.add('hidden');
        }, 700);

        loaderWrapper.addEventListener('animationend', () => {
            loaderWrapper.style.display = 'none';
        });
    }

    const starsContainer = document.querySelector('.stars');
    if (starsContainer && !starsContainer.children.length) {
        const starCount = 70;

        for (let i = 0; i < starCount; i += 1) {
            const star = document.createElement('span');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.opacity = (0.4 + Math.random() * 0.6).toFixed(2);
            star.style.transform = `scale(${0.6 + Math.random() * 1.2})`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.animationDuration = `${2 + Math.random() * 4}s`;
            starsContainer.appendChild(star);
        }
    }

    // ── About section scroll animations ──────────────────────────────
    function countUp(el, target, prefix, suffix, isDecimal, duration) {
        const start = performance.now();
        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const val = target * ease;
            el.textContent = prefix + (isDecimal ? val.toFixed(1) : Math.floor(val)) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    function animateStatNumber(el) {
        const text = el.textContent.trim();
        if (text.startsWith('Top')) {
            const num = parseFloat(text.match(/[\d.]+/)[0]);
            countUp(el, num, 'Top ', '%', true, 1400);
        } else {
            const match = text.match(/^(\d+)(\+?)$/);
            if (match) countUp(el, parseInt(match[1]), '', match[2], false, 1200);
        }
    }

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const aboutText  = entry.target.querySelector('.about-text');
            const aboutStats = entry.target.querySelector('.about-stats');

            if (aboutText)  aboutText.classList.add('in-view');

            if (aboutStats) {
                aboutStats.classList.add('in-view');
                aboutStats.querySelectorAll('.stat-number').forEach((el, i) => {
                    setTimeout(() => animateStatNumber(el), 300 + i * 130);
                });
            }

            aboutObserver.unobserve(entry.target);
        });
    }, { threshold: 0.25 });

    const aboutSection = document.querySelector('#about');
    if (aboutSection) aboutObserver.observe(aboutSection);
});
