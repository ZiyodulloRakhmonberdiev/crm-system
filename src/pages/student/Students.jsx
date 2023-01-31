import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { Table, Modal, Input, Select, Drawer, Pagination } from "antd";
import { PencilSquare, Trash, Mortarboard } from "react-bootstrap-icons";

import axios from "../../axios/axios";
import { IconButton } from "../../UI/IconButton.style";
import AddStudentForm from "./AddStudentForm";

import {
  fetchingStudents,
  fetchedStudents,
  fetchedError,
  setUserData,
  fetchingStudentsStatistics,
  fetchedStudentsStatistics,
} from "../../redux/studentsSlice";
import { fetchedCourses, fetchingCourses } from "../../redux/coursesSlice";
import { HeaderItem, HeaderWrapper } from "../../UI/Header.style";
import MyHeaderButton from "../../UI/MyHeaderButton.style";

export default function Students() {
  // all states
  const [searchText, setSearchText] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [visible, setVisible] = useState(false);

  const [modalType, setModalType] = useState("add");
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(30);
  const [last_page, setLast_page] = useState(1);
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);
  const { students, loading, refreshStudents, studentsStatistics } =
    useSelector((state) => state.students);

  const finance = [
    "Есть долг",
    "Есть скидки",
    "Без долгов",
    "Позитивный баланс",
    "Оплатил в текущем месяце",
  ];

  // students static data
  let dataSource = [];
  students?.data?.map((item) => {
    dataSource?.push({
      id: item?.id,
      uid: uuidv4(),
      firstName: item?.first_name,
      lastName: item?.last_name,
      name: (
        <Link
          to={`/students/profile/${item?.id}`}
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
      balance: Number(item?.balance).toLocaleString(),
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
      title: "Баланс",
      dataIndex: "balance",
      fixed: "top",
    },
    {
      key: "6",
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
        dispatch(fetchedStudents(res?.data?.data));
        setPerPage(res?.data?.data?.per_page);
        setLast_page(res?.data?.data?.last_page);
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [refreshStudents, currentPage]);

  // fetching courses
  useEffect(() => {
    dispatch(fetchingCourses());
    axios.get(`/api/courses`).then((res) => {
      dispatch(fetchedCourses(res?.data?.data));
    });
  }, []);

  // fetching students statistics
  useEffect(() => {
    dispatch(fetchingStudentsStatistics());
    axios
      .get("/api/students/statistics")
      .then((res) => {
        dispatch(fetchedStudentsStatistics(res?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [refreshStudents]);
  return (
    <div>
      <HeaderWrapper display="grid">
        <HeaderItem type="secondary">
          <div className="header__icon">
            <Mortarboard />
          </div>
          <div className="header__content">
            <p className="header__title">Студенты</p>
            <p>Количество: </p>
            <p className="header__result"> {studentsStatistics?.students}</p>
          </div>
          <MyHeaderButton
            setModalType={() => setModalType("add")}
            setVisible={() => setVisible(!visible)}
          />
        </HeaderItem>
        <HeaderItem
          type={`${
            studentsStatistics?.debtStudents > 0 ? "danger" : "secondary"
          }`}
        >
          <div className="header__icon">
            <Mortarboard />
          </div>
          <div className="header__content">
            <p className="header__title">Должники</p>
            <p>Количество: </p>
            <p className="header__result">
              {" "}
              {studentsStatistics?.debtStudents}
            </p>
          </div>
        </HeaderItem>
      </HeaderWrapper>
      {/* <div className="flex flex-wrap gap-2 mb-8">
        <div className="w-42">
          <Input.Search
            placeholder="Поиск по имени или телефону"
            onSearch={(value) => {
              setSearchText(value);
            }}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            allowclear
            className="min-w-[200px] md:min-w-[250px] pr-8"
          />
        </div>
        <Select
          mode="multiple"
          maxTagCount={2}
          className="min-w-[200px]"
          placeholder="По курсам"
          allowclear
        >
          {courses?.map((course) => {
            return (
              <Select.Option key={course?.id} value={course?.name}>
                {course?.name}
              </Select.Option>
            );
          })}
        </Select>
        <Select
          mode="multiple"
          placeholder="Финансовое ситуация"
          maxTagCount={2}
          allowclear
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
      </div> */}
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
