import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "../css/global.css";

const STEPS = ["Shipping", "Payment", "Review"];

function Field({ label, name, value, onChange, error, type = "text", placeholder = "", maxLength }) {
  return (
    <div className="form-control" style={{ marginBottom: "16px" }}>
      <label className="label" style={{ paddingBottom: "4px" }}>
        <span className="label-text" style={{ fontWeight: "700", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.04em", color: "#555" }}>{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete="off"
        className={`input input-bordered ${error ? "input-error" : ""}`}
        style={{ width: "100%", fontSize: "15px", height: "48px", borderRadius: "10px" }}
      />
      {error && <span style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px", display: "block" }}>{error}</span>}
    </div>
  );
}

function StepIndicator({ current }) {
  return (
    <ul className="steps" style={{ width: "100%", marginBottom: "32px" }}>
      {STEPS.map((s, i) => (
        <li key={s} className={`step ${i <= current ? "step-neutral" : ""}`} style={{ fontSize: "14px", fontWeight: "600" }}>
          {s}
        </li>
      ))}
    </ul>
  );
}

export default function Checkout() {
  const { cart, cartTotal, currentUser, placeOrder } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const shipping = cartTotal >= 50 ? 0 : 4.99;
  const total = cartTotal + shipping;
  const items = Object.values(cart);

  const [address, setAddress] = useState({
    fullName: currentUser?.name || "",
    line1: "", line2: "", city: "", postcode: "",
    country: "United Kingdom", phone: "",
  });

  const [payment, setPayment] = useState({
    cardHolder: currentUser?.name || "",
    cardNumber: "", expiry: "", cvv: "", method: "card",
  });

  const [errors, setErrors] = useState({});

  const handleAddress = (e) => setAddress((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handlePayment = (e) => {
    let val = e.target.value;
    if (e.target.name === "cvv") val = val.replace(/\D/g, "").slice(0, 4);
    setPayment((p) => ({ ...p, [e.target.name]: val }));
  };

  const validateAddress = () => {
    const e = {};
    if (!address.fullName.trim()) e.fullName = "Required";
    if (!address.line1.trim()) e.line1 = "Required";
    if (!address.city.trim()) e.city = "Required";
    if (!address.postcode.trim()) e.postcode = "Required";
    if (!address.phone.trim()) e.phone = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    if (payment.method === "paypal") return true;
    const e = {};
    const num = payment.cardNumber.replace(/\s/g, "");
    if (!payment.cardHolder.trim()) e.cardHolder = "Required";
    if (num.length < 13 || num.length > 19) e.cardNumber = "Enter a valid card number";
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) e.expiry = "Format: MM/YY";
    if (payment.cvv.length < 3) e.cvv = "Enter CVV";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (step === 0 && !validateAddress()) return;
    if (step === 1 && !validatePayment()) return;
    setStep((p) => p + 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    const paymentDetails =
      payment.method === "paypal"
        ? { method: "PayPal", last4: null, cardHolder: currentUser?.name }
        : {
            method: "Credit/Debit Card",
            last4: payment.cardNumber.replace(/\s/g, "").slice(-4),
            cardHolder: payment.cardHolder,
            expiry: payment.expiry,
          };
    placeOrder(address, paymentDetails);
    setLoading(false);
    navigate("/order-success");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const LabeledBlock = ({ title }) => (
    <p style={{ fontWeight: "700", fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>{title}</p>
  );

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "clamp(20px, 4vw, 40px) clamp(16px, 4vw, 32px)" }}>
      <div className="page-hd">
        <h1>Checkout</h1>
      </div>
      <StepIndicator current={step} />

      <div className="checkout-grid">
        {/* Main form */}
        <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e8eaed", padding: "clamp(20px, 4vw, 32px)" }}>

          {/* Step 0 – Shipping */}
          {step === 0 && (
            <>
              <h2 style={{ fontWeight: "800", fontSize: "18px", marginBottom: "24px" }}>Shipping Address</h2>
              <Field label="Full Name" name="fullName" value={address.fullName} onChange={handleAddress} error={errors.fullName} placeholder="John Smith" />
              <Field label="Address Line 1" name="line1" value={address.line1} onChange={handleAddress} error={errors.line1} placeholder="123 High Street" />
              <Field label="Address Line 2 (optional)" name="line2" value={address.line2} onChange={handleAddress} placeholder="Apartment, suite, floor…" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <Field label="City" name="city" value={address.city} onChange={handleAddress} error={errors.city} placeholder="London" />
                <Field label="Postcode" name="postcode" value={address.postcode} onChange={handleAddress} error={errors.postcode} placeholder="SW1A 1AA" />
              </div>
              <Field label="Country" name="country" value={address.country} onChange={handleAddress} placeholder="United Kingdom" />
              <Field label="Phone Number" name="phone" value={address.phone} onChange={handleAddress} error={errors.phone} type="tel" placeholder="+44 7700 000000" />
            </>
          )}

          {/* Step 1 – Payment */}
          {step === 1 && (
            <>
              <h2 style={{ fontWeight: "800", fontSize: "18px", marginBottom: "8px" }}>Payment</h2>
              <div className="alert alert-info" style={{ marginBottom: "20px", fontSize: "13px" }}>
                Demo checkout — no real payment will be processed.
              </div>

              {/* Method selector */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
                {[
                  { id: "card", label: "💳 Card" },
                  { id: "paypal", label: "🅿 PayPal" },
                ].map((m) => (
                  <label key={m.id} style={{
                    display: "flex", alignItems: "center", gap: "10px", cursor: "pointer",
                    padding: "14px 16px", borderRadius: "10px", justifyContent: "center",
                    border: `2px solid ${payment.method === m.id ? "#1a1a1a" : "#e2e8f0"}`,
                    background: payment.method === m.id ? "#f0f0f0" : "#fff",
                    transition: "all 0.15s",
                  }}>
                    <input type="radio" name="method" value={m.id} checked={payment.method === m.id} onChange={handlePayment} className="radio radio-sm" />
                    <span style={{ fontWeight: "700", fontSize: "14px" }}>{m.label}</span>
                  </label>
                ))}
              </div>

              {payment.method === "card" ? (
                <>
                  <Field label="Name on Card" name="cardHolder" value={payment.cardHolder} onChange={handlePayment} error={errors.cardHolder} placeholder="John Smith" />
                  <Field label="Card Number" name="cardNumber" value={payment.cardNumber} onChange={handlePayment} error={errors.cardNumber} placeholder="4111 1111 1111 1111" maxLength={19} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <Field label="Expiry (MM/YY)" name="expiry" value={payment.expiry} onChange={handlePayment} error={errors.expiry} placeholder="12/27" maxLength={5} />
                    <Field label="CVV" name="cvv" value={payment.cvv} onChange={handlePayment} error={errors.cvv} placeholder="123" />
                  </div>
                  <p style={{ fontSize: "12px", color: "#aaa", marginTop: "-4px" }}>
                    Test card: 4111 1111 1111 1111 · Any future expiry · Any 3-digit CVV
                  </p>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "36px 24px", background: "#f0f8ff", borderRadius: "12px", border: "2px dashed #bfdbfe" }}>
                  <p style={{ fontWeight: "800", fontSize: "22px", color: "#003087", margin: "0 0 8px" }}>PayPal</p>
                  <p style={{ fontSize: "14px", color: "#555", margin: 0 }}>Demo mode — click <strong>Continue</strong> to proceed without payment</p>
                </div>
              )}
            </>
          )}

          {/* Step 2 – Review */}
          {step === 2 && (
            <>
              <h2 style={{ fontWeight: "800", fontSize: "18px", marginBottom: "24px" }}>Review Your Order</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div style={{ background: "#f7fafc", borderRadius: "10px", padding: "16px" }}>
                  <LabeledBlock title="Shipping To" />
                  <div style={{ fontSize: "14px", lineHeight: "1.7", color: "#333" }}>
                    <p style={{ fontWeight: "700", margin: 0 }}>{address.fullName}</p>
                    <p style={{ margin: 0 }}>{address.line1}{address.line2 ? `, ${address.line2}` : ""}</p>
                    <p style={{ margin: 0 }}>{address.city}, {address.postcode}</p>
                    <p style={{ margin: 0 }}>{address.country}</p>
                    <p style={{ margin: 0 }}>{address.phone}</p>
                  </div>
                </div>
                <div style={{ background: "#f7fafc", borderRadius: "10px", padding: "16px" }}>
                  <LabeledBlock title="Payment" />
                  <div style={{ fontSize: "14px", lineHeight: "1.7", color: "#333" }}>
                    <p style={{ fontWeight: "700", margin: 0 }}>{payment.method === "card" ? "Credit/Debit Card" : "PayPal"}</p>
                    {payment.method === "card" && (
                      <p style={{ color: "#888", margin: 0 }}>•••• •••• •••• {payment.cardNumber.replace(/\s/g, "").slice(-4)}</p>
                    )}
                  </div>
                </div>
              </div>

              <LabeledBlock title={`Items (${items.length})`} />
              <div style={{ border: "1px solid #eee", borderRadius: "10px", overflow: "hidden" }}>
                {items.map(({ product, quantity }, i) => (
                  <div key={product.id} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 16px", fontSize: "14px",
                    borderBottom: i < items.length - 1 ? "1px solid #f0f0f0" : "none",
                    gap: "12px",
                  }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", minWidth: 0 }}>
                      <img src={product.image} alt="" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "6px", flexShrink: 0 }} />
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name} <span style={{ color: "#888" }}>× {quantity}</span></span>
                    </div>
                    <span style={{ fontWeight: "800", flexShrink: 0 }}>£{(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Nav buttons */}
          <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
            {step > 0 && (
              <button className="btn btn-ghost" onClick={() => { setStep((p) => p - 1); setErrors({}); }} style={{ flex: 1 }}>
                ← Back
              </button>
            )}
            {step < 2 ? (
              <button className="btn btn-neutral" onClick={nextStep} style={{ flex: 2, height: "48px", fontSize: "15px" }}>
                Continue →
              </button>
            ) : (
              <button className="btn btn-success" onClick={handlePlaceOrder} disabled={loading} style={{ flex: 2, height: "52px", fontSize: "15px" }}>
                {loading
                  ? <><span className="loading loading-spinner loading-sm" /> Processing payment…</>
                  : `Place Order · £${total.toFixed(2)}`}
              </button>
            )}
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="checkout-sidebar-order" style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e8eaed", padding: "22px", position: "sticky", top: "110px" }}>
          <h3 style={{ fontWeight: "800", fontSize: "16px", marginBottom: "16px" }}>Order Summary</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
            {items.map(({ product, quantity }) => (
              <div key={product.id} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <img src={product.image} alt="" style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "13px", fontWeight: "600", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</p>
                  <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>Qty: {quantity}</p>
                </div>
                <span style={{ fontWeight: "700", fontSize: "13px", flexShrink: 0 }}>£{(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #eee", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#555" }}>Subtotal</span><span>£{cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#555" }}>Shipping</span>
              <span style={{ color: shipping === 0 ? "#22c55e" : "inherit", fontWeight: "600" }}>{shipping === 0 ? "FREE" : `£${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ borderTop: "1px solid #eee", paddingTop: "10px", display: "flex", justifyContent: "space-between", fontWeight: "900", fontSize: "16px" }}>
              <span>Total</span><span>£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
