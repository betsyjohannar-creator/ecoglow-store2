/* ===========================
   LISTA DE PRODUCTOS
=========================== */
const products = [
  { 
    id: 1, 
    name: "Jabón artesanal de lavanda", 
    price: 8500, 
    desc: "Relajante, ideal para piel sensible.", 
    img: "assests/images/jabon.jpg"
  },
  { 
    id: 2, 
    name: "Aceite corporal cítrico", 
    price: 12000, 
    desc: "Hidratación diaria con aroma fresco.", 
    img: "assests/images/aceite.jpg"
  },
  { 
    id: 3, 
    name: "Crema facial nutritiva", 
    price: 18000, 
    desc: "Para piel radiante y equilibrada.", 
    img: "assests/images/crema.jpg"
  },
  { 
    id: 4, 
    name: "Exfoliante de café", 
    price: 9000, 
    desc: "Revitaliza y suaviza la piel.", 
    img: "assests/images/exfoliante.jpg"
  }
];

/* ===========================
   VARIABLES
=========================== */
let cart = [];

const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const yearEl = document.getElementById("year");

yearEl.textContent = new Date().getFullYear();

/* ===========================
   RENDERIZAR PRODUCTOS
=========================== */
function renderProducts() {
  productGrid.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card slide-up";

    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>${p.desc}</p>
      <div class="price">$${p.price.toLocaleString('es-CO')}</div>
      <div class="actions">
        <button class="btn ghost" onclick="openDetails(${p.id})">Ver</button>
        <button class="btn primary" onclick="addToCart(${p.id})">Agregar</button>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

/* ===========================
   MODAL DE DETALLES SIMPLIFICADO
=========================== */
function openDetails(id) {
  const p = products.find(x => x.id === id);
  alert(`${p.name}\n\n${p.desc}\n\nPrecio: $${p.price.toLocaleString('es-CO')}`);
}

/* ===========================
   CARRITO
=========================== */
function addToCart(id) {
  const p = products.find(x => x.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...p, qty: 1 });
  }

  updateCartUI();
  flashCart();
}

/* Pequeña animación al carrito */
function flashCart() {
  const btn = document.getElementById("cartBtn");
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 400);
}

/* Actualizar UI */
function updateCartUI() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalQty;

  renderCartItems();
}

/* Generar lista dentro del modal */
function renderCartItems() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<p>Tu carrito está vacío.</p>";
    cartTotalEl.textContent = "$0";
    return;
  }

  cartItemsEl.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const el = document.createElement("div");
    el.style.display = "flex";
    el.style.justifyContent = "space-between";
    el.style.marginBottom = "10px";

    el.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <small>${item.qty} x $${item.price.toLocaleString('es-CO')}</small>
      </div>
      <div>
        <button class="btn ghost" onclick="changeQty(${item.id}, -1)">-</button>
        <button class="btn ghost" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    `;

    cartItemsEl.appendChild(el);
  });

  cartTotalEl.textContent = "$" + total.toLocaleString('es-CO');
}

/* Cambiar cantidades */
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);

  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  updateCartUI();
}

/* ===========================
   MODAL
=========================== */
document.getElementById("cartBtn").addEventListener("click", () => {
  cartModal.setAttribute("aria-hidden", "false");
  renderCartItems();
});

document.getElementById("closeCart").addEventListener("click", () => {
  cartModal.setAttribute("aria-hidden", "true");
});

/* ===========================
   CHECKOUT
=========================== */
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Agrega productos primero.");
    return;
  }

  alert("¡Gracias por tu compra! Pago simulado completado.");
  cart = [];
  updateCartUI();

  cartModal.setAttribute("aria-hidden", "true");
});

/* ===========================
   INICIALIZAR
=========================== */
renderProducts();
updateCartUI();