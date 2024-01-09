import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import "../../../public/css/page/page.css";

const Page = () => {
  return (
    <div className="page">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Page;
