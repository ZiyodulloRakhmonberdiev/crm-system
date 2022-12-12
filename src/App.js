import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

import Login from "./pages/login/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/404/NotFound";

import Leads from "./pages/leads/Leads";

import Students from "./pages/student/Students";
import StudentProfile from "./pages/student/StudentProfile";

import Teachers from "./pages/teacher/Teachers";
import TeacherProfile from "./pages/teacher/TeacherProfile";

import Groups from "./pages/group/Groups";
import GroupProfile from "./pages/group/GroupProfile";

import Finance from "./pages/finance/Finance";
import Payments from "./pages/finance/Payments";
import Expenses from "./pages/finance/Expenses";
import TakeOff from "./pages/finance/TakeOff";
import Spend from "./pages/finance/Spend";
import Salary from "./pages/finance/Salary";
import Debtors from "./pages/finance/Debtors";

import Report from "./pages/report/Report";
import Conversion from "./pages/report/Conversion";
import Messages from "./pages/report/Messages";

import Employee from "./pages/employee/Employee";
import EmployeeProfile from "./pages/employee/EmployeeProfile";

import Courses from "./pages/courses/Courses";
import CourseProfile from "./pages/courses/CourseProfile";

import Rooms from "./pages/rooms/Rooms";
import Branches from "./pages/branches/Branches";

export default function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:id" element={<GroupProfile />} />

          <Route path="/students" element={<Students />} />
          <Route path="/students/profile/:id" element={<StudentProfile />} />

          <Route path="/teachers" element={<Teachers />} />
          <Route path="/teachers/profile/:id" element={<TeacherProfile />} />

          <Route path="/finance" element={<Finance />} />
          <Route path="/finance/payments" element={<Payments />} />
          <Route path="/finance/expenses" element={<Expenses />} />
          <Route path="/finance/takeoff" element={<TakeOff />} />
          <Route path="/finance/spend" element={<Spend />} />
          <Route path="/finance/salary" element={<Salary />} />
          <Route path="/finance/debtors" element={<Debtors />} />

          <Route path="/report" element={<Report />} />
          <Route path="/report/conversion" element={<Conversion />} />
          <Route path="/report/messages" element={<Messages />} />

          <Route path="/employees" element={<Employee />} />
          <Route path="/employees/profile/:id" element={<EmployeeProfile />} />

          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseProfile />} />

          <Route path="/rooms" element={<Rooms />} />
          <Route path="/branches" element={<Branches />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
