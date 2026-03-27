import { useApp } from "../../../context/AppContext";
import products from "../../../data/products.json";
import "../../css/global.css";

export default function AdminDashboard() {
  const { orders, users, inventory } = useApp();

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  const outOfStock = products.filter((p) => {
    const s = inventory[p.id] !== undefined ? inventory[p.id] : Math.min(p.stock || 10, 10);
    return s === 0;
  }).length;

  const lowStock = products.filter((p) => {
    const s = inventory[p.id] !== undefined ? inventory[p.id] : Math.min(p.stock || 10, 10);
    return s > 0 && s <= 2;
  }).length;

  const stats = [
    { label: "Revenue", value: `£${totalRevenue.toFixed(2)}`, sub: "All time", color: "#22c55e", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Orders", value: orders.length, sub: "Total placed", color: "#3b82f6", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { label: "Users", value: users.length, sub: "Registered", color: "#8b5cf6", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    { label: "Products", value: products.length.toLocaleString(), sub: "In catalogue", color: "#f59e0b", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  ];

  return (
    <div>
      <div className="page-hd">
        <h1>Dashboard</h1>
        <p>Welcome back — here's your store at a glance</p>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        {stats.map((s) => (
          <div key={s.label} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e8eaed", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>{s.label}</p>
              <p style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: "900", color: "#0f172a", margin: "0 0 4px" }}>{s.value}</p>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>{s.sub}</p>
            </div>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: s.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={s.color} strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="admin-alerts">
        {outOfStock > 0 && (
          <div className="alert alert-error" style={{ padding: "14px 18px", fontSize: "14px" }}>
            <span>⚠ <strong>{outOfStock}</strong> product(s) are out of stock</span>
          </div>
        )}
        {lowStock > 0 && (
          <div className="alert alert-warning" style={{ padding: "14px 18px", fontSize: "14px" }}>
            <span>⚡ <strong>{lowStock}</strong> product(s) are running low (≤2 units)</span>
          </div>
        )}
        {outOfStock === 0 && lowStock === 0 && (
          <div className="alert alert-success" style={{ padding: "14px 18px", fontSize: "14px" }}>
            <span>✓ All products are well stocked</span>
          </div>
        )}
      </div>

      {/* Recent orders */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e8eaed", overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #f0f0f0" }}>
          <h2 style={{ fontWeight: "800", fontSize: "16px", margin: 0 }}>Recent Orders</h2>
        </div>
        {orders.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>No orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead style={{ background: "#f8fafc" }}>
                <tr>
                  <th style={{ fontWeight: "700", fontSize: "12px", color: "#64748b" }}>Order ID</th>
                  <th style={{ fontWeight: "700", fontSize: "12px", color: "#64748b" }}>Customer</th>
                  <th style={{ fontWeight: "700", fontSize: "12px", color: "#64748b" }}>Items</th>
                  <th style={{ fontWeight: "700", fontSize: "12px", color: "#64748b" }}>Total</th>
                  <th style={{ fontWeight: "700", fontSize: "12px", color: "#64748b" }}>Status</th>
                  <th style={{ fontWeight: "700", fontSize: "12px", color: "#64748b" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 6).map((o) => (
                  <tr key={o.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                    <td style={{ fontWeight: "700", fontSize: "12px", fontFamily: "monospace" }}>{o.id}</td>
                    <td style={{ fontSize: "13px" }}>{o.userName}</td>
                    <td style={{ fontSize: "13px" }}>{o.items.length}</td>
                    <td style={{ fontWeight: "800", fontSize: "13px" }}>£{o.total.toFixed(2)}</td>
                    <td><span className="badge badge-success badge-sm">{o.status}</span></td>
                    <td style={{ fontSize: "12px", color: "#94a3b8" }}>{new Date(o.createdAt).toLocaleDateString("en-GB")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
