import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "../axios/axios";
import { Button, Drawer } from "antd";
import Schedule from "../pages/Schedule/Schedule";
import { useState } from "react";
import { CalendarOutlined } from "@ant-design/icons"

const Layout = () => {
  const navigate = useNavigate();
  const [scheduleIsOpen, setScheduleIsOpen] = useState(false)
  const location = useLocation()
  console.log(location);
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
        <Drawer open={scheduleIsOpen} width={"80%"} onClose={() => setScheduleIsOpen(false)}>
          <Schedule />
        </Drawer>
        {
          location.pathname !== "/" ? (
            <Button className="fixed top-1/2 right-0 bg-white shadow-md" onClick={() => setScheduleIsOpen(!scheduleIsOpen)}>
              <CalendarOutlined />
            </Button>
          ):null
        }
      </div>
    </div>
  );
};

export default Layout;
