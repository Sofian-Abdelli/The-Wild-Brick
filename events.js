document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-theme");
  const body = document.body;

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    body.classList.add("dark-theme");
  }

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    const newTheme = body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
  });
});

const burger = document.querySelector('.burger');

const navMenu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});