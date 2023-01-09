import { useState, useEffect } from "react";
import { Input, Form, Radio, message, Spin } from "antd";
import axios from "../../axios/axios";
import { MyButton } from "../../UI/Button.style";
import { useDispatch } from "react-redux";
import { refreshTeachersData } from "../../redux/teachersSlice";
import InputMask from "react-input-mask";

export default function AddTeacherForm({
  modalType,
  editingTeacher,
  visible,
  setVisible,
}) {
  const url = "/api/teachers";
  const [teacher, setTeacher] = useState({
    name: "",
    phone: "",
    password: "",
    gender: "",
    salary_percentage: "",
  });
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalType === "add") {
      setTeacher({
        name: "",
        phone: "",
        password: "",
        gender: "",
        salary_percentage: "",
      });
    } else {
      const { name, phone, gender, salary_percentage } = editingTeacher;
      setTeacher({
        name: name,
        phone: phone.length === 9 ? phone : phone.slice(4, 13),
        password: "",
        gender: gender,
        salary_percentage: salary_percentage,
      });
    }
  }, [modalType, visible]);

  function handle(e) {
    const newTeacher = { ...teacher };
    newTeacher[e.target.id] = e.target.value;
    setTeacher(newTeacher);
  }

  function submit(e) {
    e.preventDefault();
    const { name, phone, gender, salary_percentage } = teacher;
    if (name && phone && gender && salary_percentage) {
      setUploading(true);
      if (modalType === "add") {
        axios
          .post(url, {
            name: teacher.name,
            phone: "+998" + teacher.phone?.split(" ").join(""),
            password: teacher.password,
            gender: teacher.gender,
            salary_percentage: teacher.salary_percentage,
          })
          .then((res) => {
            setTeacher({
              name: "",
              phone: "",
              password: "",
              gender: "",
              salary_percentage: "",
            });
            message.success("Учитель успешно добавлен!");
            dispatch(refreshTeachersData());
            setVisible();
          })
          .catch((err) => {
            if (err.response.data.data.phone) {
              message.error("Этот номер телефона уже зарегистрирован!");
            } else {
              message.error("Произошла ошибка! Попробуйте еще раз!");
            }
          })
          .finally(() => setUploading(false));
      } else if (modalType === "update") {
        axios
          .patch(url + "/" + editingTeacher?.id, {
            teacher_id: editingTeacher?.id,
            name: teacher.name,
            phone: "+998" + teacher.phone?.split(" ").join(""),
            password: teacher.password,
            gender: teacher.gender,
            salary_percentage: teacher.salary_percentage,
          })
          .then((res) => {
            setTeacher({
              name: "",
              phone: "",
              password: "",
              gender: "",
              salary_percentage: "",
            });
            message.success("Учитель успешно обновлен!");
            dispatch(refreshTeachersData());
            setVisible();
          })
          .catch((err) => {
            if (err.response.data.data.phone) {
              message.error("Этот номер телефона уже зарегистрирован!");
            } else {
              message.error("Произошла ошибка! Попробуйте еще раз!");
            }
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
        <p>Телефон</p>
        <InputMask
          mask="99 999 99 99"
          onChange={(e) => {
            setTeacher({ ...teacher, phone: e.target.value });
          }}
          value={teacher.phone}
          maskChar={null}
        >
          {(props) => (
            <Input
              {...props}
              required
              addonBefore="+998"
              className="mb-4 mt-2"
            />
          )}
        </InputMask>

        <p>Имя</p>
        <Input
          required
          id="name"
          value={teacher?.name}
          onChange={(e) => {
            handle(e);
          }}
          type="text"
          className="mb-4 mt-2"
        />
        <p>Пол</p>
        <Radio.Group value={teacher?.gender} className="mb-4 mt-2">
          <Radio
            checked={teacher?.gender === "male"}
            value="male"
            id="gender"
            name="gender"
            onChange={(e) => {
              handle(e);
            }}
          >
            Мужчина
          </Radio>
          <Radio
            checked={teacher?.gender === "female"}
            value="female"
            id="gender"
            name="gender"
            onChange={(e) => {
              handle(e);
            }}
          >
            Женщина
          </Radio>
        </Radio.Group>
        <p>Зарплата</p>
        <Input
          required
          id="salary_percentage"
          value={teacher?.salary_percentage}
          onChange={(e) => {
            handle(e);
          }}
          type="number"
          className="mb-4 mt-2"
        />
        <Form.Item>
          <p>Пароль</p>
          <Input.Password
            required={modalType === "add"}
            id="password"
            onChange={(e) => {
              handle(e);
            }}
            type="password"
            value={teacher?.password}
            className="mb-4 mt-2"
          />
        </Form.Item>
        <Spin spinning={uploading}>
          <MyButton htmlType="submit" color="primary">
            Отправить
          </MyButton>
        </Spin>
      </form>
    </div>
  );
}
