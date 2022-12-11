import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import { Input, Pagination, Select, Table } from "antd";
import { Coin } from "react-bootstrap-icons";

import {
  fetchedStudents,
  fetchingStudents,
  setUserData,
} from "../../redux/studentsSlice";
import {
  fetchedAllPayments,
  fetchedAllPaymentsAmount,
  fetchedError,
  fetchingAllPayments,
  fetchingAllPaymentsAmount,
} from "../../redux/financesSlice";
import axios from "../../axios/axios";
import {
  fetchedEmployees,
  fetchingEmployees,
  setEmployeesData,
} from "../../redux/employeesSlice";
import { fetchedGroups, fetchingGroups } from "../../redux/groupsSlice";
import { fetchedTeachers, fetchingTeachers } from "../../redux/teachersSlice";
import { MyButton } from "../../UI/Button.style";

export default function AllPayments() {
  // states
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(30);
  const [last_page, setLastPage] = useState(1);
  const { allPayments, allPaymentsAmount, loading } = useSelector(
    (state) => state.finances
  );
  const { students } = useSelector((state) => state.students);
  const { employees } = useSelector((state) => state.employees);
  const { groups } = useSelector((state) => state.groups);
  const { teachers } = useSelector((state) => state.teachers);
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
  allPayments?.map((item) => {
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
    dispatch(fetchingAllPayments());
    axios
      .get(`/api/payments?from=2022-12-01&to=2022-12-30?page=${currentPage}`)
      .then((res) => {
        dispatch(fetchedAllPayments(res?.data?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [currentPage, dispatch]);

  // fetching all payments amount
  useEffect(() => {
    dispatch(fetchingAllPaymentsAmount());
    axios
      .get(`/api/payments/amount?from=2022-12-01&to=2022-12-30`)
      .then((res) => {
        dispatch(fetchedAllPaymentsAmount(res?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [currentPage, dispatch]);

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
      console.log(res?.data?.data?.data);
    });
  }, [currentPage, dispatch]);

  return (
    <div>
      <header className="bg-white flex flex-wrap p-4 rounded-lg items-center justify-center sm:justify-between md:justify-start gap-4 mb-8">
        <div className="text-2xl text-blue-400 bg-blue-50 p-2 rounded-md">
          <Coin />
        </div>
        <div className="md:flex md:gap-4 items-center">
          <p className="text-blue-400 text-2xl">Все платежи</p>
          <p className="text-blue-400">
            Всего платежей:{" "}
            <span className="text-xl">
              {Number(allPaymentsAmount?.amount)?.toLocaleString()}
            </span>{" "}
            сум
          </p>
        </div>
      </header>
      <div className="sm:flex flex-wrap gap-4 mb-4">
        <div className="flex flex-col gap-1 justify-center">
          <label htmlFor="">Дата от</label>
          <input
            type="date"
            name=""
            id=""
            className="rounded-md p-1 border border-slate-300 py-2"
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
            className="max-w-[130px]"
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
            {teachers?.map((teacher) => {
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
                <Select.Option key={index} value={paymentMethod}>
                  <button>{paymentMethod}</button>
                </Select.Option>
              );
            })}
          </Select>
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <label htmlFor="">Сумма</label>
          <Input placeholder="Сумма" className="max-w-[130px]" allowClear />
        </div>
        <div className="mt-auto">
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
