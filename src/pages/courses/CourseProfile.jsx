import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { PencilSquare, Trash } from "react-bootstrap-icons";
import { Drawer, Tabs } from "antd";
import axios from "../../axios/axios";
import { IconButton } from "../../UI/IconButton.style";
import { changeUpdateCourseData } from "../../redux/coursesSlice";
import AddCourseForm from "./AddCourseForm";
import InProcess from "../../UI/InProcess.style";
import {
  fetchedError,
  fetchedGroups,
  fetchingGroups,
  setGroupData,
} from "../../redux/groupsSlice";
import { MyMessage } from "../../UI/Message.style";
import { MyButton } from "../../UI/Button.style";

export default function CourseProfile() {
  const { coursesData } = useSelector((state) => state.courses);
  const [editingCourse, setEditingCourse] = useState(null);
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("add");
  const { groups } = useSelector((state) => state.groups);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onEditCourse = (course) => {
    setModalType("update");
    setVisible(true);
    setEditingCourse({ ...course });
  };

  const changeUpdateCourseDataFunc = (data) => {
    dispatch(changeUpdateCourseData(data));
  };

  // fetching groups
  useEffect(() => {
    dispatch(fetchingGroups());
    axios
      .get(`/api/groups`)
      .then((res) => {
        dispatch(fetchedGroups(res?.data?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });

    if (!coursesData?.id) {
      navigate("/courses", { replace: true });
    }
  }, [dispatch, navigate]);
  // courses groups static data
  let courseGroups = [];
  groups?.map((item) => {
    return item?.course?.id === coursesData?.id
      ? courseGroups?.push({
          id: item?.id,
          uid: uuidv4(),
          room: item?.room?.name,
          days: item?.days?.days,
          start: item?.group_start_date,
          end: item?.group_end_date,
          time: item?.time,
          student_count: item?.student_count,
          time: item?.time,
          active: item?.active,
          name: (
            <div>
              {groups?.map((group) => {
                if (group?.id === item?.id) {
                  return (
                    <Link
                      key={group?.id}
                      className="text-cyan-500"
                      to={`/groups/${group?.id}`}
                      onClick={() => dispatch(setGroupData(group))}
                    >
                      {group?.name}
                    </Link>
                  );
                }
              })}
            </div>
          ),
        })
      : null;
  });

  return (
    <>
      <Drawer
        open={visible}
        title={modalType === "add" ? "Добавить курс" : "Редактировать"}
        onClose={() => {
          setVisible(!visible);
        }}
        maskClosable={true}
      >
        <AddCourseForm
          changeUpdateCourseDataFunc={changeUpdateCourseDataFunc}
          modalType={modalType}
          editingCourse={editingCourse}
          visible={visible}
          setVisible={() => setVisible(false)}
        />
      </Drawer>
      <div className="text-xl mb-8 bg-white p-4 rounded-lg">
        {coursesData?.name}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col drop-shadow-md hover:drop-shadow-lg transition col-span-1">
          <div className="bg-pink-500 text-center text-xl text-white px-4 py-20 flex items-center justify-center hover:text-white">
            <div className="absolute top-4 right-4">
              <div className="flex gap-2">
                <IconButton
                  color="primaryOutlined"
                  onClick={() => {
                    onEditCourse(coursesData);
                  }}
                >
                  <PencilSquare />
                </IconButton>
                <IconButton color="dangerOutlined">
                  <Trash />
                </IconButton>
              </div>
            </div>
            {coursesData?.name}
          </div>
          <div className="bg-white p-8">
            <div className="grid mb-2 md:mb-4">
              <label className="text-slate-600">Цена:</label>
              <p>{coursesData?.price} сум</p>
            </div>
            <div className="grid mb-2 md:mb-4">
              <label className="text-slate-600">Продолжительность урока:</label>
              <p>{coursesData?.lesson_duration} минут</p>
            </div>
            <div className="grid mb-2 md:mb-4">
              <label className="text-slate-600">Продолжительность курса:</label>
              <p>{coursesData?.month} месяцев</p>
            </div>
            <div className="grid mb-2 md:mb-4">
              <label className="text-slate-600">Описание:</label>
              <p>{coursesData?.description}</p>
            </div>
          </div>
        </div>
        <Tabs className="col-span-1 lg:col-span-2">
          <Tabs.TabPane tab="Группы" key="item-1">
            <div className="grid gap-4">
              {courseGroups?.length < 1 ? (
                <center>
                  <MyMessage color="warning">
                    <span>Для этого курса еще не создана группа</span>
                    <MyButton color="warning">
                      <Link to="/groups" className="hover:text-white">
                        Создать группу
                      </Link>
                    </MyButton>
                  </MyMessage>
                </center>
              ) : null}
              {courseGroups?.map((item) => (
                <div
                  key={item?.id}
                  className="rounded-md flex flex-wrap gap-4 bg-white p-4 justify-between items-center"
                >
                  <div className="grid gap-0.5">
                    <span className="py-0.5 px-2 bg-orange-200 rounded-sm text-center">
                      {item?.room}
                    </span>
                    <span className="font-bold text-md">{item?.name}</span>
                  </div>
                  {item?.active === true ? (
                    <span className="text-green-400">Активировано</span>
                  ) : (
                    <span className="text-red-400">Не активировано</span>
                  )}
                  <div className="grid gap-0.5">
                    <span>{item?.days}</span>
                    <span>{item?.start + " " + item?.end}</span>
                    <span>{item?.time?.time}</span>
                  </div>
                  <div>
                    <span className="bg-orange-500 rounded-sm text-white px-1 py-0.5">
                      {item?.student_count} студентов
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Материалы" key="item-2">
            <InProcess />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
}
