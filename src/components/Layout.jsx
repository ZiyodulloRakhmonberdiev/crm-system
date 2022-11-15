import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
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
          <Sidebar className="z-50" />
        </div>
        <div className="ml-14 lg:ml-48 mt-14 p-2 lg:p-8 pb-16 mx-auto z-0">
          <ScrollToTop />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
