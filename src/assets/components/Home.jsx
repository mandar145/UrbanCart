import React from "react";
import products from "../../data/products.json";
import "../css/Category.css";

export default function Home() {
  const hoodies = products.filter((p) => p.categorySlug === "hoodie");
  const cheapHoodies = hoodies.filter((p) => p.price < 3);
  if (cheapHoodies.length === 0) {
    console.log("none");
  } else {
    cheapHoodies.forEach((h) => console.log(h));
  }

  return (
    <div>
      <br></br>
      <h1 className="newstuff">Hot Stuff!! Hoodies UNDER 5 POUNDS</h1>
      <div className="Box" style={{ marginBottom: 16 }}>
        {cheapHoodies.map((p) => (
          <div className="innerBox">
            <img
              alt={p.name}
              src={p.image}
              style={{ width: "100%", height: 180, objectFit: "cover" }}
            />
            <div style={{ padding: 8 }}>
              <h3>{p.name}</h3>
              <br />
              <p>Price: £{p.price}</p>
              <br></br>
              <span>
                <p style={{ fontSize: "12px", color: "#666" }}>
                  <strong style={{ fontSize: "14px" }}>Description: </strong>
                  {p.description}
                </p>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
