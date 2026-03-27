import { useState, useMemo } from "react";
import { useApp } from "../../../context/AppContext";
import products from "../../../data/products.json";

const slugs = Array.from(new Set(products.map((p) => p.categorySlug)));
const PER_PAGE = 20;

export default function AdminInventory() {
  const { getStock, updateStock, inventory, showNotification } = useApp();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState({}); // { [productId]: tempValue }

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const stock = getStock(p);
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = catFilter === "all" || p.categorySlug === catFilter;
      const matchStock =
        stockFilter === "all" ||
        (stockFilter === "out" && stock === 0) ||
        (stockFilter === "low" && stock > 0 && stock <= 2) ||
        (stockFilter === "ok" && stock > 2);
      return matchSearch && matchCat && matchStock;
    });
  }, [search, catFilter, stockFilter, inventory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleSearchChange = (e) => { setSearch(e.target.value); setPage(1); };
  const handleCatChange = (e) => { setCatFilter(e.target.value); setPage(1); };
  const handleStockChange = (e) => { setStockFilter(e.target.value); setPage(1); };

  const startEdit = (id, val) => setEditing((p) => ({ ...p, [id]: String(val) }));
  const cancelEdit = (id) => setEditing((p) => { const n = { ...p }; delete n[id]; return n; });

  const saveEdit = (product) => {
    const val = parseInt(editing[product.id]);
    if (isNaN(val) || val < 0 || val > 10) {
      showNotification("Stock must be 0–10", "error");
      return;
    }
    updateStock(product.id, val);
    cancelEdit(product.id);
    showNotification(`Stock updated for ${product.name}`, "success");
  };

  const stockBadge = (stock) => {
    if (stock === 0) return <span className="badge badge-error badge-sm">Out of Stock</span>;
    if (stock <= 2) return <span className="badge badge-warning badge-sm">Low ({stock})</span>;
    return <span className="badge badge-success badge-sm">In Stock ({stock})</span>;
  };

  return (
    <div>
      <h1 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "20px" }}>Inventory Management</h1>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          type="text"
          className="input input-bordered input-sm"
          placeholder="Search products…"
          value={search}
          onChange={handleSearchChange}
          style={{ minWidth: "220px", flex: 1 }}
        />
        <select className="select select-bordered select-sm" value={catFilter} onChange={handleCatChange}>
          <option value="all">All Categories</option>
          {slugs.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="select select-bordered select-sm" value={stockFilter} onChange={handleStockChange}>
          <option value="all">All Stock</option>
          <option value="out">Out of Stock</option>
          <option value="low">Low Stock (≤2)</option>
          <option value="ok">In Stock (&gt;2)</option>
        </select>
      </div>

      <p style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>
        Showing {pageItems.length} of {filtered.length} products
      </p>

      {/* Table */}
      <div className="card bg-base-100 shadow-sm" style={{ overflow: "hidden" }}>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead style={{ background: "#f7fafc" }}>
              <tr>
                <th style={{ width: "60px" }}>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th style={{ width: "160px" }}>Update Stock</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((p) => {
                const stock = getStock(p);
                const isEditing = editing[p.id] !== undefined;
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td>
                      <img src={p.image} alt={p.name} style={{ width: "44px", height: "44px", objectFit: "cover", borderRadius: "6px" }} />
                    </td>
                    <td style={{ fontWeight: "600", fontSize: "13px", maxWidth: "200px" }}>
                      <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
                    </td>
                    <td style={{ fontSize: "13px", textTransform: "capitalize" }}>{p.categorySlug}</td>
                    <td style={{ fontSize: "13px", fontWeight: "700" }}>£{p.price}</td>
                    <td>{stockBadge(stock)}</td>
                    <td>
                      {isEditing ? (
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            className="input input-bordered input-xs"
                            style={{ width: "64px" }}
                            value={editing[p.id]}
                            onChange={(e) => setEditing((prev) => ({ ...prev, [p.id]: e.target.value }))}
                          />
                          <button className="btn btn-success btn-xs" onClick={() => saveEdit(p)}>✓</button>
                          <button className="btn btn-ghost btn-xs" onClick={() => cancelEdit(p.id)}>✕</button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-ghost btn-xs"
                          style={{ fontSize: "12px" }}
                          onClick={() => startEdit(p.id, stock)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <div className="join">
          <button className="join-item btn btn-sm" disabled={safePage === 1} onClick={() => setPage((p) => p - 1)}>«</button>
          <span className="join-item btn btn-sm btn-active" style={{ pointerEvents: "none" }}>Page {safePage} / {totalPages}</span>
          <button className="join-item btn btn-sm" disabled={safePage === totalPages} onClick={() => setPage((p) => p + 1)}>»</button>
        </div>
      </div>
    </div>
  );
}
