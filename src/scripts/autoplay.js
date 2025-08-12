const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.querySelectorAll('.first-content video').forEach(video => {
        video.removeAttribute('autoplay');
    });
}