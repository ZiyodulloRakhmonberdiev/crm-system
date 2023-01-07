import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import { Input, Pagination, Select, Table } from "antd";
import { Cash, Coin } from "react-bootstrap-icons";

import {
  fetchedStudents,
  fetchingStudents,
  setUserData,
} from "../../redux/studentsSlice";
import {
  fetchingPayments,
  fetchedPayments,
  fetchingPaymentsAmount,
  fetchedPaymentsAmount,
  fetchedProfitAmount,
  fetchedError,
} from "../../redux/paymentsSlice";
import axios from "../../axios/axios";
import {
  fetchedEmployees,
  fetchingEmployees,
  setEmployeesData,
} from "../../redux/employeesSlice";
import { fetchedGroups, fetchingGroups } from "../../redux/groupsSlice";
import { fetchedTeachers, fetchingTeachers } from "../../redux/teachersSlice";
import { MyButton } from "../../UI/Button.style";
import { HeaderItem, HeaderWrapper } from "../../UI/Header.style";

export default function Payments() {
  // states
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(30);
  const [last_page, setLastPage] = useState(1);
  const { payments, paymentsAmount, profitAmount, loading } = useSelector(
    (state) => state.payments
  );
  const { students } = useSelector((state) => state.students);
  const { employees } = useSelector((state) => state.employees);
  const { groups } = useSelector((state) => state.groups);
  const { teachers } = useSelector((state) => state.teachers);
  const { refreshExpenses } = useSelector((state) => state.expenses);
  const paymentMethods = [
    "Наличные",
    "Картой",
    "Click",
    "Payme",
    "Банк. перевод",
  ];
  // hooks
  const dispatch = useDispatch();

  // payments static data
  let paymentDataSource = [];
  payments?.map((item) => {
    paymentDataSource?.push({
      id: item?.id,
      uid: uuidv4(),
      student_id: (
        <div>
          {students?.data?.map((student) => {
            if (student?.id === item?.student?.id) {
              return (
                <Link
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
      group_id: item?.group_id,
      amount: Number(item?.amount).toLocaleString(),
      payment_type: item?.payment_type,
      date: item?.date,
      description: item?.description,
      employee_id: (
        <div>
          {employees?.map((employee) => {
            if (employee?.id === item?.employee?.id) {
              return (
                <Link
                  className="text-cyan-500"
                  to={`/employees/profile/${employee?.id}`}
                  onClick={() => dispatch(setEmployeesData(employee))}
                >
                  {employee?.name}
                </Link>
              );
            }
          })}
        </div>
      ),
    });
  });

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
      title: "Дата",
      dataIndex: "date",
      width: 140,
      fixed: "top",
    },
    {
      key: 3,
      title: "Имя",
      dataIndex: "student_id",
      fixed: "top",
    },
    {
      key: 4,
      title: "Сумма",
      dataIndex: "amount",
      fixed: "top",
    },
    {
      key: 5,
      title: "Метод оплаты",
      dataIndex: "payment_type",
      fixed: "top",
    },
    {
      key: 6,
      title: "Коммментарий",
      dataIndex: "description",
      fixed: "top",
    },
    {
      key: 7,
      title: "Сотрудник",
      dataIndex: "employee_id",
      fixed: "top",
    },
  ];

  // fetching all payments
  useEffect(() => {
    dispatch(fetchingPayments());
    axios
      .get(`/api/payments?from=2022-12-01&to=2022-12-30?page=${currentPage}`)
      .then((res) => {
        dispatch(fetchedPayments(res?.data?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [currentPage, dispatch]);

  // fetching all payments amount
  useEffect(() => {
    dispatch(fetchingPaymentsAmount());
    axios
      .get(`/api/payments/amount?from=2022-12-01&to=2023-12-30`)
      .then((res) => {
        dispatch(fetchedPaymentsAmount(res?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [currentPage, dispatch]);

  // fetching profit amount
  useEffect(() => {
    axios
      .get(`/api/payments/profit?from=2022-12-01&to=2023-12-30`)
      .then((res) => {
        dispatch(fetchedProfitAmount(res?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [refreshExpenses, currentPage, dispatch]);

  // fetching students
  useEffect(() => {
    dispatch(fetchingStudents());
    axios
      .get(`/api/students`)
      .then((res) => {
        dispatch(fetchedStudents(res?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [currentPage, dispatch]);

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
  }, [currentPage, dispatch]);

  // fetching groups
  useEffect(() => {
    dispatch(fetchingGroups());
    axios
      .get(`/api/groups?page=${currentPage}`)
      .then((res) => {
        dispatch(fetchedGroups(res?.data?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [currentPage, dispatch]);

  // fetching teachers
  useEffect(() => {
    dispatch(fetchingTeachers());
    axios.get(`/api/teachers`).then((res) => {
      dispatch(fetchedTeachers(res?.data?.data?.data));
    });
  }, [currentPage, dispatch]);

  return (
    <div>
      <HeaderWrapper display="grid">
        <HeaderItem type="secondary">
          <div className="header__icon">
            <Coin />
          </div>
          <div className="header__content">
            <p className="header__title">Все платежи</p>
            <p>Всего платежей:</p>
            <p className="header__result">
              {Number(paymentsAmount?.amount)?.toLocaleString()} сум
            </p>
          </div>
        </HeaderItem>
        <HeaderItem
          type={`${profitAmount?.amount >= 0 ? "secondary" : "danger"}`}
        >
          <div className="header__icon">
            <Cash />
          </div>
          <div className="header__content">
            <p className="header__title">Прибыль</p>
            <p>Чистая прибыль:</p>
            <p className="header__result">
              {Number(profitAmount?.amount)?.toLocaleString()} сум
            </p>
          </div>
        </HeaderItem>
      </HeaderWrapper>
      <div className="flex gap-2 flex-col sm:flex-row flex-wrap mb-4">
        <div className="flex flex-col gap-1 justify-center">
          <label htmlFor="">Дата от</label>
          <input
            type="date"
            name=""
            id=""
            className="rounded-md p-1 border border-slate-300 py-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <label htmlFor="">Дата до</label>
          <input
            type="date"
            name=""
            id=""
            className="rounded-md p-1 border border-slate-300 py-2"
          />
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <label htmlFor="">Имя или телефон</label>
          <Input
            placeholder="Имя или телефон"
            className="sm:max-w-[130px]"
            allowClear
          />
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <label htmlFor="">Выбрать группу</label>
          <Select
            mode="multiple"
            maxTagCount={1}
            placeholder="Выбрать"
            allowClear
            className="min-w-[130px]"
          >
            {groups?.map((group) => (
              <Select.Option key={group?.id}>
                <button>{group?.name}</button>
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <label htmlFor="">Учитель</label>
          <Select
            mode="multiple"
            maxTagCount={1}
            placeholder="Выбрать"
            allowClear
            className="min-w-[130px]"
          >
            {teachers?.data?.map((teacher) => {
              return (
                <Select.Option key={teacher?.id}>
                  <button>{teacher?.name}</button>
                </Select.Option>
              );
            })}
          </Select>
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <label htmlFor="">Метод оплаты</label>
          <Select
            mode="multiple"
            maxTagCount={1}
            placeholder="Выбрать"
            allowClear
            className="min-w-[130px]"
          >
            {paymentMethods?.map((paymentMethod, index) => {
              return (
                <Select.Option key={index}>
                  <button>{paymentMethod}</button>
                </Select.Option>
              );
            })}
          </Select>
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <label htmlFor="">Сумма</label>
          <Input placeholder="Сумма" className="sm:max-w-[130px]" allowClear />
        </div>
        <div className="mt-4 sm:mt-auto">
          <MyButton>Фильтровать</MyButton>
        </div>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={paymentDataSource}
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
