import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import Logo from "../components/Logo";
import "../css/global.css";

export default function Register() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 550));
    const res = register(form.name.trim(), form.email.trim(), form.password);
    setLoading(false);
    if (res.success) navigate("/");
    else setError(res.error);
  };

  const fields = [
    { label: "Full Name", name: "name", type: "text", placeholder: "John Smith" },
    { label: "Email Address", name: "email", type: "email", placeholder: "you@example.com" },
    { label: "Password", name: "password", type: "password", placeholder: "Min. 6 characters" },
    { label: "Confirm Password", name: "confirm", type: "password", placeholder: "Re-enter password" },
  ];

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", background: "var(--bg)" }}>
      {/* Left panel */}
      <div style={{ flex: 1, background: "var(--ink)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px", gap: "20px" }} className="auth-left-panel">
        <Logo inverted />
        <div style={{ maxWidth: "300px", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: "900", margin: "0 0 10px", letterSpacing: "-0.02em" }}>Join UrbanCart</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>Create your account and start exploring over 1,000 premium styles.</p>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 24px", background: "var(--bg)" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "900", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Create account</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "28px" }}>
            Already have one? <Link to="/login" style={{ color: "var(--ink)", fontWeight: "800", borderBottom: "1px solid var(--ink)" }}>Sign in</Link>
          </p>

          {error && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "var(--radius)", padding: "12px 14px", marginBottom: "20px", fontSize: "14px", color: "var(--accent)", fontWeight: "600" }}>
              {error}
            </div>
          )}

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {fields.map((f) => (
              <div key={f.name}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "6px" }}>{f.label}</label>
                <input name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={handle} required
                  className="input input-bordered" style={{ width: "100%", height: "48px", fontSize: "15px" }} />
              </div>
            ))}
            <button type="submit" className="btn btn-neutral" disabled={loading} style={{ height: "50px", fontSize: "14px", letterSpacing: "0.06em", marginTop: "4px" }}>
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Create Account"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) { .auth-left-panel { display: none !important; } }
      `}</style>
    </div>
  );
}
