import { useState } from "react";
import { useApp } from "../../../context/AppContext";

export default function AdminOrders() {
  const { orders } = useApp();
  const [selected, setSelected] = useState(null);

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div>
      <h1 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "8px" }}>Orders</h1>
      <p style={{ color: "#888", marginBottom: "24px" }}>
        {orders.length} order(s) · Total Revenue: <strong>£{totalRevenue.toFixed(2)}</strong>
      </p>

      {orders.length === 0 ? (
        <div className="card bg-base-100 shadow-sm" style={{ padding: "60px", textAlign: "center", color: "#888" }}>
          No orders have been placed yet.
        </div>
      ) : (
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          {/* Orders list */}
          <div style={{ flex: 1 }}>
            <div className="card bg-base-100 shadow-sm" style={{ overflow: "hidden" }}>
              <div className="overflow-x-auto">
                <table className="table table-sm">
                  <thead style={{ background: "#f7fafc" }}>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr
                        key={o.id}
                        style={{ cursor: "pointer", background: selected?.id === o.id ? "#f0f9ff" : "transparent" }}
                        onClick={() => setSelected(o)}
                      >
                        <td style={{ fontWeight: "700", fontSize: "12px" }}>{o.id}</td>
                        <td>
                          <div style={{ fontSize: "13px", fontWeight: "600" }}>{o.userName}</div>
                          <div style={{ fontSize: "11px", color: "#888" }}>{o.userEmail}</div>
                        </td>
                        <td style={{ fontSize: "13px" }}>{o.items.length}</td>
                        <td style={{ fontWeight: "700", fontSize: "13px" }}>£{o.total.toFixed(2)}</td>
                        <td style={{ fontSize: "12px" }}>
                          {o.paymentDetails.method}
                          {o.paymentDetails.last4 && <span style={{ color: "#888" }}> ••{o.paymentDetails.last4}</span>}
                        </td>
                        <td><span className="badge badge-success badge-sm">{o.status}</span></td>
                        <td style={{ fontSize: "12px", color: "#888" }}>{new Date(o.createdAt).toLocaleDateString("en-GB")}</td>
                        <td>
                          <button className="btn btn-ghost btn-xs" onClick={(e) => { e.stopPropagation(); setSelected(o); }}>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Order detail panel */}
          {selected && (
            <div className="card bg-base-100 shadow-sm" style={{ width: "340px", padding: "24px", flexShrink: 0, position: "sticky", top: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <h3 style={{ fontWeight: "800", fontSize: "15px", margin: 0 }}>{selected.id}</h3>
                  <p style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>{new Date(selected.createdAt).toLocaleString("en-GB")}</p>
                </div>
                <button className="btn btn-ghost btn-xs" onClick={() => setSelected(null)}>✕</button>
              </div>

              <div style={{ fontSize: "13px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div>
                  <p style={{ color: "#888", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Customer</p>
                  <p style={{ fontWeight: "600" }}>{selected.userName}</p>
                  <p style={{ color: "#555" }}>{selected.userEmail}</p>
                </div>
                <div>
                  <p style={{ color: "#888", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Items</p>
                  {selected.items.map((item) => (
                    <div key={item.product.id} style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
                      <img src={item.product.image} alt="" style={{ width: "36px", height: "36px", objectFit: "cover", borderRadius: "4px" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.product.name}</p>
                        <p style={{ color: "#888" }}>×{item.quantity} · £{item.subtotal.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="divider" style={{ margin: "4px 0" }}></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#555" }}>Subtotal</span><span>£{selected.subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#555" }}>Shipping</span>
                  <span style={{ color: selected.shipping === 0 ? "#22c55e" : "inherit" }}>
                    {selected.shipping === 0 ? "FREE" : `£${selected.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "15px" }}>
                  <span>Total</span><span>£{selected.total.toFixed(2)}</span>
                </div>
                <div className="divider" style={{ margin: "4px 0" }}></div>
                <div>
                  <p style={{ color: "#888", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Shipping Address</p>
                  <p style={{ marginTop: "4px" }}>{selected.shippingAddress.fullName}</p>
                  <p style={{ color: "#555" }}>{selected.shippingAddress.line1}, {selected.shippingAddress.city} {selected.shippingAddress.postcode}</p>
                </div>
                <div>
                  <p style={{ color: "#888", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Payment</p>
                  <p style={{ marginTop: "4px" }}>{selected.paymentDetails.method}</p>
                  {selected.paymentDetails.last4 && <p style={{ color: "#555" }}>•••• {selected.paymentDetails.last4}</p>}
                </div>
                <div>
                  <p style={{ color: "#888", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Est. Delivery</p>
                  <p style={{ marginTop: "4px" }}>{new Date(selected.estimatedDelivery).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
