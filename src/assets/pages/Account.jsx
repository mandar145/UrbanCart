import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "../css/global.css";

export default function Account({ defaultTab }) {
  const { currentUser, logout, getUserOrders } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState(defaultTab || "profile");
  const orders = getUserOrders(currentUser?.id);

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="account-wrap">
      <div className="page-hd">
        <h1>My Account</h1>
      </div>

      {/* Tabs */}
      <div role="tablist" className="tabs tabs-bordered" style={{ marginBottom: "28px" }}>
        {[
          { id: "profile", label: "Profile" },
          { id: "orders", label: `My Orders (${orders.length})` },
        ].map((t) => (
          <button key={t.id} role="tab" className={`tab ${tab === t.id ? "tab-active" : ""}`}
            style={{ fontWeight: "700", fontSize: "15px" }} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Profile */}
      {tab === "profile" && (
        <div style={{ maxWidth: "480px" }}>
          <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e8eaed", padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "28px" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "22px", fontWeight: "800", flexShrink: 0 }}>
                {currentUser.name[0].toUpperCase()}
              </div>
              <div>
                <h2 style={{ fontWeight: "800", fontSize: "18px", margin: 0 }}>{currentUser.name}</h2>
                <p style={{ color: "#888", fontSize: "14px", margin: "2px 0 0" }}>{currentUser.email}</p>
              </div>
            </div>

            {[
              { label: "Full Name", value: currentUser.name },
              { label: "Email", value: currentUser.email },
              { label: "Member Since", value: new Date(currentUser.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) },
              { label: "Total Orders", value: orders.length },
              { label: "Total Spent", value: `£${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}` },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ color: "#888", fontSize: "14px" }}>{label}</span>
                <span style={{ fontWeight: "700", fontSize: "14px" }}>{value}</span>
              </div>
            ))}

            <button className="btn btn-error btn-outline btn-sm" onClick={handleLogout} style={{ marginTop: "24px" }}>
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Orders */}
      {tab === "orders" && (
        <div>
          {orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 16px", background: "#fff", borderRadius: "14px", border: "1px solid #e8eaed" }}>
              <p style={{ fontSize: "18px", fontWeight: "700", color: "#333", margin: "0 0 8px" }}>No orders yet</p>
              <p style={{ color: "#888", margin: "0 0 24px" }}>When you place an order, it will appear here.</p>
              <Link to="/" className="btn btn-neutral">Start Shopping</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {orders.map((order) => (
                <div key={order.id} style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e8eaed", padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
                    <div>
                      <p style={{ fontWeight: "800", fontSize: "15px", fontFamily: "monospace", margin: 0 }}>{order.id}</p>
                      <p style={{ color: "#888", fontSize: "13px", margin: "3px 0 0" }}>
                        {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span className="badge badge-success">{order.status}</span>
                      <p style={{ fontWeight: "900", fontSize: "18px", margin: "4px 0 0" }}>£{order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                    {order.items.map((item) => (
                      <div key={item.product.id} style={{ display: "flex", gap: "8px", alignItems: "center", background: "#f7fafc", border: "1px solid #e8eaed", padding: "8px 10px", borderRadius: "10px" }}>
                        <img src={item.product.image} alt="" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "6px" }} />
                        <div>
                          <p style={{ fontWeight: "700", fontSize: "13px", margin: 0 }}>{item.product.name}</p>
                          <p style={{ color: "#888", fontSize: "12px", margin: 0 }}>×{item.quantity} · £{item.subtotal.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "20px", fontSize: "13px", color: "#666", flexWrap: "wrap" }}>
                    <span>📦 Est. {new Date(order.estimatedDelivery).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}</span>
                    <span>💳 {order.paymentDetails.method}{order.paymentDetails.last4 ? ` ••••${order.paymentDetails.last4}` : ""}</span>
                    <span>📍 {order.shippingAddress.city}, {order.shippingAddress.postcode}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
