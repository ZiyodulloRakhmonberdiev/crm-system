import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

import Login from "./pages/login/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/404/NotFound";

import Students from "./pages/student/Students";
import StudentProfile from "./pages/student/StudentProfile";

import Teachers from "./pages/teacher/Teachers";
import TeacherProfile from "./pages/teacher/TeacherProfile";

import Groups from "./pages/group/Groups";
import GroupProfile from "./pages/group/GroupProfile";

import Payments from "./pages/finance/Payments";
import Expenses from "./pages/finance/Expenses";
import Debtors from "./pages/finance/Debtors";

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
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:id" element={<GroupProfile />} />

          <Route path="/students" element={<Students />} />
          <Route path="/students/profile/:id" element={<StudentProfile />} />

          <Route path="/teachers" element={<Teachers />} />
          <Route path="/teachers/profile/:id" element={<TeacherProfile />} />

          <Route path="/employees" element={<Employee />} />
          <Route path="/employees/profile/:id" element={<EmployeeProfile />} />

          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseProfile />} />

          <Route path="/rooms" element={<Rooms />} />
          <Route path="/branches" element={<Branches />} />
        </Route>

        <Route
          path="/"
          element={
            <Layout
              notallowedroles={[
                "BRANCH DIRECTOR",
                "ADMINISTRATOR",
                "LIMITED ADMINISTRATOR",
                "TEACHER",
                "MARKETER",
                "CASHIER",
              ]}
            />
          }
        >
          <Route path="/finance/payments" element={<Payments />} />
          <Route path="/finance/expenses" element={<Expenses />} />
          <Route path="/finance/debtors" element={<Debtors />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
