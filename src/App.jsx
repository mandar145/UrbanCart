import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./assets/components/ScrollToTop";
import Frame from "./assets/components/Frame";
import Home from "./assets/components/Home";
import Category from "./assets/components/Category";
import Faq from "./assets/components/Faq";
import ViewDetail from "./assets/components/ViewDetail";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Layout route: Frame always renders (Navbar, etc.) */}
        <Route element={<Frame />}>
          <Route path="/" element={<Home />} />
          <Route path="/faq/" element={<Faq />} />
          <Route path="/product/:id" element={<ViewDetail />} />
          <Route path="/category/:slug" element={<Category />} />
          {/* add more routes here later (cart, account, etc.) */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
