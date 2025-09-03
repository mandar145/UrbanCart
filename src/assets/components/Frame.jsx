import React from "react";
import "../css/Frame.css";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Frame() {
  return (
    <div>
      <Navbar />
      <div className="container-fluid" id="Frame">
        {/* Other components can be added here */}
        <Outlet />
      </div>
    </div>
  );
}
