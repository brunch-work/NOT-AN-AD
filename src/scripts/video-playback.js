const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.querySelectorAll('.first-content video').forEach(video => {
        video.removeAttribute('autoplay');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const gridVideos = document.querySelectorAll('.case-study__asset video');
    gridVideos.forEach(video => {
        video.addEventListener('mouseenter', () => { video.play(); });
        video.addEventListener('mouseleave', () => { video.pause(); });
    });
});