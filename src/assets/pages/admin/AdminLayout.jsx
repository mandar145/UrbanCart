import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import "../../css/global.css";

const NAV = [
  { to: "/admin", label: "Dashboard", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { to: "/admin/inventory", label: "Inventory", d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { to: "/admin/orders", label: "Orders", d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { to: "/admin/users", label: "Users", d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
];

export default function AdminLayout() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand" style={{ padding: "22px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "38px", height: "38px", background: "#fff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "13px", color: "#111", flexShrink: 0, letterSpacing: "0.04em" }}>UC</div>
            <div>
              <p style={{ color: "#fff", fontWeight: "800", fontSize: "13px", margin: 0, letterSpacing: "0.02em" }}>Admin Portal</p>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "11px", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "140px" }}>{currentUser?.name}</p>
            </div>
          </div>
        </div>

        <nav className="admin-nav" style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: "2px" }}>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/admin"}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center", gap: "10px",
                padding: "11px 14px", borderRadius: "8px",
                textDecoration: "none", fontSize: "13px", fontWeight: "700",
                color: isActive ? "#fff" : "rgba(255,255,255,0.48)",
                background: isActive ? "rgba(255,255,255,0.11)" : "transparent",
                transition: "all 0.15s", letterSpacing: "0.03em",
              })}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.d} />
              </svg>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-footer" style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <Link to="/" style={{ display: "block", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "10px", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase" }}>← Back to Store</Link>
          <button onClick={handleLogout}
            style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", borderRadius: "6px", padding: "9px", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.04em" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
          >Sign Out</button>
        </div>
      </aside>

      <main className="admin-main"><Outlet /></main>
    </div>
  );
}
