// ClientLayout.jsx
import React from "react";
import ClientNavbar from "./ClientNavbar.jsx";
import { Outlet } from "react-router-dom";

export default function ClientLayout() {
  return (
    <div>
      <ClientNavbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
