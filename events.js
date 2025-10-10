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