import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "../axios/axios";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("crm_token")) {
      axios
        .get("/api/schedule")
        .then((res) => {})
        .catch((err) => navigate("/login", { replace: true }));
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div style={{ maxWidth: 1920 }} className="mx-auto">
      <div>
        <Header />
        <div>
          <Sidebar />
        </div>
        <div className="ml-14 mt-14 p-2 pb-16 mx-auto layout-content">
          <ScrollToTop />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
