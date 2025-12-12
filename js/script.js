// Datos de ejemplo: productos
const products = [
  { id: 1, name: "Jabón artesanal de lavanda", price: 8.50, desc: "Relajante, ideal para piel sensible.", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Aceite corporal cítrico", price: 12.00, desc: "Hidratación diaria con aroma fresco.", img: "https://images.unsplash.com/photo-1524594154906-9b6c98f6f2b6?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Crema facial nutritiva", price: 18.00, desc: "Para piel radiante y equilibrada.", img: "https://images.unsplash.com/photo-1556228720-4e1a1b3f3f9a?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Exfoliante de café", price: 9.00, desc: "Revitaliza y suaviza la piel.", img: "https://images.unsplash.com/photo-1542444459-db13c0c1df2d?q=80&w=800&auto=format&fit=crop" }
];

let cart = [];

// Helpers
const $ = (sel) => document.querySelector(sel);
const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();

// Render productos
function renderProducts(){
  productGrid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>${p.desc}</p>
      <div class="price">$${p.price.toFixed(2)}</div>
      <div class="actions">
        <button class="btn ghost" onclick="openDetails(${p.id})">Ver</button>
        <button class="btn primary" onclick="addToCart(${p.id})">Agregar</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// Simples acciones
function openDetails(id){
  const p = products.find(x => x.id === id);
  alert(`${p.name}\n\n${p.desc}\n\nPrecio: $${p.price.toFixed(2)}`);
}

function addToCart(id){
  const p = products.find(x => x.id === id);
  const existing = cart.find(i => i.id === id);
  if(existing) existing.qty += 1;
  else cart.push({ ...p, qty: 1 });
  updateCartUI();
  // pequeña animación opcional: cambiar boton
  flashCart();
}

function flashCart(){
  const btn = document.getElementById('cartBtn');
  btn.classList.add('flash');
  setTimeout(()=>btn.classList.remove('flash'), 400);
}

function updateCartUI(){
  const totalQty = cart.reduce((s,i)=>s+i.qty,0);
  cartCount.textContent = totalQty;
  renderCartItems();
}

function renderCartItems(){
  if(cart.length === 0){
    cartItemsEl.innerHTML = '<p>Tu carrito está vacío.</p>';
    cartTotalEl.textContent = '$0.00';
    return;
  }
  cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach(item=>{
    total += item.price * item.qty;
    const el = document.createElement('div');
    el.style.display = 'flex';
    el.style.justifyContent = 'space-between';
    el.style.alignItems = 'center';
    el.style.marginBottom = '8px';
    el.innerHTML = `
      <div>
        <strong>${item.name}</strong><br><small style="color:#666">${item.qty} x $${item.price.toFixed(2)}</small>
      </div>
      <div style="display:flex; gap:6px; align-items:center">
        <button class="btn ghost" onclick="changeQty(${item.id}, -1)">-</button>
        <button class="btn ghost" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    `;
    cartItemsEl.appendChild(el);
  });
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
}

function changeQty(id, delta){
  const idx = cart.findIndex(i=>i.id===id);
  if(idx === -1) return;
  cart[idx].qty += delta;
  if(cart[idx].qty <= 0) cart.splice(idx,1);
  updateCartUI();
}

// abrir/cerrar modal
document.getElementById('cartBtn').addEventListener('click', ()=>{
  cartModal.setAttribute('aria-hidden','false');
  renderCartItems();
});
document.getElementById('closeCart').addEventListener('click', ()=>{
  cartModal.setAttribute('aria-hidden','true');
});

// checkout simulado
document.getElementById('checkoutBtn').addEventListener('click', ()=>{
  if(cart.length === 0){ alert('Agrega productos primero.'); return; }
  alert('¡Gracias! Pago simulado completado.');
  cart = [];
  updateCartUI();
  cartModal.setAttribute('aria-hidden','true');
});

// inicializar
renderProducts();
updateCartUI();