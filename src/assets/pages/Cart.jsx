import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "../css/global.css";

export default function Cart() {
  const { cart, cartTotal, cartCount, removeFromCart, updateCartQuantity, getStock, currentUser } = useApp();
  const navigate = useNavigate();
  const items = Object.values(cart);
  const shipping = cartTotal >= 50 ? 0 : 4.99;
  const total = cartTotal + shipping;

  if (items.length === 0) return (
    <div style={{ minHeight: "65vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", padding: "40px 16px", textAlign: "center", background: "var(--bg)" }}>
      <div style={{ width: "72px", height: "72px", background: "var(--bg-alt)", border: "1px solid var(--border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="var(--muted)" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h2 style={{ fontSize: "22px", fontWeight: "900", color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>Your cart is empty</h2>
      <p style={{ color: "var(--muted)", margin: 0 }}>Add some items to get started.</p>
      <Link to="/" className="btn btn-neutral" style={{ marginTop: "8px", padding: "12px 28px" }}>Start Shopping</Link>
    </div>
  );

  return (
    <div className="cart-wrap" style={{ background: "var(--bg)" }}>
      <div className="page-hd">
        <h1>Cart <span style={{ color: "var(--muted)", fontWeight: "400", fontSize: "55%" }}>({cartCount} {cartCount === 1 ? "item" : "items"})</span></h1>
      </div>

      <div className="cart-grid">
        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {items.map(({ product, quantity }) => {
            const stock = getStock(product);
            return (
              <div key={product.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "16px", display: "flex", gap: "16px", alignItems: "center", transition: "var(--t)" }}>
                <Link to={`/product/${product.id}`} style={{ flexShrink: 0 }}>
                  <img src={product.image} alt={product.name} style={{ width: "88px", height: "88px", objectFit: "cover", borderRadius: "var(--radius)", display: "block" }} />
                </Link>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", margin: "0 0 3px" }}>{product.categoryLabel}</p>
                  <Link to={`/product/${product.id}`} style={{ color: "var(--ink)" }}>
                    <h3 style={{ fontWeight: "800", fontSize: "15px", margin: "0 0 10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</h3>
                  </Link>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", border: "1.5px solid var(--border)", borderRadius: "var(--radius)" }}>
                      <button onClick={() => updateCartQuantity(product.id, quantity - 1)} disabled={quantity <= 1}
                        style={{ width: "34px", height: "34px", background: "none", border: "none", fontSize: "16px", cursor: quantity <= 1 ? "not-allowed" : "pointer", color: quantity <= 1 ? "var(--muted)" : "var(--ink)" }}>−</button>
                      <span style={{ width: "36px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "14px", borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>{quantity}</span>
                      <button onClick={() => updateCartQuantity(product.id, quantity + 1)} disabled={quantity >= stock}
                        style={{ width: "34px", height: "34px", background: "none", border: "none", fontSize: "16px", cursor: quantity >= stock ? "not-allowed" : "pointer", color: quantity >= stock ? "var(--muted)" : "var(--ink)" }}>+</button>
                    </div>
                    <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: "600" }}>Max {stock}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontWeight: "900", fontSize: "17px", margin: "0 0 2px", letterSpacing: "-0.02em" }}>£{(product.price * quantity).toFixed(2)}</p>
                  <p style={{ color: "var(--muted)", fontSize: "11px", margin: "0 0 8px" }}>£{product.price} each</p>
                  <button onClick={() => removeFromCart(product.id)} style={{ background: "none", border: "none", color: "var(--accent)", fontSize: "11px", fontWeight: "700", cursor: "pointer", letterSpacing: "0.04em", textTransform: "uppercase" }}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div style={{ position: "sticky", top: "84px" }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
            <h2 style={{ fontWeight: "900", fontSize: "17px", margin: "0 0 20px", letterSpacing: "-0.01em" }}>Order Summary</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "var(--muted)" }}>Subtotal ({cartCount})</span>
                <span style={{ fontWeight: "700" }}>£{cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "var(--muted)" }}>Shipping</span>
                <span style={{ fontWeight: "700", color: shipping === 0 ? "var(--green)" : "var(--ink)" }}>{shipping === 0 ? "FREE" : `£${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "var(--radius)", padding: "8px 12px", fontSize: "12px", color: "var(--amber)", fontWeight: "600" }}>
                  Add £{(50 - cartTotal).toFixed(2)} more for free shipping
                </div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "900", fontSize: "18px", padding: "16px 0 20px", letterSpacing: "-0.02em" }}>
              <span>Total</span><span>£{total.toFixed(2)}</span>
            </div>
            <button className="btn btn-neutral" style={{ width: "100%", height: "50px", fontSize: "14px", letterSpacing: "0.06em", marginBottom: "10px" }}
              onClick={() => { if (!currentUser) navigate("/login"); else navigate("/checkout"); }}>
              Checkout
            </button>
            <Link to="/" className="btn btn-ghost" style={{ width: "100%", display: "flex", justifyContent: "center", fontSize: "13px" }}>Continue Shopping</Link>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "14px", fontSize: "11px", color: "var(--muted)", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            <span>🔒 Secure</span><span>↩ Easy Returns</span><span>📦 Fast Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}
