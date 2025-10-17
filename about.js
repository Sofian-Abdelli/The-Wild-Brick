const carroussel = document.querySelector('.aboutCarroussel');

carroussel.addEventListener('mouseover', () => {
    carroussel.style.animationPlayState = 'paused';
});

carroussel.addEventListener('mouseout', () => {
    carroussel.style.animationPlayState = 'running';
});

const burger = document.querySelector('.burger');

const navMenu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
}); 
