import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import { Table, Input, Pagination } from "antd";
import { ExclamationCircle, ExclamationDiamond } from "react-bootstrap-icons";
import { fetchedDebts, fetchingDebts } from "../../redux/paymentsSlice";
import axios from "../../axios/axios";
import {
  fetchedError,
  fetchedStudents,
  fetchedStudentsDebtors,
  fetchingStudents,
  setUserData,
} from "../../redux/studentsSlice";
import { HeaderItem, HeaderWrapper } from "../../UI/Header.style";

export default function Debtors() {
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(30);
  const [last_page, setLastPage] = useState(1);
  const [debtsAmountHandle, setDebtsAmountHandle] = useState("");
  const { studentsDebtors, loading } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  // fetching students
  useEffect(() => {
    dispatch(fetchingStudents());
    axios
      .get(`/api/students/debtors`)
      .then((res) => {
        dispatch(fetchedStudentsDebtors(res?.data?.data?.data?.students));
      })
      .catch(() => {
        dispatch(fetchedError());
      });
  }, [currentPage, dispatch]);

  // debtors static data
  let debtors = [];
  studentsDebtors?.map((item) => {
    debtors?.push({
      id: item?.id,
      phone: item?.phone,
      address: item?.address,
      birthday: item?.birthday,
      uid: uuidv4(),
      student_id: (
        <div>
          {studentsDebtors?.map((student) => {
            if (student?.id === item?.id) {
              return (
                <Link
                  key={student?.id}
                  className="text-cyan-500"
                  to={`/students/profile/${student?.id}`}
                  onClick={() => dispatch(setUserData(student))}
                >
                  {student?.first_name + " " + student?.last_name}
                </Link>
              );
            }
          })}
        </div>
      ),
      debt: Number(item?.balance).toLocaleString(),
    });
  });

  // fetching debts
  useEffect(() => {
    dispatch(fetchingDebts());
    axios.get(`/api/students/debtors`).then((res) => {
      dispatch(fetchedDebts(res?.data?.data?.data?.debt));
      setDebtsAmountHandle(res?.data?.data?.data?.debt);
    });
  }, [currentPage, dispatch]);

  // Table headers
  const columns = [
    {
      key: 1,
      title: "",
      dataIndex: "id",
      width: 80,
      fixed: "top",
    },
    {
      key: 2,
      title: "Имя",
      dataIndex: "student_id",
      fixed: "top",
    },
    {
      key: 3,
      title: "Телефон",
      dataIndex: "phone",
      fixed: "top",
    },
    {
      key: 4,
      title: "Адрес",
      dataIndex: "address",
      fixed: "top",
    },
    {
      key: 5,
      title: "Год рождения",
      dataIndex: "birthday",
      fixed: "top",
    },
    {
      key: 6,
      title: "Сумма",
      dataIndex: "debt",
      fixed: "top",
    },
  ];

  return (
    <div>
      <HeaderWrapper display="grid">
        <HeaderItem type="danger">
          <div className="header__icon">
            <ExclamationCircle />
          </div>
          <div className="header__content">
            <p className="header__title">Задолженность</p>
            <p>Общая сумма: </p>
            <p className="header__result">
              {Number(debtsAmountHandle)?.toLocaleString()} сум
            </p>
          </div>
        </HeaderItem>
        <HeaderItem type="secondary">
          <div className="header__icon">
            <ExclamationDiamond />
          </div>
          <div className="header__content">
            <p className="header__title xl:w-auto">Должники</p>
            <p>Общее количество должников:</p>
            <p className="header__result">{debtors?.length}</p>
          </div>
        </HeaderItem>
      </HeaderWrapper>
      <div className="flex flex-wrap gap-2 mb-8">
        <div className="w-42 mr-8">
          <Input.Search
            placeholder="По номеру телефона или имени"
            allowClear
            className="min-w-[200px] md:min-w-[250px]"
          />
        </div>
        <div className="w-42">
          <Input.Search
            placeholder="Поиск по сумме долга"
            allowClear
            className="min-w-[200px] md:min-w-[250px]"
          />
        </div>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={debtors}
        scroll={{
          x: 1000,
        }}
        rowKey={(record) => record.uid}
        pagination={false}
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
