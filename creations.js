// Cible tous les boutons "VOIR PLUS"
document.querySelectorAll(".img .btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const card = btn.closest(".img");
    const img = card.querySelector("img");

    let src = img.getAttribute("src");
    const title = img.getAttribute("alt");

    const url = `detail.html?src=${encodeURIComponent(
      src
    )}&title=${encodeURIComponent(title)}`;
    window.location.href = url;
  });
});
