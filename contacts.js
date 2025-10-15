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
