# Pages & Co. — Frontend Technical Test

> An independent bookshop website built as part of the EZ Games Frontend Developer Intern Technical Test.

---

## 🌐 Live Preview

Open `index.html` in any modern browser — no installation required.

---

## 📁 Project Structure

```
NgoQuangPhuc_Ezgame_Test/
├── index.html          # Homepage (Hero, Genre, Featured, Bestsellers, New Arrivals)
├── shop.html           # Shop page (filter + sort)
├── book.html           # Book Detail page (dynamic via ?id=)
├── checkout.html       # Checkout / Bag page (cart + order summary)
├── css/
│   ├── style.css       # Global design system — pure CSS (Flexbox + Grid, responsive)
│   └── checkout.css    # Checkout page + Login modal styles
├── js/
│   ├── data.js         # Shared book data + utilities (bag, wishlist, toast, nav)
│   ├── main.js         # Homepage logic (carousel, rendering)
│   ├── shop.js         # Filtering, sorting, URL params
│   ├── book-detail.js  # Book detail rendering
│   ├── checkout.js     # Cart management, order summary, order confirmation
│   └── modal.js        # Login/Register modal (shared across pages)
└── README.md
```

---

## ✅ Requirements Coverage

| Requirement             | Status                                                                |
| ----------------------- | --------------------------------------------------------------------- |
| Semantic HTML structure | ✅ `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| Reusable components     | ✅ Shared layout + reusable JS rendering                               |
| Pure CSS layout         | ✅ Flexbox & Grid, no frameworks                                       |
| Responsive design       | ✅ Mobile-first approach                                               |
| JavaScript interactions | ✅ Carousel, filter, search, bag, wishlist                             |
| Pixel-accurate UI       | ✅ Matches provided design                                             |

---

## 🎨 Design System

* **Background**: `#e8e2d6`
* **Body**: Inter
* **Accent**: `#8b2a2a`, `#c4861a`
* **Dark**: `#1e1b18`

---

## 🛠 Features

### Homepage

* Hero carousel (auto-play, navigation, swipe)
* Browse by genre
* Featured books
* Bestsellers & New arrivals

### Shop Page

* Genre filtering
* Sorting options
* URL parameter support
* Dynamic rendering

### Book Detail Page

* Dynamic content via `?id=`
* Add to bag & wishlist
* Related books suggestions

### Global Features

* Sticky header
* Search overlay
* Shopping bag sidebar
* Toast notifications
* Mobile navigation
* LocalStorage persistence

---

## 🚀 How to Run

1. Download or clone the project
2. Open `index.html` in a browser

> No server, no build step, no dependencies required.

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout       |
| ---------- | ------------ |
| > 1024px   | Desktop      |
| ≤ 1024px   | Tablet       |
| ≤ 768px    | Mobile       |
| ≤ 480px    | Small mobile |

---

## 👨‍💻 Author

**Ngo Quang Phuc**
Frontend Developer Intern — EZ Games Technical Test
Completed: June 2026
