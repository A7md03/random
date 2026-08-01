/* Cart persisted to localStorage. Cart item shape: { id, size, qty } */

const CART_KEY = "webstrike_cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id, size, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id && item.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, size, qty });
  }
  saveCart(cart);
}

function updateCartItemQty(id, size, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((item) => !(item.id === id && item.size === size));
  } else {
    const item = cart.find((i) => i.id === id && i.size === size);
    if (item) item.qty = qty;
  }
  saveCart(cart);
}

function removeFromCart(id, size) {
  const cart = getCart().filter((item) => !(item.id === id && item.size === size));
  saveCart(cart);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const product = getProductById(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

function updateCartBadge() {
  const badge = document.querySelector("[data-cart-count]");
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.hidden = count === 0;
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
