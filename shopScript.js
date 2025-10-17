//-------------------------dark theme--------------------------------
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
//-------------------------slider--------------------------------
const sliders = document.querySelectorAll(".shopSlider");

sliders.forEach(slider => {
  const track = slider.querySelector(".shopSliderTrack");
  const slides = slider.querySelectorAll(".shopSlide");
  const prev = slider.querySelector(".shopArrow.left");
  const next = slider.querySelector(".shopArrow.right");

  const slideWidth = slides[0].offsetWidth + 10;

  next.addEventListener("click", () => {
    track.scrollBy({ left: slideWidth, behavior: "smooth" });
  });

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -slideWidth, behavior: "smooth" });
  });

  track.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
    }
  });

  let isDown = false;
  let startX;
  let scrollLeft;

  const disableSnap = () => {
    track.dataset.snap = track.style.scrollSnapType;
    track.style.scrollSnapType = "none";
  };

  const enableSnap = () => {
    if (track.dataset.snap) {
      track.style.scrollSnapType = track.dataset.snap;
    } else {
      track.style.scrollSnapType = "";
    }
  };

  track.addEventListener("mousedown", (e) => {
    isDown = true;
    disableSnap();
    track.classList.add("dragging");
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    e.preventDefault();
  });

  track.addEventListener("mouseleave", () => {
    if (isDown) enableSnap();
    isDown = false;
    track.classList.remove("dragging");
  });

  track.addEventListener("mouseup", () => {
    enableSnap();
    isDown = false;
    track.classList.remove("dragging");
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.2;
    track.scrollLeft = scrollLeft - walk;
  });
});
//--------------------slider------------------------------

//-----------------------BURGER--------------------------------

const burger = document.querySelector('.burger');

const navMenu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
}); 


//--------------------cart--------------------------------

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
}

function updateCartCounter() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.querySelector(".cartTop");

    if (cartIcon) {
        let counter = document.querySelector(".cartCounter");

        if (!counter) {
            counter = document.createElement("span");
            counter.classList.add("cartCounter");

            cartIcon.parentElement.style.position = "relative";
            cartIcon.parentElement.appendChild(counter);
        }

        counter.textContent = totalItems;
        counter.style.display = totalItems > 0 ? "flex" : "none";
    }
}


function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push(product);
    }
    saveCart(cart);
}

document.querySelectorAll(".shopAddToCart").forEach(btn => {
    btn.addEventListener("click", () => {
        const parent = btn.closest(".shopSlide, .shopSlide1");
        const name = parent.querySelector(".shopNameProduct").textContent;
        const price = parent.querySelector(".shopPriceProduct").textContent;
        const img = parent.querySelector("img").getAttribute("src");

        const product = {
            name: name,
            price: price,
            img: img,
            quantity: 1
        };

        addToCart(product);
    });
});

updateCartCounter();

