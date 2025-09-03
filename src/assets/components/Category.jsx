import React from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products.json";
import "../css/Category.css";
import { Link } from "react-router-dom";

const Category = () => {
  // a) Get slug from URL (e.g. /category/blazer → slug = "blazer")
  const { slug } = useParams();
  // b) Find products in that category
  const items = products.filter((p) => p.categorySlug === slug);
  // c) Decide title (category name or slug if empty)
  let title = slug;
  if (items.length > 0) {
    title = items[0].categoryLabel;
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>{title}</h1>
      <br></br>
      {items.length === 0 ? (
        <p>No products in this category.</p>
      ) : (
        <div className="Box">
          {items.map((p) => (
            <Link
              to={"/product/" + encodeURIComponent(p.id)}
              className="innerBox"
              key={p.id}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{ width: "100%", height: 180, objectFit: "cover" }}
              />
              <div style={{ padding: 8 }}>
                <h3>{p.name}</h3>
                <p>£{p.price}</p>
                <p style={{ fontSize: "12px", color: "#666" }}>
                  {p.description}
                </p>
                <p style={{ fontSize: "12px" }}>In stock: {p.stock}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
