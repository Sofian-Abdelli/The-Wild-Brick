const params = new URLSearchParams(window.location.search);
const src = params.get("src");
const title = params.get("title") || "Votre création";

const imgEl = document.getElementById("selectedImage");
const titleEl = document.getElementById("title");

imgEl.src = src;
titleEl.textContent = title;
