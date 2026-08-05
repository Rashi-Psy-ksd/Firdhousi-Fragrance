# Product & Brand Photos

Drop your photos in this folder, then reference them in `products.js`.

Recommended:
- **Product photos**: square-ish or 4:5 portrait, at least 800px wide, decent
  lighting on a plain/dark background. Name them simply, e.g.
  `oud-al-malik.jpg`, `rose-taif.jpg`.
- **Logo**: export your Instagram profile picture or brand logo as
  `favicon.png` (square, transparent background if possible) and place it
  here — it will automatically appear as the browser tab icon.

## Using a photo in a product

In `products.js`, set the `image` field to the path:

```js
image: "images/oud-al-malik.jpg",
```

If you leave `image: ""`, the site automatically shows an elegant bottle
placeholder instead — so it's fine to publish a product before you have a
photo ready.
