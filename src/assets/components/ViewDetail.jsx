// src/assets/components/ViewDetail.jsx
import { useParams, Link } from "react-router-dom";
import products from "../../data/products.json";

export default function ViewDetail() {
  const { id } = useParams(); // string from URL

  // Make both sides strings, so "123" === "123"
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div style={{ padding: 16 }}>
        <h4>Product not found.</h4>
      </div>
    );
  }

  // 4) Render product details
  return (
    <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
      <Link
        to={-1}
        style={{
          display: "inline-block",
          marginBottom: 12,
          textDecoration: "underline",
        }}
      >
        ← Back
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              maxHeight: 480,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </div>

        <div>
          <h1 style={{ margin: "0 0 8px" }}>{product.name}</h1>
          <div style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
            Category: {product.categoryLabel}
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
            £{product.price}
          </div>
          <p style={{ marginBottom: 12 }}>{product.description}</p>
          <div style={{ fontSize: 14, marginBottom: 16 }}>
            In stock: {product.stock}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              type="button"
              style={{
                padding: "10px 16px",
                borderRadius: 6,
                border: "1px solid #111",
                background: "#111",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={function () {
                alert("Buy now clicked (you can add real checkout later)");
              }}
            >
              Buy Now
            </button>

            <button
              type="button"
              style={{
                padding: "10px 16px",
                borderRadius: 6,
                border: "1px solid #111",
                background: "#fff",
                color: "#111",
                cursor: "pointer",
              }}
              onClick={function () {
                alert("Added to cart (wire to real cart later)");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
