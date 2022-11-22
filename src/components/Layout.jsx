import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Button, Drawer, message } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

import ScrollToTop from "../ScrollToTop";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "../axios/axios";
import Schedule from "../pages/Schedule/Schedule";

const Layout = () => {
  const [scheduleIsOpen, setScheduleIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("crm_token")) {
      axios
        .get("/api/schedule")
        .then((res) => {})
        .catch((err) => {
          navigate("/login", { replace: true });
          if (err?.message === "Network Error") {
            message.error("У вас нет подключения к интернету!");
          }
        });
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
        <Drawer
          open={scheduleIsOpen}
          width={"80%"}
          onClose={() => setScheduleIsOpen(false)}
        >
          <Schedule />
        </Drawer>
        {location.pathname !== "/" ? (
          <Button
            className="fixed top-1/2 right-0 bg-white shadow-md"
            onClick={() => setScheduleIsOpen(!scheduleIsOpen)}
          >
            <CalendarOutlined />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Layout;
