import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { TeamOutlined } from "@ant-design/icons";
import axios from "../axios/axios";
import {
  Arrow90degLeft,
  BoxArrowRight,
  Download,
  ExclamationCircle,
  Hourglass,
  Mortarboard,
} from "react-bootstrap-icons";
import student from "../assets/img/student.png";
import { MyButton } from "../UI/Button.style";
import {
  fetchedError,
  fetchedStudents,
  fetchingStudents,
} from "../redux/studentsSlice";
import { fetchedGroups, fetchingGroups } from "../redux/groupsSlice";

export default function HeaderLayout() {
  // states
  const { students, refreshStudents } = useSelector((state) => state.students);
  const { groups, refreshGroups } = useSelector((state) => state.groups);
  // hooks
  const dispatch = useDispatch();

  // fetching students
  useEffect(() => {
    dispatch(fetchingStudents());
    axios
      .get("/api/students")
      .then((res) => {
        dispatch(fetchedStudents(res?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [refreshStudents]);

  // fetching groups
  useEffect(() => {
    dispatch(fetchingGroups());
    axios
      .get("/api/groups")
      .then((res) => {
        dispatch(fetchedGroups(res?.data?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [refreshGroups]);
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Link
          to="/students"
          className="bg-white flex flex-col md:flex-row justify-between col-span-6 md:col-span-2 lg:col-span-4 p-4 rounded-lg gap-4 text-center md:text-left"
        >
          <div className="flex items-center md:items-start md:justify-around flex-col">
            <p className="text-lg lg:text-4xl text-violet-400">
              Список студентов
            </p>
            <p className="text-slate-400 mb-2">
              В этом месяце в учебном центре зарегистрировались{" "}
              <span className="text-violet-400">{students?.data?.length}</span>{" "}
              студентов. На данный момент нам доверяют более{" "}
              <span className="text-violet-400">{students?.data?.length}</span>{" "}
              студентов
            </p>
            <MyButton color="primary">Смотреть все</MyButton>
          </div>
          <div className="w-48 mx-auto">
            <img src={student} alt="" className="w-full" />
          </div>
        </Link>
        <Link
          to="/leads"
          className="bg-white flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start justify-between"
        >
          <div className="text-2xl text-violet-400 bg-violet-50 p-2 rounded-md">
            <Download />
          </div>
          <p className="text-slate-400 my-4">Заявки</p>
          <p className="text-slate-500 text-2xl">123</p>
        </Link>
        <Link
          to="/groups"
          className="bg-white flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start"
        >
          <div className="text-2xl text-cyan-400 bg-cyan-50 p-2 rounded-md">
            <TeamOutlined />
          </div>
          <p className="text-slate-400 my-4">Группы</p>
          <p className="text-slate-500 text-2xl">{groups?.length}</p>
        </Link>
        <Link
          to="/students"
          className="bg-white flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start justify-between"
        >
          <div className="text-2xl text-cyan-400 bg-cyan-50 p-2 rounded-md">
            <Mortarboard />
          </div>
          <p className="text-cyan-400 my-4">Студенты</p>
          <p className="text-cyan-400 text-2xl">{students?.data?.length}</p>
        </Link>
        <Link
          to="/"
          className="bg-white flex flex-col col-span-6 md:col-span-1 p-4 w-full rounded-lg items-start justify-between"
        >
          <div className="text-2xl text-violet-400 bg-violet-50 p-2 rounded-md">
            <BoxArrowRight />
            <div />
          </div>
          <p className="text-violet-400 my-4">Ушли из активной группы</p>
          <p className="text-violet-400 text-2xl">3 </p>
        </Link>
        <Link
          to="/finance/debtors"
          className="bg-white flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start justify-between"
        >
          <div className="text-2xl text-red-400 bg-red-50 p-2 rounded-md">
            <ExclamationCircle />
          </div>
          <p className="text-red-400 my-4">Должники</p>
          <p className="text-red-400 text-2xl">3 </p>
        </Link>
        <Link
          to="/"
          className="bg-white flex flex-col col-span-6 md:col-span-1 p-4 rounded-lg items-start justify-between"
        >
          <div className="text-2xl text-green-400 bg-green-50 p-2 rounded-md">
            <Hourglass />
          </div>
          <p className="text-green-400 my-4">На пробном уроке</p>
          <p className="text-green-500 text-2xl">5</p>
        </Link>
        <Link
          to="/"
          className="bg-white flex flex-col col-span-6 md:col-span-1 lg:col-span-2 p-4 rounded-lg items-start justify-between"
        >
          <div className="text-2xl text-slate-400 bg-slate-50 p-2 rounded-md">
            <Arrow90degLeft />
          </div>
          <p className="text-slate-400 my-4">Ушли после пробного периода</p>
          <p className="text-slate-500 text-2xl">14</p>
        </Link>
      </div>
    </>
  );
}
