document.addEventListener("DOMContentLoaded", () => {

    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    function displayCart() {
        const main = document.querySelector("main");
        if (!main) return;

        const cart = getCart();
        main.innerHTML = "";

        const title = document.createElement("h1");
        title.textContent = "Your Cart";
        main.appendChild(title);

        if (cart.length === 0) {
            const emptyMsg = document.createElement("p");
            emptyMsg.textContent = "Your cart is empty.";
            main.appendChild(emptyMsg);
            return;
        }

        const cartContainer = document.createElement("div");
        cartContainer.classList.add("cartContainer");

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cartItem");

            const img = document.createElement("img");
            img.src = item.img;
            img.alt = item.name;

            const name = document.createElement("p");
            name.textContent = item.name;

            const price = document.createElement("p");
            price.textContent = item.price;

            const quantityContainer = document.createElement("div");
            quantityContainer.classList.add("quantityContainer");

            const minusBtn = document.createElement("button");
            minusBtn.textContent = "-";
            minusBtn.classList.add("btnQuantity");

            const qty = document.createElement("span");
            qty.textContent = item.quantity;

            const plusBtn = document.createElement("button");
            plusBtn.textContent = "+";
            plusBtn.classList.add("btnQuantity");

            minusBtn.addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart.splice(index, 1);
                }
                saveCart(cart);
            });

            plusBtn.addEventListener("click", () => {
                item.quantity++;
                saveCart(cart);
            });

            quantityContainer.appendChild(minusBtn);
            quantityContainer.appendChild(qty);
            quantityContainer.appendChild(plusBtn);

            cartItem.appendChild(img);
            cartItem.appendChild(name);
            cartItem.appendChild(price);
            cartItem.appendChild(quantityContainer);

            cartContainer.appendChild(cartItem);
        });

      const total = cart.reduce((sum, item) => {

      const price = parseFloat(String(item.price).replace(/[^0-9.-]+/g, ""));
      return sum + price * (item.quantity || 1);
      }, 0);


      const totalDisplay = document.createElement("h2");
      totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
      main.appendChild(cartContainer);
      main.appendChild(totalDisplay);

    
      const clearBtn = document.createElement("button");
      clearBtn.textContent = "Empty cart";
      clearBtn.classList.add("btnClearCart");
      clearBtn.addEventListener("click", () => {
          localStorage.removeItem("cart");
          displayCart();
        });

      main.appendChild(clearBtn);
    }

  displayCart();
});
