import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Table, Modal, Drawer, Pagination } from "antd";
import { v4 as uuidv4 } from "uuid";
import { PencilSquare, Trash, Layers } from "react-bootstrap-icons";

import { IconButton } from "../../UI/IconButton.style";
import axios from "../../axios/axios";
import AddEmployeeForm from "./AddEmployeeForm";
import {
  fetchingEmployees,
  fetchedEmployees,
  fetchedError,
  setEmployeesData,
} from "../../redux/employeesSlice";
import { HeaderItem, HeaderWrapper } from "../../UI/Header.style";
import MyHeaderButton from "../../UI/MyHeaderButton.style";

export default function Employees({ notallowedroles = [] }) {
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [visible, setVisible] = useState(false);

  const [modalType, setModalType] = useState("add");
  const dispatch = useDispatch();
  const { employees, loading, refreshEmployees } = useSelector(
    (state) => state.employees
  );
  // get CEO
  const [CEO, setCEO] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("crm_role").toUpperCase() === "CEO") {
      setCEO(true);
    } else {
      setCEO(false);
    }
  });
  // get TEACHER
  const [TEACHER, setTEACHER] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("crm_role").toUpperCase() === "TEACHER") {
      setTEACHER(true);
    } else {
      setTEACHER(false);
    }
  });

  // employees static data
  let dataSource = [];
  employees?.map((item) => {
    dataSource?.push({
      id: item?.id,
      uid: uuidv4(),
      name: item?.name,
      file: item?.file,
      name: (
        <Link
          to={`/employees/profile/${item?.id}`}
          onClick={() => dispatch(setEmployeesData(item))}
        >
          {item?.name}
        </Link>
      ),
      role: (
        <div className="flex flex-wrap gap-2">
          {item?.role?.map((role, index) => (
            <div key={index}>
              <span className="px-2 py-1 rounded-md bg-slate-200 text-xs text-gray-500  capitalize">
                {role}
              </span>
            </div>
          ))}
        </div>
      ),
      phone: item?.phone?.toLocaleString(),
      gender: item?.gender,
      salary:
        CEO && !TEACHER
          ? Number(item?.salary).toLocaleString()
          : "Доступно только CEO",
      actions: TEACHER ? (
        "Недоступно для вас"
      ) : (
        <div className="flex gap-2">
          <IconButton
            color="primary"
            onClick={() => {
              onEditEmployee(item);
            }}
          >
            <PencilSquare />
          </IconButton>
          <IconButton
            color="danger"
            onClick={() => {
              onDeleteEmployee(item);
            }}
          >
            <Trash />
          </IconButton>
        </div>
      ),
    });
  });

  // Table headers
  const columns = [
    {
      key: "1",
      title: "",
      dataIndex: "id",
      width: 80,
    },
    {
      key: "2",
      title: "Имя",
      dataIndex: "name",
      fixed: "top",
      width: 250,
    },
    {
      key: "3",
      title: "Телефон",
      dataIndex: "phone",
      fixed: "top",
    },
    {
      key: "4",
      title: "Роль",
      dataIndex: "role",
      fixed: "top",
    },
    {
      key: "5",
      title: "	Зарплата",
      dataIndex: "salary",
      fixed: "top",
    },
    {
      key: "6",
      title: "Действие",
      dataIndex: "actions",
    },
  ];
  // Actions with table
  const onDeleteEmployee = (record) => {
    Modal.confirm({
      title: "Вы уверены что хотите удалить?",
      okText: "Да",
      okType: "danger",
      cancelText: "Отмена",
      // onOk: () => {
      //   setDataSource(pre => {
      //     return pre.filter(employee => employee.id !== record.id)
      //   })
      // }
    });
  };

  const onEditEmployee = (employee) => {
    setModalType("update");
    setVisible(true);
    setEditingEmployee({ ...employee });
  };

  // fetching employees
  useEffect(() => {
    dispatch(fetchingEmployees());
    axios
      .get(`/api/employees`)
      .then((res) => {
        dispatch(fetchedEmployees(res?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [refreshEmployees]);
  return (
    <div>
      <HeaderWrapper>
        <HeaderItem type="secondary">
          <div className="header__icon">
            <Layers />
          </div>
          <div className="header__content">
            <p className="header__title">Сотрудники</p>
            <p>Количество: </p>
            <p className="header__result"> {employees?.length}</p>
          </div>
          {TEACHER ? (
            ""
          ) : (
            <MyHeaderButton
              setModalType={() => setModalType("add")}
              setVisible={() => setVisible(!visible)}
            />
          )}
        </HeaderItem>
      </HeaderWrapper>
      <Drawer
        open={visible}
        title={
          modalType === "add" ? "Добавить новых сотрудников" : "Редактировать"
        }
        onClose={() => {
          setVisible(!visible);
        }}
        maskClosable={true}
      >
        <AddEmployeeForm
          modalType={modalType}
          editingEmployee={editingEmployee}
          visible={visible}
          setVisible={() => setVisible(false)}
        />
      </Drawer>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 1000,
        }}
        pagination={false}
        rowKey={(record) => record.uid}
        size="small"
      ></Table>
    </div>
  );
}
