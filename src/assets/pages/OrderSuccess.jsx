import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "../css/global.css";

export default function OrderSuccess() {
  const { lastOrder } = useApp();

  if (!lastOrder) {
    return (
      <div style={{ textAlign: "center", padding: "80px 16px" }}>
        <p style={{ color: "#888" }}>No recent order found.</p>
        <Link to="/" className="btn btn-neutral" style={{ marginTop: "16px" }}>Go Home</Link>
      </div>
    );
  }

  const o = lastOrder;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "clamp(24px, 4vw, 48px) clamp(16px, 4vw, 32px)" }}>
      {/* Success header */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 0 12px #dcfce7" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: "900", color: "#1a1a1a", margin: "0 0 8px" }}>Payment Successful!</h1>
        <p style={{ color: "#555", fontSize: "16px", margin: 0 }}>
          Thank you, <strong>{o.userName}</strong>. Your order is confirmed.
        </p>
      </div>

      {/* Order details */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e8eaed", padding: "clamp(20px, 4vw, 28px)", marginBottom: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
          {[
            { label: "Order ID", value: o.id, mono: true },
            { label: "Date", value: new Date(o.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) },
            { label: "Status", value: o.status, green: true },
            { label: "Est. Delivery", value: new Date(o.estimatedDelivery).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) },
          ].map(({ label, value, mono, green }) => (
            <div key={label}>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>{label}</p>
              <p style={{ fontWeight: "800", fontSize: "14px", color: green ? "#22c55e" : "#1a1a1a", fontFamily: mono ? "monospace" : "inherit", margin: 0, wordBreak: "break-all" }}>{value}</p>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "20px", marginBottom: "20px" }}>
          <p style={{ fontWeight: "700", fontSize: "13px", margin: "0 0 12px" }}>Items Ordered</p>
          {o.items.map((item) => (
            <div key={item.product.id} style={{ display: "flex", gap: "12px", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f8f8f8" }}>
              <img src={item.product.image} alt="" style={{ width: "52px", height: "52px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: "700", fontSize: "14px", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.product.name}</p>
                <p style={{ color: "#888", fontSize: "12px", margin: "2px 0 0" }}>Qty {item.quantity} × £{item.product.price}</p>
              </div>
              <p style={{ fontWeight: "800", margin: 0, flexShrink: 0 }}>£{item.subtotal.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#555" }}>Subtotal</span><span>£{o.subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#555" }}>Shipping</span>
            <span style={{ color: o.shipping === 0 ? "#22c55e" : "inherit" }}>{o.shipping === 0 ? "FREE" : `£${o.shipping.toFixed(2)}`}</span>
          </div>
          <div style={{ borderTop: "2px solid #1a1a1a", paddingTop: "10px", display: "flex", justifyContent: "space-between", fontWeight: "900", fontSize: "18px" }}>
            <span>Total Paid</span><span>£{o.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Shipping & payment split */}
      <div className="order-success-split">
        <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e8eaed", padding: "20px" }}>
          <p style={{ fontWeight: "700", fontSize: "13px", margin: "0 0 10px" }}>📍 Shipping To</p>
          <div style={{ fontSize: "13px", color: "#555", lineHeight: "1.8" }}>
            <p style={{ fontWeight: "700", color: "#1a1a1a", margin: 0 }}>{o.shippingAddress.fullName}</p>
            <p style={{ margin: 0 }}>{o.shippingAddress.line1}</p>
            {o.shippingAddress.line2 && <p style={{ margin: 0 }}>{o.shippingAddress.line2}</p>}
            <p style={{ margin: 0 }}>{o.shippingAddress.city}, {o.shippingAddress.postcode}</p>
            <p style={{ margin: 0 }}>{o.shippingAddress.country}</p>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e8eaed", padding: "20px" }}>
          <p style={{ fontWeight: "700", fontSize: "13px", margin: "0 0 10px" }}>💳 Payment</p>
          <div style={{ fontSize: "13px", color: "#555", lineHeight: "1.8" }}>
            <p style={{ fontWeight: "700", color: "#1a1a1a", margin: 0 }}>{o.paymentDetails.method}</p>
            {o.paymentDetails.last4 && <p style={{ margin: 0 }}>Card ending •••• {o.paymentDetails.last4}</p>}
            <p style={{ margin: 0 }}>{o.paymentDetails.cardHolder}</p>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "4px" }}>
        <Link to="/my-orders" className="btn btn-neutral" style={{ fontSize: "14px" }}>View My Orders</Link>
        <Link to="/" className="btn btn-ghost" style={{ fontSize: "14px" }}>Continue Shopping</Link>
      </div>
    </div>
  );
}
