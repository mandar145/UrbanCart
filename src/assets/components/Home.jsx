import React from "react";
import products from "../../data/products.json";
import "../css/Category.css";
import "../css/Home.css";
import { Link } from "react-router-dom";

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
      <div className="banner-slot-one">
        <img src="/src/assets/images/front-banner.png" alt="banner" />
      </div>
      <div className="cateogory">
        <h1 className="newstuff blink">Shop by Category</h1>
        <div className="Box">
          <Link to="/category/jeans" style={{ textDecoration: "none" }}>
            <div
              className="innerBox home-cat"
              style={{
                backgroundImage:
                  'url("/src/assets/images/Home-Cateogory/jeans-model.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <p>Jeans</p>
            </div>
          </Link>
          <Link to="/category/blazer" style={{ textDecoration: "none" }}>
            <div
              className="innerBox home-cat"
              style={{
                backgroundImage:
                  'url("/src/assets/images/Home-Cateogory/blazer.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <p>Blazer</p>
            </div>
          </Link>
          <Link to="/category/polo" style={{ textDecoration: "none" }}>
            <div
              className="innerBox home-cat"
              style={{
                backgroundImage:
                  'url("/src/assets/images/Home-Cateogory/polo.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <p>Polo</p>
            </div>
          </Link>
          <Link to="/category/kaos" style={{ textDecoration: "none" }}>
            <div
              className="innerBox home-cat"
              style={{
                backgroundImage:
                  'url("/src/assets/images/Home-Cateogory/kaos.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <p>Kaos</p>
            </div>
          </Link>
        </div>
      </div>
      <br></br>
      <h1 className="newstuff blink">Hoodies Under 5£ !!</h1>
      <div className="Box" style={{ marginBottom: 16 }}>
        {cheapHoodies.map((p) => (
          <Link to={`/product/${p.id}`} style={{ textDecoration: "none" }}>
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
          </Link>
        ))}
      </div>
      <br></br>
    </div>
  );
}
