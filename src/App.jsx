import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ScrollToTop from "./assets/components/ScrollToTop";
import Frame from "./assets/components/Frame";
import ProtectedRoute from "./assets/components/ProtectedRoute";
import Home from "./assets/components/Home";
import Category from "./assets/components/Category";
import Faq from "./assets/components/Faq";
import ViewDetail from "./assets/components/ViewDetail";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";
import Cart from "./assets/pages/Cart";
import Checkout from "./assets/pages/Checkout";
import OrderSuccess from "./assets/pages/OrderSuccess";
import Account from "./assets/pages/Account";
import AdminLayout from "./assets/pages/admin/AdminLayout";
import AdminDashboard from "./assets/pages/admin/AdminDashboard";
import AdminInventory from "./assets/pages/admin/AdminInventory";
import AdminOrders from "./assets/pages/admin/AdminOrders";
import AdminUsers from "./assets/pages/admin/AdminUsers";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public routes with Navbar */}
          <Route element={<Frame />}>
            <Route path="/" element={<Home />} />
            <Route path="/faq/" element={<Faq />} />
            <Route path="/product/:id" element={<ViewDetail />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <Account defaultTab="orders" />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Admin routes (no public navbar) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
