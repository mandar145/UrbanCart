import { useApp } from "../../context/AppContext";

export default function Notification() {
  const { notification } = useApp();
  if (!notification) return null;

  const colorMap = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        right: "20px",
        zIndex: 9999,
        minWidth: "280px",
        maxWidth: "380px",
        animation: "slideIn 0.3s ease",
      }}
    >
      <div className={`alert ${colorMap[notification.type] || "alert-success"} shadow-lg`}>
        <span>{notification.message}</span>
      </div>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
