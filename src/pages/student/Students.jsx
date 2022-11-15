import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { Table, Modal, Input, Select, Drawer, Pagination } from "antd";
import { PencilSquare, Trash, Mortarboard } from "react-bootstrap-icons";

import axios from "../../axios/axios";
import { MyButton } from "../../UI/Button.style";
import { IconButton } from "../../UI/IconButton.style";
import AddStudentForm from "./AddStudentForm";

import {
  fetchingStudents,
  fetchedStudents,
  fetchedError,
  setUserData,
} from "../../redux/studentsSlice";

export default function Students() {
  // all states
  const [searchText, setSearchText] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visible, setVisible] = useState(false);

  const [modalType, setModalType] = useState("add");
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(30);
  const [last_page, setLastPage] = useState(1);
  const dispatch = useDispatch();
  const { students, loading, error, refreshStudents } = useSelector(
    (state) => state.students
  );

  // Multi Select inputs
  const courses = [
    "English",
    "Russian",
    "MobileDev",
    "WebDev",
    "SMM",
    "Python",
    "PHP",
  ];
  const finance = [
    "Есть долг",
    "Есть скидки",
    "Без долгов",
    "Позитивный баланс",
    "Оплатил в текущем месяце",
  ];

  // Table select functions
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // students static data
  let dataSource = [];
  students?.map((item) => {
    dataSource?.push({
      id: item?.id,
      uid: uuidv4(),
      firstName: item?.first_name,
      lastName: item?.last_name,
      name: (
        <Link
          to={`/students/profile/${item.id}`}
          onClick={() => dispatch(setUserData(item))}
          className="text-cyan-500"
        >
          {item?.first_name + " " + item?.last_name}
        </Link>
      ),
      phone: item?.phone?.toLocaleString(),
      address: item?.address,
      birthday: item?.birthday,
      gender: item?.gender,
      additionPhone: item?.addition_phone?.map((phone) => phone?.name),
      actions: (
        <div className="flex gap-2">
          <IconButton
            color="primary"
            onClick={() => {
              onEditStudent(item);
            }}
          >
            <PencilSquare />
          </IconButton>
          <IconButton
            color="danger"
            onClick={() => {
              onDeleteStudent(item);
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
      render: (record) => {
        return <span className="pl-1">{record}</span>;
      },
    },
    {
      key: "2",
      title: "Имя",
      dataIndex: "name",
      fixed: "top",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.email).toLowerCase().includes(value.toLowerCase()) ||
          String(record.phone).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      key: "3",
      title: "Телефон",
      dataIndex: "phone",
      fixed: "top",
    },
    {
      key: "4",
      title: "Адрес",
      dataIndex: "address",
      fixed: "top",
    },
    {
      key: "5",
      title: "Действие",
      fixed: "top",
      width: 120,
      dataIndex: "actions",
    },
  ];

  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Вы уверены что хотите удалить?",
      okText: "Да",
      okType: "danger",
      cancelText: "Отмена",
      // onOk: () => {
      //   setDataSource(pre => {
      //     return pre.filter(student => student.id !== record.id)
      //   })
      // }
    });
  };
  const onEditStudent = (student) => {
    setModalType("update");
    setVisible(true);
    setEditingStudent({ ...student });
  };

  // fetching students
  useEffect(() => {
    dispatch(fetchingStudents());
    axios
      .get(`/api/students?page=${currentPage}`)
      .then((res) => {
        dispatch(fetchedStudents(res?.data?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [refreshStudents, currentPage]);
  return (
    <div>
      <header className="bg-white flex flex-wrap p-4 rounded-lg items-center justify-center sm:justify-between md:justify-start gap-4 mb-8">
        <div className="text-2xl text-cyan-400 bg-cyan-50 p-2 rounded-md">
          <Mortarboard />
        </div>
        <div className="md:flex md:gap-4 items-center">
          <p className="text-cyan-400 text-2xl">Студенты</p>
          <p className="text-cyan-400">Количество: {students?.length} </p>
        </div>
        <MyButton
          onClick={() => {
            setVisible(!visible);
            setModalType("add");
          }}
          className="md:ml-auto sm:w-1/3 md:w-auto"
        >
          Добавить
        </MyButton>
      </header>
      <div className="flex flex-wrap gap-2 mb-8">
        <div className="w-42">
          <Input.Search
            placeholder="Поиск по имени или телефону"
            onSearch={(value) => {
              setSearchText(value);
            }}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            allowClear
            className="min-w-[200px] md:min-w-[250px] sm:pr-8"
          />
        </div>
        <Select
          mode="multiple"
          maxTagCount={2}
          className="min-w-[200px]"
          placeholder="По курсам"
          allowClear
        >
          {courses.map((course, index) => {
            return (
              <Select.Option key={index} value={course}>
                {course}
              </Select.Option>
            );
          })}
        </Select>
        <Select
          mode="multiple"
          placeholder="Финансовое ситуация"
          maxTagCount={2}
          allowClear
          className="min-w-[200px]"
        >
          {finance.map((item, index) => {
            return (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            );
          })}
        </Select>
      </div>
      {/* Add a new student with Drawer */}
      <Drawer
        open={visible}
        title={modalType === "add" ? "Добавить пользователя" : "Редактировать"}
        onClose={() => {
          setVisible(!visible);
        }}
        maskClosable={true}
      >
        <AddStudentForm
          modalType={modalType}
          editingStudent={editingStudent}
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
        rowSelection={rowSelection}
        className="overflow-auto"
        pagination={false}
        rowKey={(record) => record.uid}
      ></Table>
      <br />
      <center>
        <Pagination
          pageSize={per_page ? per_page : 30}
          total={last_page * per_page}
          current={currentPage}
          onChange={(page, x) => {
            setCurrentPage(page);
            setPerPage(x);
          }}
        />
      </center>
    </div>
  );
}
