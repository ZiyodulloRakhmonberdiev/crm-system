import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  DashLg,
  Dot,
  Flag,
  FlagFill,
  PencilSquare,
  Trash,
} from "react-bootstrap-icons";
import {
  Avatar,
  Drawer,
  message,
  Spin,
  Tabs,
  Tooltip,
  Card,
  Popover,
} from "antd";

import { IconButton } from "../../UI/IconButton.style";
import {
  changeUpdateGroupData,
  refreshGroupsData,
} from "../../redux/groupsSlice";
import AddGroupForm from "./AddGroupForm";
import GroupAttendance from "./GroupAttendances";
import axios from "../../axios/axios";
import { MyMessage } from "../../UI/Message.style";
import { MyButton } from "../../UI/Button.style";
import {
  fetchedTeachers,
  fetchingTeachers,
  setTeachersData,
} from "../../redux/teachersSlice";
import {
  fetchedCourses,
  fetchedError,
  fetchingCourses,
  setCoursesData,
} from "../../redux/coursesSlice";
import {
  fetchedAtt,
  fetchingAtt,
  fetchingErrorAtt,
} from "../../redux/attendancesSlice";
import { setUserData } from "../../redux/studentsSlice";
import InProcess from "../../UI/InProcess.style";

export default function GroupProfile() {
  // states
  const [editingGroup, setEditingGroup] = useState(null);
  const [visible, setVisible] = useState(false);
  const [activeGroup, setActiveGroup] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [refreshing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { groupData } = useSelector((state) => state.groups);
  const { teachers } = useSelector((state) => state.teachers);
  const { courses, coursesData } = useSelector((state) => state.courses);
  const { attendances } = useSelector((state) => state.attendances);
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // functions
  const onEditGroup = (group) => {
    setModalType("update");
    setVisible(true);
    setEditingGroup({ ...group });
  };

  const changeUpdateGroupDataFunc = (data) => {
    dispatch(changeUpdateGroupData(data));
  };
  const handleActiveGroup = () => {
    setUploading(true);
    axios
      .post(`/api/groups/active/${params?.id}`)
      .then((res) => {
        message.success("Группа активирована!");
        dispatch(refreshGroupsData());
        setActiveGroup(true);
      })
      .catch((err) => {
        message.error("Произошла ошибка! Попробуйте еще раз!");
      })
      .finally(() => setUploading(false));
  };

  // fetching courses
  useEffect(() => {
    dispatch(fetchingCourses());
    axios
      .get(`/api/courses`)
      .then((res) => {
        dispatch(fetchedCourses(res?.data?.data));
        dispatch(
          setCoursesData(courses?.find((x) => x?.id === groupData?.course?.id))
        );
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
    if (!groupData?.id) {
      navigate("/groups", { replace: true });
    }
  }, []);

  // fetching teachers
  useEffect(() => {
    dispatch(fetchingTeachers());
    axios.get(`/api/teachers`).then((res) => {
      dispatch(fetchedTeachers(res?.data?.data));
    });
  }, []);

  // fetching students
  useEffect(() => {
    dispatch(fetchingAtt());
    axios
      .get(
        `/api/groups/${params?.id}/attendance?from=${groupData?.group_start_date}&to=${groupData?.group_end_date}`
      )
      .then((res) => {
        dispatch(fetchedAtt(res?.data));
      })
      .catch(() => {
        dispatch(fetchingErrorAtt());
      });
  }, [refreshing]);

  //  active students in group
  function activeStudent(studentId) {
    axios
      .post(`/api/groups/active/${params?.id}/${studentId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Drawer
        open={visible}
        title={
          modalType === "add" ? "Добавить новую группу" : "Изменить группу"
        }
        onClose={() => {
          setVisible(!visible);
        }}
        maskClosable={true}
      >
        <AddGroupForm
          changeUpdateGroupDataFunc={changeUpdateGroupDataFunc}
          modalType={modalType}
          editingGroup={editingGroup}
          visible={visible}
          setVisible={() => setVisible(false)}
        />
      </Drawer>
      {groupData?.active
        ? ""
        : !activeGroup && (
            <MyMessage color="warning">
              <span>
                Эта группа еще не активна. Нажмите кнопку, чтобы активировать её
              </span>
              <Tooltip title="Активировать" placement="left">
                <Spin spinning={uploading}>
                  <MyButton color="warning" onClick={() => handleActiveGroup()}>
                    Активировать группу
                  </MyButton>
                </Spin>
              </Tooltip>
            </MyMessage>
          )}
      <div className="text-xl mb-8 bg-white p-4 rounded-lg flex flex-wrap gap-4 items-center">
        {groupData?.name} <Dot /> {groupData?.course?.name} <Dot />{" "}
        {groupData?.tachers?.map((teacher) => (
          <span key={teacher?.id}>{teacher?.name}</span>
        ))}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col drop-shadow-md hover:drop-shadow-lg transition col-span-1">
          <div className="absolute top-4 right-4">
            <div className="flex flex-col gap-2">
              <IconButton
                color="primaryOutlined"
                onClick={() => {
                  onEditGroup(groupData);
                }}
              >
                <PencilSquare />
              </IconButton>
              <IconButton color="dangerOutlined">
                <Trash />
              </IconButton>
            </div>
          </div>
          <div className="bg-white p-2 lg:p-4 lg:pt-6">
            <span className="text-white bg-cyan-400 px-4 py-2 rounded-md text-lg">
              {groupData?.name}
            </span>
            <div className="grid mb-2 md:mb-4 mt-4">
              <label className="text-slate-600">Курсы:</label>
              <Link
                to={`/courses/${groupData?.course?.id}`}
                className="text-cyan-500"
                onClick={() =>
                  dispatch(
                    setCoursesData(
                      courses?.find((x) => x?.id === groupData?.course?.id)
                    )
                  )
                }
              >
                {groupData?.course?.name}
              </Link>
            </div>
            <div className="grid mb-2 md:mb-4">
              <label className="text-slate-600">Учителя:</label>
              <p>
                {groupData?.tachers?.map((teacher) => (
                  <Link
                    key={teacher?.id}
                    to={`/teachers/profile/${teacher?.id}`}
                    className="text-cyan-500"
                    onClick={() =>
                      dispatch(
                        setTeachersData(
                          teachers?.data?.find((x) => x?.id === teacher?.id)
                        )
                      )
                    }
                  >
                    {teacher?.name}
                  </Link>
                ))}
              </p>
            </div>
            <div className="grid mb-2 md:mb-4">
              <label className="text-slate-600">Цена:</label>
              <p> {Number(coursesData?.price).toLocaleString()} сум</p>
            </div>
            <div className="grid mb-2 md:mb-4">
              <label className="text-slate-600">Время:</label>
              <div className="flex gap-2">
                <p>{groupData?.time?.time}</p>
                <p>({groupData?.course?.lesson_duration} минут)</p>
              </div>
            </div>
            <div className="grid mb-2 md:mb-4">
              <label className="text-slate-600">Кабинеты:</label>
              <p>{groupData?.room?.name}</p>
            </div>
            <div className="grid mb-2 md:mb-4">
              <label className="text-slate-600">Даты обучения:</label>
              <div className="flex items-center flex-wrap text-xs gap-1">
                <span>{groupData?.group_start_date} </span>
                <DashLg />
                <span> {groupData?.group_end_date}</span>
              </div>
            </div>
            <div className="grid mb-2 md:mb-4 p-4 border drop-shadow-md">
              <label className="text-slate-600">
                Дата ближайшего списания оплаты: {groupData?.next_payment_date}
              </label>
            </div>
            <hr />
            <p className="mt-2">
              Количество студентов: {groupData?.student_count}
            </p>
            <div className="grid text-xs py-4 gap-1">
              {attendances?.students?.map((student) => (
                <div
                  key={student?.id}
                  className={` ${
                    student?.active === true
                      ? "hover:bg-green-100"
                      : "hover:bg-red-100"
                  } flex justify-between flex-wrap items-center transition p-1`}
                >
                  <Popover
                    placement="right"
                    content={
                      <div className="bg-white rounded-md p-2">
                        {student?.active !== true && (
                          <MyButton onClick={() => activeStudent(student?.id)}>
                            Активировать
                          </MyButton>
                        )}
                        <div className="border-b mt-2 mb-2 md:mb-4">
                          <label className="text-xs text-slate-400">
                            Статус
                          </label>
                          <p
                            className={`${
                              !student?.active ? "text-red-400" : ""
                            }`}
                          >
                            {student?.active ? "Активный" : "Не активный"}
                          </p>
                        </div>
                        <div className="border-b mb-2 md:mb-4">
                          <label className="text-xs text-slate-400">Имя</label>
                          <p>
                            {student?.first_name} {student?.last_name}
                          </p>
                        </div>
                        <div className="border-b mb-2 md:mb-4">
                          <label className="text-xs text-slate-400">
                            Баланс
                          </label>
                          <p>{Number(student?.balance).toLocaleString()} сум</p>
                        </div>
                        <div className="border-b mb-2 md:mb-4">
                          <label className="text-xs text-slate-400">
                            Дата добавления
                          </label>
                          <p>{student?.start_date}</p>
                        </div>
                        <div className="border-b mb-2 md:mb-4">
                          <label className="text-xs text-slate-400">
                            Заметка
                          </label>
                          <p>Нет заметок</p>
                        </div>
                        <div className="text-right">
                          <Link
                            to={`/students/profile/${student?.id}`}
                            className="flex items-center gap-2"
                            onClick={() => dispatch(setUserData(student))}
                          >
                            Перейти в профиль
                            <ArrowRight className="text-xs" />
                          </Link>
                        </div>
                      </div>
                    }
                  >
                    <span
                      className={`${
                        student?.active === true
                          ? "text-green-400"
                          : "text-red-400"
                      } `}
                    >
                      {student?.first_name} {student?.last_name}
                    </span>
                  </Popover>
                  <div className="flex flex-col items-center">
                    <a href={`tel:${student?.phone}`}>{student?.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Tabs className="col-span-1 lg:col-span-2">
          <Tabs.TabPane tab="Посещаемость" key="item-1">
            <div className="grid gap-2">
              {groupData?.active
                ? !activeGroup && (
                    <div className="bg-white rounded-md px-6 py-4 overflow-x-auto ">
                      {groupData?.student_count == 0 ? (
                        "В этой группе нет студентов"
                      ) : (
                        <GroupAttendance />
                      )}
                    </div>
                  )
                : !activeGroup && (
                    <div className="shadow-md rounded-md bg-white p-4 ">
                      Группа не активна
                    </div>
                  )}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="История" key="item-2">
            <InProcess />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
}
