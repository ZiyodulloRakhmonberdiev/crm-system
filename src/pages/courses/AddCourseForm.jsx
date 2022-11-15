// import type { RadioChangeEvent } from 'antd'
import { useState, useEffect } from "react";
import { Input, message, Spin } from "antd";
import axios from "../../axios/axios";
import { MyButton } from "../../UI/Button.style";
import { useDispatch } from "react-redux";
import { refreshCoursesData } from "../../redux/coursesSlice";

export default function AddCourseForm({
  modalType,
  editingCourse,
  visible,
  setVisible,
  changeUpdateCourseDataFunc = null,
}) {
  const url = "/api/courses";
  const [course, setCourse] = useState({
    name: "",
    price: "",
    lesson_duration: "",
    month: "",
  });
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalType === "add") {
      setCourse({
        name: "",
        price: "",
        lesson_duration: "",
        month: "",
      });
    } else {
      const { name, price, month, lesson_duration } = editingCourse;
      setCourse({
        name: name,
        price: price,
        lesson_duration: lesson_duration,
        month: month,
      });
    }
  }, [modalType, visible]);

  function handle(e) {
    const newCourse = { ...course };
    newCourse[e.target.id] = e.target.value;
    setCourse(newCourse);
  }

  function submit(e) {
    e.preventDefault();
    const { name, price, lesson_duration, month } = course;
    if (name && price && lesson_duration && month) {
      setUploading(true);
      if (modalType === "add") {
        axios
          .post(url, {
            name: course.name,
            price: course.price,
            lesson_duration: course.lesson_duration,
            month: course.month,
          })
          .then((res) => {
            setCourse({
              name: "",
              price: "",
              lesson_duration: "",
              month: "",
            });
            message.success("Курс успешно добавлен!");
            dispatch(refreshCoursesData());
            setVisible();
          })
          .catch((err) => {
            message.error("Произошла ошибка! Попробуйте еще раз!");
          })
          .finally(() => setUploading(false));
      } else if (modalType === "update") {
        axios
          .patch(url + "/" + editingCourse?.id, {
            course_id: editingCourse?.id,
            name: course.name,
            price: course.price,
            lesson_duration: course.lesson_duration,
            month: course.month,
          })
          .then((res) => {
            if (changeUpdateCourseDataFunc) {
              changeUpdateCourseDataFunc(course);
            }
            setCourse({
              name: "",
              price: "",
              lesson_duration: "",
              month: "",
            });
            message.success("Курс успешно обновлен!");
            dispatch(refreshCoursesData());
            setVisible();
          })
          .catch((err) => {
            message.error("Произошла ошибка! Попробуйте еще раз!");
          })
          .finally(() => setUploading(false));
      }
    } else {
      message.error("Заполните все поля!");
    }
  }

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <p>Название</p>
        <Input
          required
          id="name"
          value={course?.name}
          onChange={(e) => {
            handle(e);
          }}
          type="text"
          className="mb-4 mt-2"
          name="name"
        />
        <p>Продолжительность урока (минут)</p>
        <Input
          type="number"
          required
          id="lesson_duration"
          value={course?.lesson_duration}
          onChange={(e) => {
            handle(e);
          }}
          className="mb-4 mt-2"
          name="lesson_duration"
        />
        <p>Продолжительность курса (месяцев)</p>
        <Input
          type="number"
          required
          id="month"
          value={course?.month}
          onChange={(e) => {
            handle(e);
          }}
          className="mb-4 mt-2"
          name="month"
        />
        <p>Цена (сум)</p>
        <Input
          required
          id="price"
          value={course?.price}
          onChange={(e) => {
            handle(e);
          }}
          className="mb-4 mt-2"
          name="price"
        />
        <Spin spinning={uploading}>
          <MyButton htmlType="submit" color="primary">
            Отправить
          </MyButton>
        </Spin>
      </form>
    </div>
  );
}
