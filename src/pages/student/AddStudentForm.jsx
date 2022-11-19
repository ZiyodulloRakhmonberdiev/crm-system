import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Telephone, X } from "react-bootstrap-icons";
import InputMask from "react-input-mask";
import { Input, Form, Radio, message, Spin } from "antd";
import { v4 as uuidv4 } from "uuid";

import axios from "../../axios/axios";
import { refreshStudentsData } from "../../redux/studentsSlice";
import { MyButton } from "../../UI/Button.style";
import { IconButton } from "../../UI/IconButton.style";

export default function AddStudentForm({
  modalType,
  editingStudent,
  visible,
  setVisible,
  changeUpdateUserDataFunc = null,
}) {
  const [uploading, setUploading] = useState(false);
  const [inputFields, setInputFields] = useState([]);

  const url = "/api/students";
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    address: "",
    birthday: "",
    gender: "",
    additionPhone: [],
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (modalType === "add") {
      setStudent({
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        address: "",
        birthday: "",
        gender: "",
        additionPhone: "",
      });
      setInputFields([]);
    } else {
      const {
        first_name,
        last_name,
        phone,
        address,
        birthday,
        gender,
        addition_phone,
      } = editingStudent;
      setStudent({
        firstName: first_name,
        lastName: last_name,
        phone: phone.length === 9 ? phone : phone.slice(4, 13),
        password: "",
        address: address,
        birthday: birthday,
        gender: gender,
        additionPhone: addition_phone,
      });
      if (addition_phone) {
        setInputFields([]);
        const newAddPhones = [];
        addition_phone.map((item) => {
          newAddPhones.push({ ...item, id: uuidv4() });
        });
        setInputFields(newAddPhones);
      } else {
        setInputFields([]);
      }
    }
  }, [modalType, visible]);

  function handle(e) {
    const newStudent = { ...student };
    newStudent[e.target.id] = e.target.value;
    setStudent(newStudent);
  }

  function submit(e) {
    e.preventDefault();
    const { firstName, lastName, phone, address, birthday, gender } = student;
    if (firstName && lastName && phone && address && birthday && gender) {
      setUploading(true);
      if (modalType === "add") {
        axios
          .post(url, {
            first_name: student?.firstName,
            last_name: student?.lastName,
            phone: "+998" + student?.phone?.split(" ").join(""),
            password: student?.password,
            address: student?.address,
            birthday: student?.birthday,
            gender: student?.gender,
            addition_phone: inputFields,
          })
          .then((res) => {
            setStudent({
              firstName: "",
              lastName: "",
              phone: "",
              password: "",
              address: "",
              birthday: "",
              gender: "",
              additionPhone: "",
            });
            message.success("Пользователь успешно добавлен!");
            dispatch(refreshStudentsData());
            setVisible();
          })
          .catch((err) => {
            if (err?.response?.data?.data?.phone) {
              message.error("Этот номер телефона уже зарегистрирован!");
            } else {
              message.error("Произошла ошибка! Попробуйте еще раз!");
            }
          })
          .finally(() => setUploading(false));
      } else if (modalType === "update") {
        axios
          .patch(url + "/" + editingStudent?.id, {
            student_id: editingStudent?.id,
            first_name: student?.firstName,
            last_name: student?.lastName,
            phone: "+998" + student?.phone?.split(" ").join(""),
            password: student?.password,
            address: student?.address,
            birthday: student?.birthday,
            gender: student?.gender,
            addition_phone: inputFields,
          })
          .then((res) => {
            if (changeUpdateUserDataFunc) {
              changeUpdateUserDataFunc(student);
            }
            setStudent({
              firstName: "",
              lastName: "",
              phone: "",
              password: "",
              address: "",
              birthday: "",
              gender: "",
              additionPhone: "",
            });
            message.success("Пользователь успешно обновлен!");
            dispatch(refreshStudentsData());
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

  // Addition phone
  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { label: "Дополнительный телефон", phone: "", id: Date.now() },
    ]);
  };

  const handleChangeInput = (type, id, event) => {
    setInputFields((prev) => {
      return inputFields?.map((item) => {
        if (id === item.id) {
          return {
            ...item,
            phone:
              type === "phone"
                ? `+998${event.target.value.split(" ").join("")}`
                : item.phone,
            label: type === "label" ? event.target.value : item.label,
          };
        } else {
          return item;
        }
      });
    });
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };
  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <p>Телефон</p>
        <InputMask
          mask="99 999 99 99"
          onChange={(e) => {
            setStudent({ ...student, phone: e.target.value });
          }}
          value={student.phone}
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
          id="firstName"
          value={student?.firstName}
          onChange={(e) => {
            handle(e);
          }}
          type="text"
          className="mb-4 mt-2"
        />
        <p>Фамилия</p>
        <Input
          required
          id="lastName"
          value={student?.lastName}
          onChange={(e) => {
            handle(e);
          }}
          type="text"
          className="mb-4 mt-2"
        />
        <p>Адрес</p>
        <Input
          required
          id="address"
          onChange={(e) => {
            handle(e);
          }}
          type="text"
          value={student?.address}
          className="mb-4 mt-2"
        />
        <p>Дата рождения</p>
        <input
          id="birthday"
          type="date"
          onChange={(e) => {
            handle(e);
          }}
          placeholder="mana"
          value={student?.birthday}
          className="p-1 mb-4 mt-2 rounded-sm border border-slate-300"
        />
        <p>Пол</p>
        <Radio.Group value={student?.gender} className="mb-4 mt-2">
          <Radio
            checked={student?.gender === "male"}
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
            checked={student?.gender === "female"}
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
        {/* <p>Коментарий</p>
        <Input.TextArea rows={4} className='mb-4 mt-2' id='comment' /> */}
        <Form.Item>
          <p>Пароль</p>
          <Input.Password
            required={modalType === "add"}
            id="password"
            onChange={(e) => {
              handle(e);
            }}
            type="password"
            value={student?.password}
            className="mb-4 mt-2"
          />
        </Form.Item>
        <p>Дополнительные контакты</p>
        <div className="flex gap-2">
          <IconButton
            onClick={handleAddFields}
            color="success"
            className="mb-4 mt-2"
            type="button"
          >
            <Telephone />
          </IconButton>
        </div>
        {inputFields.map((inputField) => (
          <div key={inputField.id}>
            <div className="flex justify-between items-end mb-2">
              <span>Пользователь телефона</span>
              <button
                onClick={() => {
                  handleRemoveFields(inputField.id);
                }}
                color="dangerOutlined"
                className="border rounded-full text-slate-400 p-1"
              >
                <X className="text-xl" />
              </button>
            </div>
            <Input
              placeholder="Пользователь телефона"
              onChange={(e) => {
                handleChangeInput("label", inputField.id, e);
              }}
              value={inputField.label}
              required
            />
            <InputMask
              mask="99 999 99 99"
              onChange={(event) => {
                handleChangeInput("phone", inputField.id, event);
              }}
              value={inputField?.phone?.slice(4, inputField?.length)} // +998
              maskChar={null}
              required
            >
              {(props) => (
                <Input
                  name="phone"
                  {...props}
                  addonBefore="+998"
                  className="mb-4 mt-2"
                />
              )}
            </InputMask>
          </div>
        ))}
        <Spin spinning={uploading}>
          <MyButton htmlType="submit" color="primary">
            Отправить
          </MyButton>
        </Spin>
      </form>
    </div>
  );
}
