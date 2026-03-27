import { useApp } from "../../../context/AppContext";

export default function AdminUsers() {
  const { users, orders } = useApp();

  const getUserOrderCount = (userId) => orders.filter((o) => o.userId === userId).length;
  const getUserTotal = (userId) => orders.filter((o) => o.userId === userId).reduce((s, o) => s + o.total, 0);

  return (
    <div>
      <h1 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "8px" }}>Users</h1>
      <p style={{ color: "#888", marginBottom: "24px" }}>
        {users.length} registered user(s) this session
      </p>

      <div className="card bg-base-100 shadow-sm" style={{ overflow: "hidden" }}>
        <div className="overflow-x-auto">
          <table className="table">
            <thead style={{ background: "#f7fafc" }}>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Member Since</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{
                        width: "36px", height: "36px", borderRadius: "50%", background: "#1a1a1a",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: "700", fontSize: "14px", flexShrink: 0,
                      }}>
                        {u.name[0].toUpperCase()}
                      </div>
                      <span style={{ fontWeight: "600", fontSize: "14px" }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: "14px", color: "#555" }}>{u.email}</td>
                  <td style={{ fontSize: "13px", color: "#888" }}>
                    {new Date(u.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td style={{ fontWeight: "600", fontSize: "14px" }}>{getUserOrderCount(u.id)}</td>
                  <td style={{ fontWeight: "700", fontSize: "14px" }}>£{getUserTotal(u.id).toFixed(2)}</td>
                  <td>
                    <span className={`badge badge-sm ${u.role === "admin" ? "badge-neutral" : "badge-ghost"}`}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="alert alert-info" style={{ marginTop: "20px", padding: "12px 16px", fontSize: "13px" }}>
        <span>Users registered during a session are stored in memory only and will be cleared on page refresh. Pre-defined accounts persist as defaults.</span>
      </div>
    </div>
  );
}
