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
  fetchedStudentsStatistics,
  fetchingStudentsStatistics,
} from "../../redux/studentsSlice";
import { HeaderItem, HeaderWrapper } from "../../UI/Header.style";
import moment from "moment";

export default function Debtors() {
  const prevDate = new Date();
  prevDate.setMonth(prevDate.getMonth() - 1);
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(30);
  const [last_page, setLastPage] = useState(1);
  const [debtsAmountHandle, setDebtsAmountHandle] = useState("");
  const { studentsDebtors, loading, studentsStatistics, refreshStudents } =
    useSelector((state) => state.students);
  const dispatch = useDispatch();

  const [from, setFrom] = useState(moment(prevDate).format("YYYY-MM-DD"));
  const [to, setTo] = useState(moment(new Date()).format("YYYY-MM-DD"));

  // fetching students
  useEffect(() => {
    axios
      .get(`/api/students/debtors?from=${from}&to=${to}`)
      .then((res) => {
        dispatch(fetchedStudentsDebtors(res?.data?.data?.data?.students));
      })
      .catch(() => {
        dispatch(fetchedError());
      });
  }, [currentPage, from, to]);

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
    axios.get(`/api/students/debtors?page=${currentPage}`).then((res) => {
      dispatch(fetchedDebts(res?.data?.data?.data?.debt));
      setDebtsAmountHandle(res?.data?.data?.data?.debt);
      setPerPage(res?.data?.data?.per_page);
      setLastPage(res?.data?.data?.last_page);
    });
  }, [refreshStudents, currentPage, from, to]);

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
            <p className="header__result">{studentsStatistics?.debtStudents}</p>
          </div>
        </HeaderItem>
      </HeaderWrapper>
      <div className="flex flex-wrap gap-2 mb-8">
        <div className="flex flex-col gap-1 justify-center">
          <label htmlFor="">Дата от</label>
          <input
            type="date"
            name=""
            id=""
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="rounded-md  border border-slate-300 p-2"
          />
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <label htmlFor="">Дата до</label>
          <input
            type="date"
            name=""
            id=""
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="rounded-md  border border-slate-300 p-2"
          />
        </div>
        {/* <div className="w-42 mr-8">
          <Input.Search
            placeholder="По номеру телефона или имени"
            allowclear
            className="min-w-[200px] md:min-w-[250px]"
          />
        </div>
        <div className="w-42">
          <Input.Search
            placeholder="Поиск по сумме долга"
            allowclear
            className="min-w-[200px] md:min-w-[250px]"
          />
        </div> */}
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
