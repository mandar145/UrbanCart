import { createContext, useContext, useState } from "react";

const ADMIN = {
  id: "admin1",
  name: "UrbanCart Admin",
  email: "admin@urbancart.com",
  password: "Admin@UC#2024",
  role: "admin",
  createdAt: "2024-01-01",
};

const PREDEFINED_USERS = [
  { id: "u1", name: "John Smith", email: "john@example.com", password: "User@123", role: "user", createdAt: "2024-01-15" },
  { id: "u2", name: "Sarah Johnson", email: "sarah@example.com", password: "User@456", role: "user", createdAt: "2024-02-20" },
  { id: "u3", name: "Mike Brown", email: "mike@example.com", password: "User@789", role: "user", createdAt: "2024-03-10" },
];

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [users, setUsers] = useState([...PREDEFINED_USERS]);
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState({});
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState({});
  const [notification, setNotification] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // ── Auth ──────────────────────────────────────────────────
  const login = (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      setCurrentUser(ADMIN);
      return { success: true, role: "admin" };
    }
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true, role: "user" };
    }
    return { success: false, error: "Invalid email or password." };
  };

  const register = (name, email, password) => {
    if (email === ADMIN.email || users.find((u) => u.email === email)) {
      return { success: false, error: "Email is already registered." };
    }
    const newUser = {
      id: `u${Date.now()}`,
      name,
      email,
      password,
      role: "user",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setCart({});
  };

  // ── Inventory ─────────────────────────────────────────────
  const getStock = (product) => {
    if (inventory[product.id] !== undefined) return inventory[product.id];
    return Math.min(product.stock || 10, 10);
  };

  const updateStock = (productId, newStock) => {
    setInventory((prev) => ({
      ...prev,
      [productId]: Math.max(0, Math.min(parseInt(newStock) || 0, 10)),
    }));
  };

  // ── Cart ──────────────────────────────────────────────────
  const addToCart = (product, quantity = 1) => {
    const stock = getStock(product);
    const currentQty = cart[product.id]?.quantity || 0;
    if (stock === 0) {
      showNotification("This product is out of stock!", "error");
      return false;
    }
    if (currentQty + quantity > stock) {
      showNotification(`Only ${stock - currentQty} more item(s) available!`, "error");
      return false;
    }
    setCart((prev) => ({
      ...prev,
      [product.id]: { product, quantity: currentQty + quantity },
    }));
    showNotification(`${product.name} added to cart!`, "success");
    return true;
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) { removeFromCart(productId); return; }
    const item = cart[productId];
    if (!item) return;
    const stock = getStock(item.product);
    const clamped = Math.min(quantity, stock);
    setCart((prev) => ({ ...prev, [productId]: { ...prev[productId], quantity: clamped } }));
  };

  const clearCart = () => setCart({});

  const cartCount = Object.values(cart).reduce((s, i) => s + i.quantity, 0);
  const cartTotal = Object.values(cart).reduce((s, i) => s + i.product.price * i.quantity, 0);

  // ── Orders ────────────────────────────────────────────────
  const placeOrder = (shippingAddress, paymentDetails) => {
    const items = Object.values(cart).map((i) => ({
      product: i.product,
      quantity: i.quantity,
      subtotal: i.product.price * i.quantity,
    }));
    // deduct stock
    items.forEach((item) => {
      updateStock(item.product.id, getStock(item.product) - item.quantity);
    });
    const order = {
      id: `ORD-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      items,
      subtotal: cartTotal,
      shipping: cartTotal >= 50 ? 0 : 4.99,
      total: cartTotal >= 50 ? cartTotal : cartTotal + 4.99,
      status: "Confirmed",
      paymentDetails,
      shippingAddress,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 86400000).toISOString().split("T")[0],
    };
    setOrders((prev) => [order, ...prev]);
    setLastOrder(order);
    clearCart();
    return order;
  };

  const getUserOrders = (userId) => orders.filter((o) => o.userId === userId);

  return (
    <AppContext.Provider
      value={{
        users, setUsers,
        currentUser,
        cart, cartCount, cartTotal,
        orders,
        inventory,
        notification,
        lastOrder,
        login, register, logout,
        addToCart, removeFromCart, updateCartQuantity, clearCart,
        getStock, updateStock,
        placeOrder, getUserOrders,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
