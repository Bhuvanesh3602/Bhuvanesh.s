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
});
