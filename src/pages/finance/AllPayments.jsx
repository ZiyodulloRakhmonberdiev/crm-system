import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import { Table } from "antd";
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

export default function AllPayments() {
  // states
  const { allPayments, allPaymentsAmount, loading } = useSelector(
    (state) => state.finances
  );
  const { students } = useSelector((state) => state.students);
  const { employees } = useSelector((state) => state.employees);

  // hooks
  const dispatch = useDispatch();

  // payments static data
  let paymentDataSource = [];
  allPayments?.data?.map((item) => {
    paymentDataSource?.push({
      id: item?.id,
      uid: uuidv4(),
      student_id: (
        <div>
          {students?.data?.map((student) => {
            if (student?.id === item?.student_id) {
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
            console.log(employee);
            if (employee?.id === item?.employee_id) {
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
      .get(`/api/payments?from=2022-11-01&to=2022-11-30`)
      .then((res) => {
        dispatch(fetchedAllPayments(res?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, []);

  // fetching all payments amount
  useEffect(() => {
    dispatch(fetchingAllPaymentsAmount());
    axios
      .get(`/api/payments/amount?from=2022-11-01&to=2022-11-30`)
      .then((res) => {
        dispatch(fetchedAllPaymentsAmount(res?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, []);

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
  }, []);

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
  }, []);
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
      <div className="flex gap-2"></div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={paymentDataSource}
        scroll={{
          x: 1000,
        }}
        rowKey={(record) => record.uid}
        pagination={{
          position: ["bottomCenter"],
        }}
      ></Table>
    </div>
  );
}
