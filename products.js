/* ============================================================================
   FIRDHOUSI FRAGRANCES — PRODUCT CATALOG
   ============================================================================
   HOW TO ADD A NEW PERFUME (no coding needed):

   1. On GitHub, open this file (products.js) and click the pencil (Edit) icon.
   2. Copy one of the { ... } blocks below, paste it just under PRODUCTS = [
      and fill in your own details.
   3. Give every product a UNIQUE id (e.g. "p13", "p14"...).
   4. Set "dateAdded" to today's date as "YYYY-MM-DD" — the newest date
      always shows first on the site, automatically.
   5. Set "image" to the photo filename inside the /images folder.
      Upload your photo to the images folder first (drag & drop on GitHub),
      then type its filename here exactly, e.g. "images/oud-royale.jpg".
      If you don't have a photo yet, leave it as "" and a nice placeholder
      will be shown automatically.
   6. Commit the change. The live site updates automatically within a minute.

   To REMOVE a product, delete its whole { ... } block.
   To mark something SOLD OUT, add:  soldOut: true
   To feature something as a Bestseller, add:  badge: "Bestseller"
   ============================================================================ */

const PRODUCTS = [
  {
    id: "p1",
    name: "Oud Al Malik",
    category: "Royal Oud",
    price: 3499,
    compareAtPrice: 3999,
    size: "12ml",
    image: "images/Oudh_Premium.webp",
    description: "A regal blend of aged Cambodian oud, saffron and amber — deep, smoky and unforgettable. Long-lasting attar, alcohol-free.",
    dateAdded: "2026-08-01",
    badge: "Bestseller"
  },
  {
    id: "p2",
    name: "Mukhallat Firdaus",
    category: "Mukhallat",
    price: 2799,
    compareAtPrice: null,
    size: "12ml",
    image: "images/mukallat.jpg",
    description: "Our signature house blend — rose, oud and musk layered into a warm, garden-of-paradise scent that lingers for hours.",
    dateAdded: "2026-07-28",
    badge: "Signature"
  },
  {
    id: "p3",
    name: "Amber Noir",
    category: "Amber Attar",
    price: 1999,
    compareAtPrice: 2299,
    size: "10ml",
    image: "images/attar 3.jpg",
    description: "Velvety black amber wrapped in vanilla and warm spice. An intimate, cosy fragrance for the evening.",
    dateAdded: "2026-07-20"
  },
  {
    id: "p4",
    name: "Rose Ta'if",
    category: "Floral Attar",
    price: 2299,
    compareAtPrice: null,
    size: "12ml",
    image: "images/rose.jpg",
    description: "Pure Taif rose petals distilled into a soft, romantic attar — elegant and timeless.",
    dateAdded: "2026-07-15"
  },
  {
    id: "p5",
    name: "Musk Al Haramain",
    category: "White Musk",
    price: 1599,
    compareAtPrice: null,
    size: "10ml",
    image: "images/mask al haramain.jpg",
    description: "A clean, powdery white musk inspired by the sacred scents of the Haramain — gentle and pure.",
    dateAdded: "2026-07-05"
  },
  {
    id: "p6",
    name: "Sultan's Bouquet",
    category: "Perfume Oil",
    price: 2499,
    compareAtPrice: 2799,
    size: "12ml",
    image: "images/sultan.jpg",
    description: "A bold bouquet of jasmine, oud and sandalwood fit for royalty. Our most complimented scent.",
    dateAdded: "2026-06-22",
    
  }
];

/* ----------------------------------------------------------------------------
   OFFERS / ANNOUNCEMENT BAR
   Add or edit banner messages here — they scroll across the top of the site.
   Set "active: false" to hide an offer without deleting it.
---------------------------------------------------------------------------- */
const OFFERS = [
  { id: "o1", text: "✨ Free shipping across India on orders above ₹2,999", active: true },
  { id: "o2", text: "🌙 New arrivals just added — shop the latest attars", active: true },
  { id: "o3", text: "📦 Order on WhatsApp for a free sample with every purchase", active: true }
];
