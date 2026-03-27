import React from "react";
import "../css/Frame.css";
import "../css/global.css";
import Navbar from "./Navbar";
import Notification from "./Notification";
import { Outlet } from "react-router-dom";

export default function Frame() {
  return (
    <div>
      <Navbar />
      <Notification />
      <div className="container-fluid" id="Frame">
        <Outlet />
      </div>
    </div>
  );
}
