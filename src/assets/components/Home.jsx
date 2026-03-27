import React from "react";
import products from "../../data/products.json";
import "../css/global.css";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const CATS = [
  {
    slug: "jeans",
    label: "Jeans",
    img: "/src/assets/images/Home-Cateogory/jeans-model.jpg",
  },
  {
    slug: "blazer",
    label: "Blazer",
    img: "/src/assets/images/Home-Cateogory/blazer.jpg",
  },
  {
    slug: "polo",
    label: "Polo",
    img: "/src/assets/images/Home-Cateogory/polo.jpg",
  },
  {
    slug: "kaos",
    label: "Kaos",
    img: "/src/assets/images/Home-Cateogory/kaos.jpg",
  },
];

const featured = products
  .filter((p) => p.categorySlug === "hoodie")
  .slice(0, 8);

export default function Home() {
  const { getStock } = useApp();

  return (
    <div style={{ background: "var(--bg)" }}>
      {/* ── Hero ── */}
      <div className="hero">
        <img
          src="/src/assets/images/front-banner.png"
          alt="UrbanCart New Arrivals"
          className="hero-img"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <p className="hero-eyebrow">New Season</p>
            <h1 className="hero-title">
              Your Urban
              <br />
              Style Awaits
            </h1>
            <p className="hero-sub">
              Premium streetwear curated for those who move with the city.
            </p>
            <Link to="/category/hoodie" className="hero-cta">
              Shop Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Promo Strip ── */}
      <div className="promo-strip">
        <span>
          <span>🚚</span> Free Delivery Over £50
        </span>
        <span>
          <span>↩</span> 30-Day Returns
        </span>
        <span>
          <span>🔒</span> Secure Checkout
        </span>
        <span>
          <span>👕</span> 1000+ Products
        </span>
      </div>

      {/* ── Categories ── */}
      <section style={{ padding: "clamp(40px, 6vw, 72px) 0" }}>
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <Link to="/category/jeans" className="section-link">
            Browse all →
          </Link>
        </div>
        <div className="cat-tiles">
          {CATS.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="cat-tile"
            >
              <img src={cat.img} alt={cat.label} className="cat-tile-img" />
              <div className="cat-tile-overlay" />
              <div className="cat-tile-label">{cat.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div
        style={{ margin: "0 var(--px)", borderTop: "1px solid var(--border)" }}
      />

      {/* ── Featured Hoodies ── */}
      <section style={{ padding: "clamp(40px, 6vw, 72px) 0" }}>
        <div className="section-header">
          <h2 className="section-title">Featured Hoodies</h2>
          <Link to="/category/hoodie" className="section-link">
            View all →
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((p) => {
            const stock = getStock(p);
            const isOut = stock === 0;
            return (
              <Link key={p.id} to={`/product/${p.id}`} className="p-card">
                <div className="p-card-img-wrap">
                  <img src={p.image} alt={p.name} className="p-card-img" />
                  {isOut && <div className="p-card-oos">Out of Stock</div>}
                </div>
                <div className="p-card-body">
                  <p className="p-card-cat">{p.categoryLabel}</p>
                  <p className="p-card-name">{p.name}</p>
                  <p className="p-card-price">£{p.price}</p>
                  {!isOut && stock <= 2 && (
                    <span className="badge badge-warning">
                      Only {stock} left
                    </span>
                  )}
                  {isOut && (
                    <span className="badge badge-error">Out of Stock</span>
                  )}
                  <p className="p-card-desc">{p.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <div style={{ textAlign: "center", padding: "36px 0 0" }}>
          <Link
            to="/category/hoodie"
            className="btn btn-neutral"
            style={{
              padding: "13px 32px",
              fontSize: "14px",
              letterSpacing: "0.04em",
            }}
          >
            Browse All Hoodies
          </Link>
        </div>
      </section>

      {/* ── Bottom banner ── */}
      <section
        style={{
          background: "var(--ink)",
          color: "#fff",
          margin: "0",
          padding: "clamp(40px, 6vw, 64px) var(--px)",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "clamp(22px, 4vw, 36px)",
              fontWeight: "900",
              margin: "0 0 8px",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to refresh your wardrobe?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              margin: 0,
              fontSize: "15px",
            }}
          >
            Explore over 1,000 urban styles, all in one place.
          </p>
        </div>
        <Link
          to="/category/hoodie"
          style={{
            background: "#fff",
            color: "#111",
            fontWeight: "800",
            fontSize: "14px",
            padding: "14px 28px",
            borderRadius: "var(--radius)",
            whiteSpace: "nowrap",
            transition: "var(--t)",
            letterSpacing: "0.04em",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        >
          Shop Now →
        </Link>
      </section>
    </div>
  );
}
