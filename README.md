# UrbanCart — Urban Fashion E-Commerce

A fully-featured, responsive e-commerce web application built with React. UrbanCart is a prototype storefront for urban streetwear, complete with product browsing, a shopping cart, user authentication, a dummy checkout flow, and a full admin portal for inventory and order management.

---

## Live Preview

> Clone and run locally — see [Getting Started](#getting-started) below.

---

## Features

### Storefront
- **Product catalogue** — 1,000+ products across multiple categories (Hoodies, Jeans, Blazers, Polo, Kaos, etc.)
- **Category pages** — Filtered browsing with pagination (20 per page)
- **Product detail page** — Image, description, size/stock info, add-to-cart with stock enforcement
- **Smart cart** — Quantity controls, real-time stock checking, free-shipping threshold indicator
- **Responsive design** — Fully mobile-first, works on all screen sizes

### Authentication
- **User registration** — Session-based (persists until page refresh, no backend required)
- **User login** — Email + password validation
- **Admin login** — Dedicated admin account with automatic redirect to admin portal
- **Protected routes** — Cart/checkout/account require login; admin portal requires admin role

### Checkout
- **3-step flow** — Shipping → Payment → Review & Confirm
- **Payment methods** — Debit/Credit Card or PayPal (dummy, no real processing)
- **Order placement** — Deducts stock, saves order to session, redirects to success page
- **Free shipping** — Automatically applied on orders over £50

### User Account
- **Profile tab** — View name, email, account info
- **My Orders tab** — Full order history with items, totals, payment method, and delivery estimate

### Admin Portal
| Section | Capability |
|---|---|
| **Dashboard** | Stats overview (users, orders, revenue, stock alerts), recent orders |
| **Inventory** | Search/filter all products, edit stock levels (0–10) inline |
| **Orders** | View all placed orders with full detail panel |
| **Users** | View all registered users, order counts, total spend |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Routing | React Router DOM v7 |
| State | React Context API |
| Styling | CSS Custom Properties + DaisyUI v5 (CDN) + Tailwind CSS v4 (CDN) |
| Build Tool | Vite |
| Data | Static JSON (products) + in-memory session state |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mandar145/UrbanCart.git
cd UrbanCart

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Demo Credentials

### Admin Account
| Field | Value |
|---|---|
| Email | `admin@urbancart.com` |
| Password | `Admin@UC#2024` |

### Pre-defined User Accounts
| Email | Password |
|---|---|
| `john@example.com` | `User@123` |
| `sarah@example.com` | `User@456` |
| `mike@example.com` | `User@789` |

> You can also register a new account — it will persist for the current browser session.

---

## Project Structure

```
UrbanCart/
├── public/
├── src/
│   ├── assets/
│   │   ├── components/
│   │   │   ├── Category.jsx       # Category listing page with pagination
│   │   │   ├── Frame.jsx          # Layout wrapper (Navbar + Notification)
│   │   │   ├── Home.jsx           # Landing page (hero, categories, featured)
│   │   │   ├── Logo.jsx           # SVG logo component
│   │   │   ├── Navbar.jsx         # Responsive navbar with cart & auth
│   │   │   ├── Notification.jsx   # Toast notification system
│   │   │   ├── ProtectedRoute.jsx # Route guard (user & admin)
│   │   │   └── ViewDetail.jsx     # Product detail page
│   │   ├── css/
│   │   │   └── global.css         # Full design system & component styles
│   │   ├── images/
│   │   │   ├── Home-Category/     # Category tile images
│   │   │   └── front-banner.png   # Hero banner
│   │   └── pages/
│   │       ├── Account.jsx        # User profile & order history
│   │       ├── Cart.jsx           # Shopping cart
│   │       ├── Checkout.jsx       # 3-step checkout flow
│   │       ├── Login.jsx          # Login page
│   │       ├── OrderSuccess.jsx   # Post-purchase confirmation
│   │       ├── Register.jsx       # Registration page
│   │       └── admin/
│   │           ├── AdminDashboard.jsx
│   │           ├── AdminInventory.jsx
│   │           ├── AdminLayout.jsx
│   │           ├── AdminOrders.jsx
│   │           └── AdminUsers.jsx
│   ├── context/
│   │   └── AppContext.jsx         # Global state (auth, cart, orders, inventory)
│   ├── data/
│   │   └── products.json          # Product catalogue (1000+ items)
│   ├── App.jsx                    # Root component & route definitions
│   └── main.jsx                   # React entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## Design System

The UI is built on a custom CSS design system using CSS custom properties:

- **Color palette** — Warm cream background (`#F4F2EE`), pure black navbar, brand red accent (`#C8392B`)
- **Typography** — System font stack with weight-based hierarchy (400 / 700 / 900)
- **Spacing** — Fluid values using `clamp()` for responsive padding and font sizes
- **Radius tokens** — `--radius: 6px`, `--radius-lg: 12px`
- **Responsive grids** — CSS Grid with `auto-fill` + `minmax()` for product listings; named grid classes for cart, checkout, and product detail layouts

---

## Key Decisions

- **No backend / no localStorage** — All state is session-only (React in-memory). Refreshing the page resets cart, orders, and registered users.
- **Stock enforcement** — Max stock per product is capped at 10. Out-of-stock items are clearly labelled and cannot be added to cart.
- **Admin is hardcoded** — The single admin account is defined in `AppContext.jsx` and cannot be registered or deleted.
- **Dummy payments** — Card and PayPal flows are UI-only. No real payment gateway is integrated.

---

## Author

**mandar145** — [github.com/mandar145](https://github.com/mandar145)
