// import type { RadioChangeEvent } from 'antd'
import { useState, useEffect } from "react";
import { Input, Radio, message, Spin, Checkbox } from "antd";
import axios from "../../axios/axios";
import { MyButton } from "../../UI/Button.style";
import { useDispatch } from "react-redux";
import { refreshEmployeesData } from "../../redux/employeesSlice";
import InputMask from "react-input-mask";

export default function AddEmployeeForm({
  modalType,
  editingEmployee,
  visible,
  setVisible,
}) {
  const url = "/api/employees";
  const [employee, setEmployee] = useState({
    name: "",
    phone: "",
    roles: [],
    gender: "",
    salary: "",
    password: "",
  });
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalType === "add") {
      setEmployee({
        name: "",
        phone: "",
        roles: [],
        gender: "",
        salary: "",
        password: "",
      });
    } else {
      const { name, phone, gender, salary, password, role } = editingEmployee;
      setEmployee({
        name: name,
        phone: phone.length === 9 ? phone : phone.slice(4, 13),
        roles: role,
        gender: gender,
        salary: salary,
        password: password,
      });
    }
  }, [modalType, visible]);
  function handle(e) {
    const newEmployee = { ...employee };
    newEmployee[e.target.id] = e.target.value;
    setEmployee(newEmployee);
  }

  function submit(e) {
    e.preventDefault();
    const { name, phone, roles, gender, salary } = employee;
    if (name && phone && roles && gender && salary) {
      setUploading(true);
      if (modalType === "add") {
        axios
          .post(url, {
            name: employee.name,
            phone: "+998" + employee?.phone?.split(" ").join(""),
            roles: employee.roles,
            gender: employee.gender,
            salary: employee.salary,
            password: employee.password,
          })
          .then((res) => {
            setEmployee({
              name: "",
              phone: "",
              roles: [],
              gender: "",
              salary: "",
            });
            message.success("Сотрудник успешно добавлен!");
            dispatch(refreshEmployeesData());
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
          .patch(url + "/" + editingEmployee?.id, {
            employee_id: editingEmployee?.id,
            name: employee?.name,
            phone: "+998" + employee?.phone?.split(" ").join(""),
            roles: employee?.roles,
            gender: employee?.gender,
            salary: employee?.salary,
            password: employee?.password,
          })
          .then((res) => {
            setEmployee({
              name: "",
              phone: "",
              roles: [],
              gender: "",
              salary: "",
            });
            message.success("Сотрудник успешно обновлен!");
            dispatch(refreshEmployeesData());
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
            setEmployee({ ...employee, phone: e.target.value });
          }}
          value={employee?.phone}
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
          value={employee?.name}
          onChange={(e) => {
            handle(e);
          }}
          type="text"
          className="mb-4 mt-2"
        />
        <p>Роль</p>
        <Checkbox.Group
          value={employee?.roles}
          options={[
            {
              label: "CEO",
              value: "CEO",
            },
            {
              label: "Branch Director",
              value: "Branch Director",
            },
            {
              label: "Administrator",
              value: "Administrator",
            },
            {
              label: "Limited Administrator",
              value: "Limited Administrator",
            },
            {
              label: "Teacher",
              value: "Teacher",
            },
            {
              label: "Marketer",
              value: "Marketer",
            },
            {
              label: "Cashier",
              value: "cashier",
            },
          ]}
          onChange={(e) => {
            setEmployee({ ...employee, roles: e });
          }}
          className="mb-4 mt-2"
        />
        <p>Поль</p>
        <Radio.Group value={employee?.gender} className="mb-4 mt-2">
          <Radio
            checked={employee?.gender === "male"}
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
            checked={employee?.gender === "female"}
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
          id="salary"
          value={employee?.salary}
          onChange={(e) => {
            handle(e);
          }}
          type="number"
          className="mb-4 mt-2"
        />
        <p>Пароль</p>
        <Input.Password
          required={modalType === "add"}
          id="password"
          value={employee?.password}
          onChange={(e) => {
            handle(e);
          }}
          type="password"
          className="mb-4 mt-2"
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
