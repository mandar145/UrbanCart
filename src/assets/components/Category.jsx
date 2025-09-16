import React from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import products from "../../data/products.json";
import "../css/Category.css";

const Category = () => {
  // a) Get slug from URL (e.g. /category/blazer → slug = "blazer")
  const { slug } = useParams();
  // b) Find products in that category
  const items = products.filter((p) => p.categorySlug === slug);
  // c) Decide title (category name or slug if empty)
  let title = slug;
  title = title.toUpperCase().charAt(0) + title.slice(1);

  // if (items.length > 0) {
  //   title = items[0].categoryLabel;
  // }

  // 3) Pagination setup
  const [searchParams, setSearchParams] = useSearchParams();
  const PER_PAGE = 12;
  // read page from query string (?page=2). default is 1
  let pagepram = searchParams.get("page");
  let currentPage = parseInt(pagepram || "1", 10);
  if (isNaN(currentPage) || currentPage < 1) {
    currentPage = 1;
  }
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PER_PAGE));

  // clamp currentPage into valid range
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  // figure out the slice for this page
  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;
  const pageItems = items.slice(startIndex, endIndex);

  // 5) Handlers
  function goToPage(n) {
    setSearchParams({ page: String(n) });
    // optional: scroll to top after changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goPrev() {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }

  function goNext() {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }

  return (
    <div className="cat-body">
      <h1 className="title">{title}</h1>
      <br></br>
      {items.length === 0 ? (
        <p>No products in this category.</p>
      ) : (
        <div className="Box">
          {pageItems.map((p) => (
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
                <br />
                <p>Price: £{p.price}</p>
                <br></br>
                <span>
                  <p style={{ fontSize: "12px", color: "#666" }}>
                    <strong style={{ fontSize: "14px" }}>Description: </strong>
                    {p.description}
                  </p>
                </span>
                {/* <p style={{ fontSize: "12px" }}>In stock: {p.stock}</p> */}
              </div>
            </Link>
          ))}
        </div>
      )}
      <br></br>
      {/* 6) Pagination controls */}
      <div className="container-fluid" style={{ textAlign: "center" }}>
        <div className="join" style={{ marginTop: 16, margin: "auto" }}>
          <button
            className="join-item btn"
            onClick={goPrev}
            disabled={currentPage === 1}
          >
            «
          </button>

          <button className="join-item btn btn-active">
            Page {currentPage} / {totalPages}
          </button>

          <button
            className="join-item btn"
            onClick={goNext}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
