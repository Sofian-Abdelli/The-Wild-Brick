const form = document.getElementById("contactForm");
const modal = document.getElementById("confirmationModal");
const closeModal = document.getElementById("closeModal");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    modal.style.display = "flex"; 
    form.reset();
  });

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});  

const burger = document.querySelector('.burger');

const navMenu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
}); 

