const carroussel = document.querySelector('.aboutCarroussel');

carroussel.addEventListener('mouseover', () => {
    carroussel.style.animationPlayState = 'paused';
});

carroussel.addEventListener('mouseout', () => {
    carroussel.style.animationPlayState = 'running';
});
