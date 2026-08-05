# Firdhousi Fragrances — Website

A luxury, Arabian-styled storefront for Firdhousi Fragrances. It's a fully
static site (plain HTML/CSS/JS — no build step, no server, no database), so
it's free to host on **GitHub Pages** and easy to update by editing a couple
of files directly on GitHub.

Orders don't go through a payment gateway. When a customer checks out, the
site opens **WhatsApp** with the full order (products, sizes, quantities,
total) pre-filled as a message to **+91 6282 330 454**, ready to send. You
then handle payment and delivery address manually in that chat, exactly like
you asked.

---

## 1. Put this on GitHub

1. Create a new repository on GitHub, e.g. `firdhousi-fragrances`.
2. Upload all the files in this folder to the repository
   (`index.html`, `style.css`, `app.js`, `products.js`, `images/`, this
   `README.md`). Easiest way: on the repo page, click **Add file → Upload
   files**, drag everything in, and commit.

## 2. Turn on GitHub Pages

1. In your repository, go to **Settings → Pages**.
2. Under "Build and deployment", set **Source** to `Deploy from a branch`.
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. GitHub gives you a live URL like:
   `https://your-username.github.io/firdhousi-fragrances/`
   It usually goes live within 1–2 minutes. Re-visit Settings → Pages to
   copy the exact link once it's ready.
5. (Optional) If you own a domain like `firdhousifragrances.com`, you can
   connect it from the same Pages settings screen under "Custom domain".

That's it — no coding tools, no hosting bills, no server to maintain.

---

## 3. Add a new perfume ("New Arrivals")

Everything about your products lives in **`products.js`**. To add one:

1. On GitHub, open `products.js` and click the pencil ✏️ (Edit) icon.
2. Copy one of the existing product blocks (the part between `{` and `},`)
   and paste it in, just under `const PRODUCTS = [`.
3. Fill in the fields:

   | Field | What to put |
   |---|---|
   | `id` | Any unique short code, e.g. `"p13"` — just don't reuse one |
   | `name` | Perfume name |
   | `category` | e.g. "Royal Oud", "Mukhallat", "Floral Attar" |
   | `price` | Selling price in ₹, numbers only, e.g. `2499` |
   | `compareAtPrice` | Original price if it's on sale, else `null` |
   | `size` | e.g. `"12ml"` |
   | `image` | `"images/your-photo.jpg"` (or `""` for a placeholder) |
   | `description` | One or two sentences |
   | `dateAdded` | Today's date, `"YYYY-MM-DD"` — controls "New" ordering |
   | `badge` | Optional label like `"Bestseller"` — delete the line to skip it |
   | `soldOut` | Add `soldOut: true` to grey it out and disable "Add to Cart" |

4. Commit the change (top right, "Commit changes"). The **New Arrivals**
   section always shows the 3 most recently dated products automatically —
   you never need to move things around manually. The full **Shop All**
   grid is also always sorted newest-first.

To add a **photo**: open the `images` folder → **Add file → Upload files**
→ drag your photo in → commit. Then reference its filename in `image:`.

To **remove** a perfume, delete its whole `{ ... }` block from `products.js`.

---

## 4. Add / change offers

At the bottom of `products.js` is:

```js
const OFFERS = [
  { id: "o1", text: "✨ Free shipping across India on orders above ₹2,999", active: true },
  ...
];
```

This is the scrolling banner at the top of the site. Add a new line to add
a new offer, or set `active: false` to hide one without deleting it. The
big "Firdhousi Ritual" promo box on the homepage is plain text inside
`index.html` — search for `id="offers"` in that file to edit its wording.

---

## 5. How checkout works (no code changes needed)

- Customer adds perfumes to their bag.
- They tap **Send Order on WhatsApp** in the cart.
- WhatsApp opens (web or app) to your number, **+91 6282 330 454**, with a
  message already typed out listing every item, quantity and the total.
- They just hit send. You take it from there — share payment details and
  confirm their address in that same chat.

If you ever need to change the WhatsApp number, open `app.js` and edit this
line near the top:

```js
const WHATSAPP_NUMBER = "916282330454";
```
(Country code + number, no `+`, no spaces.)

---

## 6. Files in this project

```
index.html      → page structure (header, hero, sections, footer, cart)
style.css        → all visual styling (colors, fonts, layout, animations)
products.js      → YOUR product catalog + offers — edit this most often
app.js           → cart logic, rendering, WhatsApp message building
images/          → put product photos and your logo here
```

## 7. Before you publish — a checklist

- [ ] Replace the sample products in `products.js` with your real ones
- [ ] Upload real product photos to `images/` and link them
- [ ] Upload your logo as `images/favicon.png`
- [ ] Double-check the WhatsApp number in `app.js`
- [ ] Update the Instagram link if your handle ever changes
      (search `firdhousi_fragrance` in `index.html`)
- [ ] Open the live GitHub Pages link on your phone to check it looks right
