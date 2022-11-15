import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Drawer, Spin } from "antd";
import { PencilSquare, Trash, Palette2 } from "react-bootstrap-icons";

import { MyButton } from "../../UI/Button.style";
import { IconButton } from "../../UI/IconButton.style";
import axios from "../../axios/axios";
import AddCourseForm from "./AddCourseForm";
import {
  fetchingCourses,
  fetchedCourses,
  fetchedError,
  setCoursesData,
} from "../../redux/coursesSlice";

export default function Courses() {
  const [editingCourse, setEditingCourse] = useState(null);
  const [visible, setVisible] = useState(false);

  const [modalType, setModalType] = useState("add");
  const [fetchLoading, setFetchLoading] = useState(false);

  const dispatch = useDispatch();
  const { courses, refreshCourses } = useSelector((state) => state.courses);

  // courses static data
  let dataSource = [];
  courses?.map((item) => {
    dataSource?.push({
      id: item?.id,
      name: item?.name,
      file: item?.file,
      description: item?.description,
      lesson_duration: item?.lesson_duration,
      month: item?.month,
      price: item?.price,
      actions: (
        <div className="flex gap-2">
          <IconButton
            color="primaryOutlined"
            onClick={() => {
              onEditCourse(item);
            }}
          >
            <PencilSquare />
          </IconButton>
          <IconButton
            color="dangerOutlined"
            onClick={() => {
              onDeleteCourse(item);
            }}
          >
            <Trash />
          </IconButton>
        </div>
      ),
    });
  });

  // Actions with table
  const onDeleteCourse = (record) => {
    Modal.confirm({
      title: "Вы уверены что хотите удалить?",
      okText: "Да",
      okType: "danger",
      cancelText: "Отмена",
      // onOk: () => {
      //   setDataSource(pre => {
      //     return pre.filter(Course => Course.id !== record.id)
      //   })
      // }
    });
  };

  const onEditCourse = (course) => {
    setModalType("update");
    setVisible(true);
    setEditingCourse({ ...course });
  };

  // fetching courses
  useEffect(() => {
    setFetchLoading(true);
    dispatch(fetchingCourses());
    axios
      .get(`/api/courses`)
      .then((res) => {
        dispatch(fetchedCourses(res?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      })
      .finally(() => setFetchLoading(false));
  }, [refreshCourses]);
  return (
    <div>
      <header className="bg-white flex flex-wrap p-4 rounded-lg items-center justify-center sm:justify-between md:justify-start gap-4 mb-8">
        <div className="text-2xl text-pink-400 bg-pink-50 p-2 rounded-md">
          <Palette2 />
        </div>
        <div className="md:flex md:gap-4 items-center">
          <p className="text-pink-400 text-2xl">Курсы</p>
          <p className="text-pink-400">Количество: {courses.length}</p>
        </div>
        <MyButton
          onClick={() => {
            setVisible(!visible);
            setModalType("add");
          }}
          className="md:ml-auto"
        >
          Добавить
        </MyButton>
      </header>
      <Drawer
        open={visible}
        title={modalType === "add" ? "Добавить курс" : "Редактировать"}
        onClose={() => {
          setVisible(!visible);
        }}
        maskClosable={true}
      >
        <AddCourseForm
          modalType={modalType}
          editingCourse={editingCourse}
          visible={visible}
          setVisible={() => setVisible(false)}
        />
      </Drawer>
      <Spin spinning={fetchLoading}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses?.map((course) => (
            <div
              key={course?.id}
              className="flex flex-col drop-shadow-md hover:drop-shadow-2xl transition relative"
            >
              <Link
                to={`/courses/${course?.id}`}
                onClick={() => dispatch(setCoursesData(course))}
                className="bg-pink-500 text-center text-xl text-white px-4 py-20 flex items-center justify-center hover:text-white"
              >
                {course?.name}
              </Link>
              <div className="absolute top-4 right-4">
                <div className="flex gap-2">
                  <IconButton
                    color="primaryOutlined"
                    onClick={() => {
                      onEditCourse(course);
                    }}
                  >
                    <PencilSquare />
                  </IconButton>
                  <IconButton
                    color="dangerOutlined"
                    onClick={() => {
                      onDeleteCourse(course);
                    }}
                  >
                    <Trash />
                  </IconButton>
                </div>
              </div>
              <div className="flex flex-col gap-8 items-start justify-start px-6 py-8 bg-white">
                <p className="text-xl text-pink-500">{course.name}</p>
                <p className="text-slate-600">{course.price} сум</p>
              </div>
            </div>
          ))}
        </div>
      </Spin>
    </div>
  );
}
