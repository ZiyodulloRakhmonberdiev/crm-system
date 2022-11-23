// import type { RadioChangeEvent } from 'antd'
import { useState, useEffect } from "react";
import { Input, message, Select, Spin } from "antd";
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
  // states
  const [uploading, setUploading] = useState(false);
  const [course, setCourse] = useState({
    name: "",
    price: "",
    lesson_duration: "",
    month: "",
    lessons_per_module: "",
    description: "",
  });
  // hooks
  const dispatch = useDispatch();
  const url = "/api/courses";

  useEffect(() => {
    if (modalType === "add") {
      setCourse({
        name: "",
        price: "",
        lesson_duration: "",
        month: "",
        lessons_per_module: "",
        description: "",
      });
    } else {
      const {
        name,
        price,
        month,
        lesson_duration,
        lessons_per_module,
        description,
      } = editingCourse;
      setCourse({
        name: name,
        price: price,
        lesson_duration: lesson_duration,
        month: month,
        lessons_per_module: lessons_per_module,
        description: description,
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
    const { name, price, lesson_duration, month, lessons_per_module } = course;
    if (name && price && lesson_duration && month && lessons_per_module) {
      setUploading(true);
      if (modalType === "add") {
        axios
          .post(url, {
            name: course?.name,
            price: course?.price,
            lesson_duration: course?.lesson_duration,
            month: course?.month,
            lessons_per_module: course?.lessons_per_module,
            description: course?.description,
          })
          .then((res) => {
            setCourse({
              name: "",
              price: "",
              lesson_duration: "",
              month: "",
              lessons_per_module: "",
              description: "",
            });
            message.success("Курс успешно добавлен!");
            dispatch(refreshCoursesData());
            setVisible();
          })
          .catch((err) => {
            console.log(err);
            message.error("Произошла ошибка! Попробуйте еще раз!");
          })
          .finally(() => setUploading(false));
      } else if (modalType === "update") {
        axios
          .patch(url + "/" + editingCourse?.id, {
            course_id: editingCourse?.id,
            name: course?.name,
            price: course?.price,
            lesson_duration: course?.lesson_duration,
            month: course?.month,
            lessons_per_module: course?.lessons_per_module,
            description: course?.description,
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
              lessons_per_module: "",
              description: "",
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
        <Select
          required
          className="w-full mb-4 mt-2"
          value={course?.lesson_duration}
          onChange={(e) => {
            setCourse({ ...course, lesson_duration: e });
          }}
          placeholder="Выбрать варианты"
        >
          return (<Select.Option value={30}>30 минут</Select.Option>
          <Select.Option value={60}>60 минут</Select.Option>
          <Select.Option value={90}>90 минут</Select.Option>
          <Select.Option value={120}>120 минут</Select.Option>
          <Select.Option value={150}>150 минут</Select.Option>
          <Select.Option value={180}>180 минут</Select.Option>
          );
        </Select>
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
        <p>Уроков за модуль (сколько)</p>
        <Input
          required
          type="number"
          id="lessons_per_module"
          value={course?.lessons_per_module}
          onChange={(e) => {
            handle(e);
          }}
          className="mb-4 mt-2"
          name="lessons_per_module"
        />
        <p>Описание</p>
        <Input.TextArea
          rows={4}
          className="mb-4 mt-2"
          onChange={(e) => {
            handle(e);
          }}
          name="description"
          id="description"
          value={course?.description}
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
