import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import Logo from "../components/Logo";
import "../css/global.css";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    await new Promise((r) => setTimeout(r, 550));
    const res = login(form.email.trim(), form.password);
    setLoading(false);
    if (res.success) navigate(res.role === "admin" ? "/admin" : "/");
    else setError(res.error);
  };

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", background: "var(--bg)" }}>
      {/* Left panel */}
      <div style={{ flex: 1, background: "var(--ink)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px", gap: "24px" }} className="auth-left-panel">
        <Logo inverted />
        <div style={{ maxWidth: "320px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: "900", margin: "0 0 10px", letterSpacing: "-0.02em" }}>Urban fashion, delivered.</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>
            Sign in to your account to browse your orders, manage your cart, and get exclusive deals.
          </p>
        </div>
        <div style={{ display: "flex", gap: "20px", marginTop: "12px" }}>
          {["1,000+ Styles", "Free Returns", "Secure Pay"].map((t) => (
            <div key={t} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "8px 14px", color: "rgba(255,255,255,0.7)", fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 24px", background: "var(--bg)" }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "900", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Sign in</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "28px" }}>
            Don't have an account? <Link to="/register" style={{ color: "var(--ink)", fontWeight: "800", borderBottom: "1px solid var(--ink)" }}>Register</Link>
          </p>

          {error && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "var(--radius)", padding: "12px 14px", marginBottom: "20px", fontSize: "14px", color: "var(--accent)", fontWeight: "600" }}>
              {error}
            </div>
          )}

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[{ label: "Email address", name: "email", type: "email", placeholder: "you@example.com" }].map((f) => (
              <div key={f.name}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "6px" }}>{f.label}</label>
                <input name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={handle} required
                  className="input input-bordered"
                  style={{ width: "100%", height: "48px", fontSize: "15px" }} />
              </div>
            ))}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "6px" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input name="password" type={showPw ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={handle} required
                  className="input input-bordered"
                  style={{ width: "100%", height: "48px", fontSize: "15px", paddingRight: "56px" }} />
                <button type="button" onClick={() => setShowPw((p) => !p)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: "800", color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-neutral" disabled={loading} style={{ height: "50px", fontSize: "14px", letterSpacing: "0.06em", marginTop: "4px" }}>
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Sign In"}
            </button>
          </form>

          <div style={{ marginTop: "28px", background: "var(--bg-alt)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "16px" }}>
            <p style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", margin: "0 0 8px" }}>Demo accounts</p>
            <p style={{ fontSize: "13px", margin: "0 0 4px", color: "var(--ink-2)" }}><strong>User:</strong> john@example.com / User@123</p>
            <p style={{ fontSize: "13px", margin: 0, color: "var(--ink-2)" }}><strong>Admin:</strong> admin@urbancart.com / Admin@UC#2024</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) { .auth-left-panel { display: none !important; } }
      `}</style>
    </div>
  );
}
