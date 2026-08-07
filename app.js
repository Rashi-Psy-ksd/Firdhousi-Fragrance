/* ============================================================================
   FIRDHOUSI FRAGRANCES — APP LOGIC
   Reads PRODUCTS / OFFERS from products.js, renders the shop, runs the cart,
   and sends the final order straight to WhatsApp.
   ============================================================================ */

const WHATSAPP_NUMBER = "916282330454"; // +91 6282 330 454, no plus / no spaces

/* ---------- small SVG icon library (inline, no external image requests) ---------- */
const ICONS = {
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 2l2.2 6.8H21l-5.6 4.1L17.6 20 12 15.9 6.4 20l2.2-7.1L3 8.8h6.8L12 2z" stroke="var(--gold)" fill="var(--gold)"/></svg>`,
  bottle: `<svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="38" y="10" width="24" height="16" rx="2" stroke="var(--gold)" stroke-width="2"/>
      <path d="M34 26h32l6 14v78a8 8 0 0 1-8 8H36a8 8 0 0 1-8-8V40l6-14z" stroke="var(--gold)" stroke-width="2"/>
      <path d="M26 60h48" stroke="var(--gold)" stroke-width="1" opacity="0.5"/>
      <path d="M32 44c6 6 30 6 36 0" stroke="var(--gold)" stroke-width="1" opacity="0.6"/>
    </svg>`,
  bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 8h12l1 13H5L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg>`,
  minus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12l6 6L20 6"/></svg>`,
  whatsapp: `<svg viewBox="0 0 32 32"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.34.65 4.53 1.78 6.4L4 29l7.79-1.74A11.94 11.94 0 0 0 16 27c6.628 0 12-5.373 12-12S22.629 3 16.001 3zm0 21.6c-1.98 0-3.83-.55-5.41-1.5l-.39-.23-4.62 1.03 1.05-4.5-.25-.4A9.55 9.55 0 0 1 5.4 15C5.4 9.15 10.15 4.4 16 4.4S26.6 9.15 26.6 15 21.85 24.6 16 24.6zm5.4-7.2c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2-1.4.25-.7.25-1.3.17-1.4-.07-.1-.27-.17-.57-.32z"/></svg>`,
  send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 20c8-1 15-6 16-16-9 1-15 7-16 16z"/><path d="M6 18c3-4 7-7 12-10"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2 8h11v9H2zM13 11h4l4 3v3h-8z"/><circle cx="6" cy="19" r="1.6"/><circle cx="17" cy="19" r="1.6"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1"/></svg>`
};

/* ---------- state ---------- */
let cart = []; // { id, qty }

/* ---------- helpers ---------- */
const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const byId = (id) => PRODUCTS.find(p => p.id === id);
const sortedByNewest = (list) => [...list].sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded));

function productImageMarkup(p){
  if (p.image && p.image.trim() !== ""){
    return `<img src="${p.image}" alt="${p.name}" loading="lazy"
      onerror="this.parentElement.innerHTML = window.placeholderMarkup('${p.category.replace(/'/g,"")}');">`;
  }
  return placeholderMarkup(p.category);
}
function placeholderMarkup(category){
  return `<div class="placeholder-bottle">${ICONS.bottle}<span class="ph-label">${category}</span></div>`;
}
window.placeholderMarkup = placeholderMarkup;

/* ---------- render: product card ---------- */
function cardHTML(p){
  const isNew = isRecentlyAdded(p.dateAdded);
  const onSale = p.compareAtPrice && p.compareAtPrice > p.price;

  // Calculate the discount percentage and price row
  let priceRowHTML = `<span class="price">${fmt(p.price)}</span>`;
  
  if (onSale) {
      const discount = Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100);
      priceRowHTML = `
          <span class="price">${fmt(p.price)}</span> 
          <span class="price-compare">${fmt(p.compareAtPrice)}</span> 
          <span class="discount">${discount}% Off</span>
      `;
  }

  return `
  <article class="card">
    <div class="card-inner">
      <div class="card-media">
        ${productImageMarkup(p)}
        ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ""}
        ${isNew ? `<span class="card-badge new">New</span>` : ""}
        ${onSale && !isNew ? `<span class="card-badge sale">Sale</span>` : ""}
      </div>
      <div class="card-body">
        <div class="card-cat">${p.category}</div>
        <h3 class="card-name">${p.name}</h3>
        <div class="card-size">${p.size}</div>
        

        <div class="card-reviews">
            <svg class="star-icon" viewBox="0 0 24 24" fill="#F5C518">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span class="rating">${p.rating || '5.0'}</span>
            <span class="review-count">(${p.reviews || '0'} Reviews)</span>
          </div>

        <div class="card-price-row">
          ${priceRowHTML}
        </div>
        
        <button class="card-add" data-id="${p.id}" ${p.soldOut ? "disabled" : ""}>
          ${p.soldOut ? "Sold Out" : "Add to Cart"}
        </button>
      </div>
    </div>
  </article>`;
}

function isRecentlyAdded(dateStr){
  const days = (Date.now() - new Date(dateStr).getTime()) / 86400000;
  return days <= 14;
}

/* ---------- render: sections ---------- */
function renderNewArrivals(){
  const el = document.getElementById("new-arrivals-grid");
  const newest = sortedByNewest(PRODUCTS).slice(0, 4);
  el.innerHTML = newest.map(cardHTML).join("");
}
function renderShopAll(){
  const el = document.getElementById("shop-grid");
  const all = sortedByNewest(PRODUCTS);
  el.innerHTML = all.map(cardHTML).join("");
}
function renderOffers(){
  const track = document.getElementById("announce-track");
  const active = OFFERS.filter(o => o.active);
  if (active.length === 0){ document.querySelector(".announce").style.display = "none"; return; }
  const items = active.map(o => `<span>${o.text}</span>`).join("");
  track.innerHTML = items + items; // duplicated for seamless marquee loop
}

/* ---------- cart logic ---------- */
function addToCart(id){
  const existing = cart.find(c => c.id === id);
  if (existing){ existing.qty += 1; }
  else { cart.push({ id, qty: 1 }); }
  renderCart();
  updateCartCount();
  showToast(`${byId(id).name} added to your bag`);
  openCart();
}
function changeQty(id, delta){
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0){ cart = cart.filter(c => c.id !== id); }
  renderCart();
  updateCartCount();
}
function removeFromCart(id){
  cart = cart.filter(c => c.id !== id);
  renderCart();
  updateCartCount();
}
function cartTotal(){
  return cart.reduce((sum, c) => sum + (byId(c.id).price * c.qty), 0);
}
function cartCount(){
  return cart.reduce((sum, c) => sum + c.qty, 0);
}
function updateCartCount(){
  const badge = document.getElementById("cart-count");
  const n = cartCount();
  badge.textContent = n;
  badge.style.display = n > 0 ? "flex" : "none";
}

function renderCart(){
  const wrap = document.getElementById("cart-items");
  if (cart.length === 0){
    wrap.innerHTML = `<div class="cart-empty">${ICONS.bag}<div>Your bag is empty.<br>Discover a fragrance you'll love.</div></div>`;
  } else {
    wrap.innerHTML = cart.map(c => {
      const p = byId(c.id);
      return `
      <div class="cart-item" data-id="${p.id}">
        <div class="cart-item-media">${productImageMarkup(p)}</div>
        <div class="cart-item-info">
          <div class="name">${p.name}</div>
          <div class="meta">${p.size} · ${p.category}</div>
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button class="qty-minus" data-id="${p.id}">${ICONS.minus}</button>
              <span>${c.qty}</span>
              <button class="qty-plus" data-id="${p.id}">${ICONS.plus}</button>
            </div>
            <span class="cart-item-price">${fmt(p.price * c.qty)}</span>
          </div>
          <button class="remove-btn" data-id="${p.id}">Remove</button>
        </div>
      </div>`;
    }).join("");
  }
  document.getElementById("cart-subtotal").textContent = fmt(cartTotal());
  document.getElementById("cart-total").textContent = fmt(cartTotal());
  document.getElementById("checkout-btn").disabled = cart.length === 0;
}

/* ---------- WhatsApp checkout ---------- */
function buildOrderMessage(){
  const lines = [];
  lines.push("Hello Firdhousi Fragrances! ✨");
  lines.push("I would like to place an order:");
  lines.push("");
  cart.forEach((c, i) => {
    const p = byId(c.id);
    lines.push(`${i + 1}. ${p.name} (${p.size}) x${c.qty} — ${fmt(p.price * c.qty)}`);
  });
  lines.push("");
  lines.push(`Total: ${fmt(cartTotal())}`);
  lines.push("");
  lines.push("Please share payment details and confirm my delivery address.");
  return lines.join("\n");
}
function sendOrderToWhatsApp(){
  if (cart.length === 0) return;
  const message = encodeURIComponent(buildOrderMessage());
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank");
}
function openGeneralWhatsApp(){
  const message = encodeURIComponent("Hello Firdhousi Fragrances! I'd like to know more about your perfumes.");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}

/* ---------- toast ---------- */
let toastTimer;
function showToast(text){
  const toast = document.getElementById("toast");
  toast.innerHTML = `${ICONS.check} <span>${text}</span>`;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

/* ---------- drawer / nav open-close ---------- */
function openCart(){
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("overlay").classList.add("open");
}
function closeCart(){
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("open");
}
function toggleNav(){
  document.querySelector("nav.main-nav").classList.toggle("open");
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("icon-year").textContent = new Date().getFullYear();

  renderOffers();
  renderNewArrivals();
  renderShopAll();
  renderCart();
  updateCartCount();

  // delegated click handling
  document.body.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".card-add");
    if (addBtn && !addBtn.disabled){ addToCart(addBtn.dataset.id); return; }

    const qtyPlus = e.target.closest(".qty-plus");
    if (qtyPlus){ changeQty(qtyPlus.dataset.id, 1); return; }

    const qtyMinus = e.target.closest(".qty-minus");
    if (qtyMinus){ changeQty(qtyMinus.dataset.id, -1); return; }

    const removeBtn = e.target.closest(".remove-btn");
    if (removeBtn){ removeFromCart(removeBtn.dataset.id); return; }

    if (e.target.closest("#cart-toggle")){ openCart(); return; }
    if (e.target.closest("#cart-close") || e.target.closest("#overlay")){ closeCart(); return; }
    if (e.target.closest("#checkout-btn")){ sendOrderToWhatsApp(); return; }
    if (e.target.closest("#wa-float")){ openGeneralWhatsApp(); return; }
    if (e.target.closest("#menu-toggle")){ toggleNav(); return; }
    if (e.target.closest("#menu-close")){ document.querySelector("nav.main-nav").classList.remove("open"); return; }
  

    // close mobile nav after clicking a link
    if (e.target.closest("nav.main-nav a")){
      document.querySelector("nav.main-nav").classList.remove("open");
    }
  });
});
