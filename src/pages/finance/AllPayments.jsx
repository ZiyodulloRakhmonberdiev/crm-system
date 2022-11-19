import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import { Table } from "antd";
import { Coin } from "react-bootstrap-icons";

import { setUserData } from "../../redux/studentsSlice";
import {
  fetchedAllPayments,
  fetchedError,
  fetchingAllPayments,
} from "../../redux/financesSlice";
import axios from "../../axios/axios";

export default function AllPayments() {
  // states
  const { allPayments, loading, error } = useSelector(
    (state) => state.finances
  );

  // hooks
  const dispatch = useDispatch();

  // payments static data
  let paymentDataSource = [];
  allPayments?.data?.map((item) => {
    paymentDataSource?.push({
      id: item?.id,
      uid: uuidv4(),
      student_id: (
        <Link
          to={`/employees/profile/${item?.id}`}
          onClick={() => dispatch(setUserData(item))}
        >
          {item?.student_id}
        </Link>
      ),
      group_id: item?.group_id,
      amount: item?.amount,
      payment_type: item?.payment_type,
      date: item?.date,
      description: item?.description,
      employee_id: item?.employee_id,
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
  return (
    <div>
      <header className="bg-white flex flex-wrap p-4 rounded-lg items-center justify-center sm:justify-between md:justify-start gap-4 mb-8">
        <div className="text-2xl text-blue-400 bg-blue-50 p-2 rounded-md">
          <Coin />
        </div>
        <div className="md:flex md:gap-4 items-center">
          <p className="text-blue-400 text-2xl">Все платежи</p>
          <p className="text-blue-400">Всего платежей: </p>
        </div>
      </header>
      <div className="flex gap-2"></div>
      <Table
        loading={loading}
        className="mt-6"
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
