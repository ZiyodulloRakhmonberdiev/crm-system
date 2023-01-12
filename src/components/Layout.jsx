import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { Button, Drawer, message } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

import ScrollToTop from "../ScrollToTop";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "../axios/axios";
import Schedule from "../pages/Schedule/Schedule";
import { Calendar3 } from "react-bootstrap-icons";

const Layout = ({ allowedRoles = [], notAllowedRoles = [] }) => {
  const [scheduleIsOpen, setScheduleIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(localStorage.getItem("crm_role"));
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

  if (notAllowedRoles) {
    if (notAllowedRoles.includes(localStorage.getItem("crm_role").toUpperCase())) {
      return <Navigate replace={true} to={"/"} />
    }
  }

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
            className="fixed top-1/2 right-0 bg-white shadow-md h-16 z-10"
            onClick={() => setScheduleIsOpen(!scheduleIsOpen)}
          >
            <Calendar3 className="text-xl text-cyan-500" />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Layout;
