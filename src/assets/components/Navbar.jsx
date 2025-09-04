import React from "react";
import products from "../../data/products.json";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

const slugs = Array.from(new Set(products.map((p) => p.categorySlug)));

export default function Navbar() {
  return (
    <>
      <div className="nav-main navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-60 p-2 shadow"
            >
              <li className="menu-list">
                <Link className="menu-list" to="/">
                  Home
                </Link>
              </li>

              {/* Category submenu */}

              <li className="menu-list dropdown-right">
                <details>
                  <summary className="menu-list">Categories</summary>
                  <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm dropdown-menu ">
                    {slugs.map((slug) => (
                      <li key={slug}>
                        <Link className="menu-list2" to={`/category/${slug}`}>
                          {slug}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>

              <li>
                <Link className="menu-list" to="/faq/">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="menu-list" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <img
            src="/src/assets/images/newlogo.png"
            alt="UrbanCart"
            className="logo"
          />
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link className="menu-list">Accounts & List</Link>
            </li>
            <li>
              <Link className="menu-list">
                Cart{" "}
                <img
                  src="/src/assets/images/grocery-store.png"
                  alt="cart"
                  className="cart-icon"
                ></img>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
