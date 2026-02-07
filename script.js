function sidebar() {
  const menu = document.querySelector(".menu");
  HideCart();
  menu.classList.add("open");
}

function HideSidebar() {
  const menu = document.querySelector(".menu");
  menu.classList.remove("open");
}

function ShowCart() {
  const cart = document.querySelector(".cart");
  cart.style.display = "block";
}

function HideCart() {
  const cart = document.querySelector(".cart");
  cart.style.display = "none";
}

const images = [
  "./images/image-product-1.jpg",
  "./images/image-product-2.jpg",
  "./images/image-product-3.jpg",
  "./images/image-product-4.jpg",
];

let currentIndex = 0;
const heroDiv = document.querySelector(".main");

const thumbnails = document.querySelectorAll(".thumbnails div");

function updateBackground() {
  heroDiv.style.backgroundImage = `url('${images[currentIndex]}')`;

  thumbnails.forEach((thumb, index) => {
    if (index === currentIndex) {
      thumb.classList.add("active");
    } else {
      thumb.classList.remove("active");
    }
  });
}

function setView(index) {
  currentIndex = index;
  updateBackground();
}

function nextSlide() {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  updateBackground();
}

function prevSlide() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  updateBackground();
}

const qtyBox = document.querySelector(".qty-button");
const reduceBtn = qtyBox.querySelector(".reduce");
const increaseBtn = qtyBox.querySelector(".increase");
const countEl = qtyBox.querySelector(".count");

let count = 0;

increaseBtn.addEventListener("click", () => {
  count++;
  syncUI();
});

reduceBtn.addEventListener("click", () => {
  if (count > 0) {
    count--;
    syncUI();
  }
});

const cartList = document.querySelector(".cart-list");
const checkoutContainer = document.querySelector(".check-out");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const cartCount = document.querySelector(".cart-count");

let cartItem = null;

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    if (count === 0) return;

    const name = addToCartBtn.dataset.name;
    const price = Number(addToCartBtn.dataset.price);
    const image = addToCartBtn.dataset.image;

    if (!cartItem) {
      cartItem = { name, price, qty: count, image };
    } else {
      cartItem.qty = 0;
      cartItem.qty += count;
    }

    renderCart();
  });
}

function syncUI() {
  countEl.textContent = count;
  if (cartItem) {
    cartItem.qty = count;
    renderCart();
  }
}

function renderCart() {
  if (!cartItem || cartItem.qty === 0) {
    cartList.innerHTML = '<p class="empty-msg">Your cart is empty</p>';
    if (checkoutContainer) checkoutContainer.style.display = "none";

    if (cartCount) cartCount.style.display = "none";

    return;
  }

  if (checkoutContainer) checkoutContainer.style.display = "flex";
  if (cartCount) cartCount.style.display = "flex";

  const total = (cartItem.price * cartItem.qty).toFixed(2);

  cartList.innerHTML = `
    <ul class="cart-items-list">
      <li>
        <div class="cart-item">
          <img class="item-img" src="${cartItem.image}" alt="" />
          <div class="item-detail">
            <p>${cartItem.name}</p>
            <p>$${cartItem.price.toFixed(2)} x ${cartItem.qty} <strong>$${total}</strong></p>
          </div>
          <div class="remove-icon" id="delete-item">
            <img src="./images/icon-delete.svg" alt="delete" />
          </div>
        </div>
      </li>
    </ul>
  `;

  cartCount.innerHTML = cartItem.qty;

  document.getElementById("delete-item").addEventListener("click", () => {
    cartItem = null;
    renderCart();
  });
}

renderCart();

const lightbox = document.querySelector(".lightbox");
const lightboxMain = document.querySelector(".lightbox-main");
const lightboxThumbnails = document.querySelectorAll(
  ".lightbox-thumbnails div",
);

function openLightbox() {
  if (window.innerWidth >= 1024) {
    lightbox.classList.add("open");
    currentIndex = currentIndex;
    updateLightboxBackground();
  }
}

function closeLightbox() {
  lightbox.classList.remove("open");
}

heroDiv.addEventListener("click", openLightbox);

function updateLightboxBackground() {
  lightboxMain.style.backgroundImage = `url('${images[currentIndex]}')`;

  lightboxThumbnails.forEach((thumb, index) => {
    if (index === currentIndex) {
      thumb.classList.add("active");
    } else {
      thumb.classList.remove("active");
    }
  });
}

function nextSlideLightbox() {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  updateBackground();
  updateLightboxBackground();
}

function prevSlideLightbox() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  updateBackground();
  updateLightboxBackground();
}

function setLightboxView(index) {
  currentIndex = index;
  updateBackground();
  updateLightboxBackground();
}

const originalUpdateBackground = updateBackground;
updateBackground = function () {
  heroDiv.style.backgroundImage = `url('${images[currentIndex]}')`;

  thumbnails.forEach((thumb, index) => {
    if (index === currentIndex) {
      thumb.classList.add("active");
    } else {
      thumb.classList.remove("active");
    }
  });

  if (lightbox) updateLightboxBackground();
};
