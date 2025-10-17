const params = new URLSearchParams(window.location.search);
const src = params.get("src");
const title = params.get("title") || "Votre création";

const imgEl = document.getElementById("selectedImage");
const titleEl = document.getElementById("title");

imgEl.src = src;
titleEl.textContent = title;

const storageKey = `comments:${src}`;

/**********************
 * 3) Helpers LocalStorage
 **********************/
function loadComments() {
  return JSON.parse(localStorage.getItem(storageKey)) || [];
}
function saveComments(list) {
  localStorage.setItem(storageKey, JSON.stringify(list));
}

/**********************
 * 4) Rendu des commentaires + moyenne
 **********************/
const commentsList = document.getElementById("commentsList");
const emptyState = document.getElementById("emptyState");
const avgValue = document.getElementById("avgValue");
const countValue = document.getElementById("countValue");

function renderComments() {
  const comments = loadComments();

  commentsList.innerHTML = "";
  if (comments.length === 0) {
    emptyState.style.display = "block";
    avgValue.textContent = "—";
    countValue.textContent = "0";
    return;
  }
  emptyState.style.display = "none";
  countValue.textContent = String(comments.length);

  // Calcul moyenne
  const sum = comments.reduce((acc, c) => acc + (c.rating || 0), 0);
  const avg = comments.length ? sum / comments.length : 0;
  avgValue.textContent = avg.toFixed(1);

  // Rendu cartes
  comments
    // tri du plus récent au plus ancien
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((c) => {
      const card = document.createElement("div");
      card.className = "card";

      const name = c.author && c.author.trim() ? c.author.trim() : "Anonyme";

      card.innerHTML = `
            <div class="meta">
              <div><strong>${escapeHtml(name)}</strong> · ${renderStarsInline(
        c.rating || 0
      )}</div>
              <div>${new Date(c.createdAt).toLocaleString()}</div>
            </div>
            <p style="margin:.6rem 0 1rem 0;">${escapeHtml(c.content)}</p>
            <div class="actions">
              <button data-action="like" data-id="${c.id}">👍 ${
        c.likes || 0
      }</button>
              <button data-action="delete" data-id="${
                c.id
              }">🗑️ Supprimer</button>
            </div>
          `;

      commentsList.appendChild(card);
    });
}

// Empêche l'injection HTML depuis les commentaires
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderStarsInline(n) {
  // n entre 0 et 5
  let s = "";
  for (let i = 1; i <= 5; i++) {
    s += i <= n ? "★" : "☆";
  }
  return s + ` (${n}/5)`;
}

// Délégation des clics sur Like / Delete
commentsList.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = btn.getAttribute("data-id");
  const action = btn.getAttribute("data-action");
  if (!id || !action) return;

  const comments = loadComments();
  const idx = comments.findIndex((c) => String(c.id) === String(id));
  if (idx === -1) return;

  if (action === "like") {
    comments[idx].likes = (comments[idx].likes || 0) + 1;
  } else if (action === "delete") {
    comments.splice(idx, 1);
  }
  saveComments(comments);
  renderComments();
});

/**********************
 * 5) Formulaire : gestion des étoiles, compteur, envoi
 **********************/
const form = document.getElementById("commentForm");
const authorInp = document.getElementById("author");
const contentInp = document.getElementById("content");
const lenOut = document.getElementById("len");
const starsWrap = document.getElementById("stars");
const starsLabel = document.getElementById("starsLabel");

const MAX = contentInp.maxLength || 300;

// compteur caractères
contentInp.addEventListener("input", () => {
  lenOut.textContent = String(contentInp.value.length);
});

// étoiles
let currentRating = 0;

function paintStars(n) {
  [...starsWrap.querySelectorAll(".star")].forEach((el, i) => {
    el.textContent = i + 1 <= n ? "★" : "☆";
    el.dataset.active = i + 1 <= n ? "true" : "false";
  });
  starsLabel.textContent = `(${n}/5)`;
}

starsWrap.addEventListener("click", (e) => {
  const s = e.target.closest(".star");
  if (!s) return;
  const val = Number(s.dataset.value);
  currentRating = val;
  paintStars(currentRating);
});

// feedback au survol (optionnel)
starsWrap.addEventListener("mouseover", (e) => {
  const s = e.target.closest(".star");
  if (!s) return;
  paintStars(Number(s.dataset.value));
});
starsWrap.addEventListener("mouseleave", () => {
  paintStars(currentRating);
});

// init étoiles + compteur
paintStars(0);
lenOut.textContent = "0";

// Envoi du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const author = authorInp.value.trim();
  const content = contentInp.value.trim();

  // validations simples
  if (!content) {
    alert("Merci d’écrire un commentaire.");
    return;
  }
  if (content.length > MAX) {
    alert(`Votre commentaire dépasse ${MAX} caractères.`);
    return;
  }
  if (currentRating < 1 || currentRating > 5) {
    alert("Merci de choisir une note entre 1 et 5 étoiles.");
    return;
  }

  // Crée un objet commentaire
  const comment = {
    id: Date.now(), // identifiant simple
    author,
    content,
    rating: currentRating, // 1..5
    likes: 0,
    createdAt: Date.now(),
  };

  // Sauvegarde
  const comments = loadComments();
  comments.push(comment);
  saveComments(comments);

  // Reset formulaire
  form.reset();
  currentRating = 0;
  paintStars(0);
  lenOut.textContent = "0";

  // Re-render
  renderComments();
});

// Premier rendu au chargement
renderComments();
