document.addEventListener("DOMContentLoaded", function () {
  // Subscribe feature
  const subscribeForm = document.querySelector('form[name="subscribe"]');
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for subscribing.");
    });
  }

  // Gallery page features
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const clearCartButton = document.getElementById("clear-cart");
  const processOrderButton = document.getElementById("process-order");
  const viewCartButton = document.getElementById("view-cart");
  const cartContents = document.getElementById("cart-contents");
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  let cartItems = [];

  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const cell = this.closest("td");
        const item = cell.querySelector("img").alt;
        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        cart.push(item);
        sessionStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
        alert("Item added to the cart");
      });
    });
  }

  if (clearCartButton) {
    clearCartButton.addEventListener("click", function () {
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      if (cart.length > 0) {
        sessionStorage.removeItem("cart");
        updateCart();
        alert("Cart cleared");
      } else {
        alert("No items to clear");
      }
    });
  }

  if (processOrderButton) {
    processOrderButton.addEventListener("click", function () {
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      if (cart.length > 0) {
        alert("Thank you for your order");
        sessionStorage.removeItem("cart");
        updateCart();
      } else {
        alert("Cart is empty");
      }
    });
  }

  if (viewCartButton) {
    viewCartButton.addEventListener("click", function () {
      if (cartContents.style.display === "none") {
        cartContents.style.display = "block";
        viewCartButton.textContent = "Hide Cart";
      } else {
        cartContents.style.display = "none";
        viewCartButton.textContent = "View Cart";
      }
    });
  }

  function updateCart() {
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (cartItemsList && cartTotal) {
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      cartItemsList.innerHTML = "";
      cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        cartItemsList.appendChild(li);
      });
      cartTotal.textContent = cart.length;
    }
  }
  updateCart();

  // Contact form
  const contactForm = document.querySelector('form[name="contact"]');
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = this.querySelector("#name").value;
      const email = this.querySelector("#email").value;
      const message = this.querySelector("#message").value;
      const order = this.querySelector("#order").value;

      const feedback = {
        name: name,
        email: email,
        message: message,
        order: order,
        date: new Date().toISOString(),
      };

      let allFeedback =
        JSON.parse(localStorage.getItem("customerFeedback")) || [];
      allFeedback.push(feedback);
      localStorage.setItem("customerFeedback", JSON.stringify(allFeedback));

      alert("Thank you for your message. Your feedback has been saved.");
      this.reset();
    });
  }
});