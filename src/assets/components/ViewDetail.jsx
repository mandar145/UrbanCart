import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import products from "../../data/products.json";
import { useApp } from "../../context/AppContext";
import "../css/global.css";

export default function ViewDetail() {
  const { id } = useParams();
  const { addToCart, getStock, currentUser } = useApp();
  const navigate = useNavigate();
  const product = products.find((p) => String(p.id) === String(id));
  const [qty, setQty] = useState(1);

  if (!product) return (
    <div style={{ padding: "80px var(--px)", textAlign: "center" }}>
      <h2 style={{ fontWeight: "900", marginBottom: "12px" }}>Product not found.</h2>
      <Link to="/" className="btn btn-neutral">Go Home</Link>
    </div>
  );

  const stock = getStock(product);
  const isOut = stock === 0;

  const handleAdd = () => addToCart(product, qty);
  const handleBuy = () => {
    if (!currentUser) { navigate("/login"); return; }
    if (addToCart(product, qty)) navigate("/checkout");
  };

  const TrustBadge = ({ icon, text }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: "600", color: "var(--ink-2)" }}>
      <span style={{ fontSize: "15px" }}>{icon}</span>
      <span>{text}</span>
    </div>
  );

  return (
    <div className="vd-wrap">
      {/* Breadcrumb */}
      <nav style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", fontSize: "12px", color: "var(--muted)", flexWrap: "wrap" }}>
        <Link to="/" style={{ color: "var(--muted)", fontWeight: "600" }}>Home</Link>
        <span>›</span>
        <Link to={`/category/${product.categorySlug}`} style={{ color: "var(--muted)", fontWeight: "600", textTransform: "capitalize" }}>{product.categoryLabel}</Link>
        <span>›</span>
        <span style={{ color: "var(--ink)", fontWeight: "700", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>{product.name}</span>
      </nav>

      <div className="vd-grid">
        {/* Image */}
        <div style={{ position: "relative" }}>
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--bg-alt)" }}>
            <img src={product.image} alt={product.name} style={{ width: "100%", maxHeight: "560px", objectFit: "cover", display: "block" }} />
          </div>
          {isOut && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.55)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ background: "#fff", color: "var(--ink)", fontWeight: "900", fontSize: "13px", letterSpacing: "0.14em", padding: "10px 20px", borderRadius: "4px", textTransform: "uppercase" }}>Out of Stock</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {/* Category + stock */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", background: "var(--bg-alt)", padding: "4px 10px", borderRadius: "4px" }}>
              {product.categoryLabel}
            </span>
            {isOut
              ? <span className="badge badge-error">Out of Stock</span>
              : stock <= 2
                ? <span className="badge badge-warning">Only {stock} left!</span>
                : <span className="badge badge-success">In Stock · {stock} units</span>
            }
          </div>

          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: "900", margin: "0 0 16px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            {product.name}
          </h1>

          <div style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: "900", letterSpacing: "-0.03em", margin: "0 0 20px", color: "var(--ink)" }}>
            £{product.price}
          </div>

          <p style={{ color: "var(--ink-2)", lineHeight: "1.75", marginBottom: "22px", fontSize: "15px" }}>
            {product.description}
          </p>

          {/* Shipping note */}
          <div style={{
            background: product.price >= 50 ? "#ECFDF5" : "var(--bg-alt)",
            border: `1px solid ${product.price >= 50 ? "#A7F3D0" : "var(--border)"}`,
            borderRadius: "var(--radius)",
            padding: "12px 14px", fontSize: "13px", fontWeight: "600",
            color: product.price >= 50 ? "var(--green)" : "var(--ink-2)",
            marginBottom: "24px",
          }}>
            {product.price >= 50
              ? "✓ Free delivery included on this order"
              : `🚚 Add £${(50 - product.price).toFixed(2)} more for free delivery`}
          </div>

          {/* Qty */}
          {!isOut && (
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <span style={{ fontWeight: "700", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" }}>Qty</span>
              <div style={{ display: "flex", border: "1.5px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1}
                  style={{ width: "40px", height: "40px", background: "none", border: "none", fontSize: "18px", fontWeight: "300", cursor: qty <= 1 ? "not-allowed" : "pointer", color: qty <= 1 ? "var(--muted)" : "var(--ink)", transition: "var(--t)" }}>−</button>
                <span style={{ width: "44px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "15px", borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>{qty}</span>
                <button onClick={() => setQty((q) => Math.min(stock, q + 1))} disabled={qty >= stock}
                  style={{ width: "40px", height: "40px", background: "none", border: "none", fontSize: "18px", fontWeight: "300", cursor: qty >= stock ? "not-allowed" : "pointer", color: qty >= stock ? "var(--muted)" : "var(--ink)", transition: "var(--t)" }}>+</button>
              </div>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>{stock} available</span>
            </div>
          )}

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
            <button onClick={handleBuy} disabled={isOut} className="btn btn-neutral" style={{ height: "52px", fontSize: "15px", letterSpacing: "0.04em" }}>
              {isOut ? "Out of Stock" : "Buy Now"}
            </button>
            <button onClick={handleAdd} disabled={isOut} className="btn btn-outline" style={{ height: "52px", fontSize: "15px", letterSpacing: "0.04em" }}>
              Add to Cart
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <TrustBadge icon="🔒" text="Secure checkout" />
            <TrustBadge icon="↩" text="30-day returns" />
            <TrustBadge icon="📦" text="3–5 day delivery" />
            <TrustBadge icon="💳" text="All cards accepted" />
          </div>
        </div>
      </div>
    </div>
  );
}
