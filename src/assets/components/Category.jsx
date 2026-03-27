import React from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import products from "../../data/products.json";
import "../css/global.css";
import { useApp } from "../../context/AppContext";

const PER_PAGE = 12;

export default function Category() {
  const { slug } = useParams();
  const { getStock } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const items = products.filter((p) => p.categorySlug === slug);
  const title = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "";

  let page = parseInt(searchParams.get("page") || "1", 10);
  if (isNaN(page) || page < 1) page = 1;
  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  if (page > totalPages) page = totalPages;
  const pageItems = items.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goTo = (n) => {
    setSearchParams({ page: String(n) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="cat-page">
      <div className="cat-page-top">
        <h1>{title}</h1>
        <p>{items.length} products</p>
      </div>

      {items.length === 0 ? (
        <div style={{ padding: "80px var(--px)", textAlign: "center" }}>
          <p style={{ color: "var(--muted)", fontSize: "18px", marginBottom: "20px" }}>No products in this category.</p>
          <Link to="/" className="btn btn-neutral">Go Home</Link>
        </div>
      ) : (
        <div className="product-grid">
          {pageItems.map((p) => {
            const stock = getStock(p);
            const isOut = stock === 0;
            const isLow = !isOut && stock <= 2;
            return (
              <Link key={p.id} to={`/product/${encodeURIComponent(p.id)}`} className="p-card">
                <div className="p-card-img-wrap">
                  <img src={p.image} alt={p.name} className="p-card-img" />
                  {isOut && <div className="p-card-oos">Out of Stock</div>}
                </div>
                <div className="p-card-body">
                  <p className="p-card-cat">{p.categoryLabel}</p>
                  <p className="p-card-name">{p.name}</p>
                  <p className="p-card-price">£{p.price}</p>
                  {isOut  && <span className="badge badge-error">Out of Stock</span>}
                  {isLow  && <span className="badge badge-warning">Only {stock} left</span>}
                  {!isOut && !isLow && <span className="badge badge-success">In Stock</span>}
                  <p className="p-card-desc">{p.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div className="pagination-row">
        <button className="btn btn-outline btn-sm" onClick={() => goTo(page - 1)} disabled={page === 1} style={{ minWidth: "40px" }}>‹</button>
        <span style={{ padding: "6px 20px", fontSize: "13px", fontWeight: "700", color: "var(--muted)" }}>
          {page} / {totalPages}
        </span>
        <button className="btn btn-outline btn-sm" onClick={() => goTo(page + 1)} disabled={page === totalPages} style={{ minWidth: "40px" }}>›</button>
      </div>
    </div>
  );
}
