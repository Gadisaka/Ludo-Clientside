import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gray-900 pb-16">
      {" "}
      {/* pb-16 for navbar space */}
      <Outlet />
      <Navbar />
    </div>
  );
};

export default ProtectedLayout;
