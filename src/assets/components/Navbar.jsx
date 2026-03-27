import React, { useState } from "react";
import products from "../../data/products.json";
import "../css/global.css";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import Logo from "./Logo";

const slugs = Array.from(new Set(products.map((p) => p.categorySlug)));

export default function Navbar() {
  const { currentUser, logout, cartCount } = useApp();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); setUserOpen(false); };

  return (
    <>
      <nav style={{
        background: "var(--nav-bg)",
        position: "sticky",
        top: 0,
        zIndex: 200,
        height: "64px",
        display: "flex",
        alignItems: "center",
        padding: "0 clamp(16px, 4vw, 48px)",
        gap: "16px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
      }}>

        {/* ── Hamburger (mobile) ── */}
        <button
          onClick={() => setMenuOpen((p) => !p)}
          style={{ background: "none", border: "none", color: "var(--nav-text)", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "6px", flexShrink: 0 }}
          aria-label="Menu"
        >
          <span style={{ width: "22px", height: "2px", background: "var(--nav-text)", borderRadius: "2px", display: "block", transition: "var(--t)", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ width: "22px", height: "2px", background: "var(--nav-text)", borderRadius: "2px", display: "block", transition: "var(--t)", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: "22px", height: "2px", background: "var(--nav-text)", borderRadius: "2px", display: "block", transition: "var(--t)", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>

        {/* ── Logo (center on mobile, left-center on desktop) ── */}
        <Link to="/" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Logo inverted />
        </Link>

        {/* ── Right actions ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>

          {/* Account */}
          {currentUser ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setUserOpen((p) => !p)}
                style={{
                  background: "none", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: "50px",
                  color: "var(--nav-text)", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                  padding: "6px 12px 6px 6px", transition: "var(--t)",
                }}
              >
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#FFFFFF22", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "13px", color: "#fff" }}>
                  {currentUser.name[0].toUpperCase()}
                </div>
                <span style={{ fontSize: "13px", fontWeight: "700", display: "none", maxWidth: "90px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} className="nav-name-hide">
                  {currentUser.name.split(" ")[0]}
                </span>
              </button>

              {userOpen && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 9 }} onClick={() => setUserOpen(false)} />
                  <div style={{
                    position: "absolute", right: 0, top: "calc(100% + 8px)", zIndex: 10,
                    background: "#fff", borderRadius: "10px", boxShadow: "var(--shadow-lg)",
                    border: "1px solid var(--border)", minWidth: "200px", overflow: "hidden",
                  }}>
                    <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
                      <p style={{ fontWeight: "800", fontSize: "14px", margin: 0 }}>{currentUser.name}</p>
                      <p style={{ color: "var(--muted)", fontSize: "12px", margin: "2px 0 0" }}>{currentUser.email}</p>
                    </div>
                    {[
                      { to: "/account", label: "My Account" },
                      { to: "/my-orders", label: "My Orders" },
                      ...(currentUser.role === "admin" ? [{ to: "/admin", label: "Admin Portal" }] : []),
                    ].map((item) => (
                      <Link key={item.to} to={item.to} onClick={() => setUserOpen(false)} style={{ display: "block", padding: "11px 16px", fontSize: "14px", fontWeight: "600", color: "var(--ink)", transition: "background 0.15s" }}
                        onMouseEnter={(e) => e.target.style.background = "var(--bg)"}
                        onMouseLeave={(e) => e.target.style.background = ""}
                      >{item.label}</Link>
                    ))}
                    <div style={{ borderTop: "1px solid var(--border)" }}>
                      <button onClick={handleLogout} style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 16px", fontSize: "14px", fontWeight: "700", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", transition: "background 0.15s" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#fff0f0"}
                        onMouseLeave={(e) => e.currentTarget.style.background = ""}
                      >Sign Out</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "6px" }}>
              <Link to="/login" style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", fontWeight: "700", padding: "7px 12px", borderRadius: "6px", transition: "var(--t)" }}
                onMouseEnter={(e) => e.target.style.color = "#fff"}
                onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.75)"}
              >Sign In</Link>
              <Link to="/register" style={{ background: "#fff", color: "#111", fontSize: "13px", fontWeight: "800", padding: "7px 14px", borderRadius: "6px", transition: "var(--t)" }}
                onMouseEnter={(e) => { e.target.style.background = "var(--bg)"; }}
                onMouseLeave={(e) => { e.target.style.background = "#fff"; }}
              >Register</Link>
            </div>
          )}

          {/* Cart */}
          <Link to="/cart" style={{ position: "relative", padding: "8px", borderRadius: "8px", color: "var(--nav-text)", display: "flex", alignItems: "center", transition: "var(--t)" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            onMouseLeave={(e) => e.currentTarget.style.background = ""}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: "2px", right: "2px",
                background: "#FFFFFF", color: "#0F0F0F",
                fontSize: "9px", fontWeight: "900",
                width: "17px", height: "17px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 0 2px var(--nav-bg)",
              }}>{cartCount > 9 ? "9+" : cartCount}</span>
            )}
          </Link>
        </div>
      </nav>

      {/* ── Slide-down menu ── */}
      <div style={{
        position: "fixed", top: "64px", left: 0, right: 0, zIndex: 190,
        background: "#0F0F0F",
        transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
        transition: "transform 0.28s cubic-bezier(.4,0,.2,1)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        maxHeight: "calc(100vh - 64px)",
        overflowY: "auto",
      }}>
        {menuOpen && <div style={{ position: "fixed", inset: 0, top: "64px", zIndex: -1 }} onClick={() => setMenuOpen(false)} />}

        <div style={{ padding: "8px 0 16px" }}>
          {[{ to: "/", label: "Home" }, { to: "/faq/", label: "FAQ" }].map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "13px clamp(20px, 5vw, 48px)", color: "rgba(255,255,255,0.85)", fontSize: "15px", fontWeight: "700", letterSpacing: "0.03em", transition: "color 0.15s" }}
              onMouseEnter={(e) => e.target.style.color = "#fff"}
              onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.85)"}
            >{item.label}</Link>
          ))}

          {/* Categories accordion */}
          <button
            onClick={() => setCatOpen((p) => !p)}
            style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", padding: "13px clamp(20px, 5vw, 48px)", background: "none", border: "none", color: "rgba(255,255,255,0.85)", fontSize: "15px", fontWeight: "700", cursor: "pointer", letterSpacing: "0.03em" }}
          >
            <span>Categories</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ transform: catOpen ? "rotate(180deg)" : "none", transition: "var(--t)", flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {catOpen && (
            <div style={{ background: "rgba(255,255,255,0.04)", padding: "4px 0 8px" }}>
              {slugs.map((slug) => (
                <Link key={slug} to={`/category/${slug}`} onClick={() => { setMenuOpen(false); setCatOpen(false); }}
                  style={{ display: "block", padding: "10px clamp(32px, 7vw, 64px)", color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "600", textTransform: "capitalize", letterSpacing: "0.04em", transition: "color 0.15s" }}
                  onMouseEnter={(e) => e.target.style.color = "rgba(255,255,255,0.9)"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}
                >{slug}</Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
