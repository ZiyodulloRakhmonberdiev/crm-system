import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import { Input, Modal, Pagination, Select, Table } from "antd";
import { Coin, Trash } from "react-bootstrap-icons";

import {
  fetchingExpenses,
  fetchedExpenses,
  fetchedError,
  fetchedExpensesAmount,
} from "../../redux/expensesSlice";
import axios from "../../axios/axios";
import {
  fetchedEmployees,
  fetchingEmployees,
} from "../../redux/employeesSlice";
import { MyButton } from "../../UI/Button.style";
import AddExpensesForm from "./AddExpensesForm";
import { IconButton } from "../../UI/IconButton.style";

export default function Expenses() {
  // states
  const [expensesAmount, setExpensesAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(30);
  const [last_page] = useState(1);
  const { refreshExpenses, expenses, loading } = useSelector(
    (state) => state.expenses
  );
  const expenseCategories = [
    "Другое",
    "Административные расходы",
    "Аренда",
    "Зарплаты",
    "Маркетинг",
    "Канцелярия",
    "Хозяйственные расходы",
    "Налоги",
    "Инвестиции",
    "Возврат средств",
  ];
  // hooks
  const dispatch = useDispatch();

  // payments static data
  let expensesDataSource = [];
  expenses?.map((item) => {
    expensesDataSource?.push({
      id: item?.id,
      uid: uuidv4(),
      expense_category: item?.expense_category?.name,
      name: item?.name,
      amount: Number(item?.amount).toLocaleString(),
      payee: item?.payee,
      date: item?.date,
      created_at: item?.created_at,
      actions: (
        <IconButton
          color="dangerOutlined"
          onClick={() => {
            onDeleteExpense(item);
          }}
        >
          <Trash />
        </IconButton>
      ),
    });
  });

  // Table headers
  const columns = [
    {
      key: 1,
      title: "",
      dataIndex: "id",
      width: 60,
      fixed: "top",
    },
    {
      key: 2,
      title: "Сумма",
      dataIndex: "amount",
      width: 100,
      fixed: "top",
    },
    {
      key: 3,
      title: "Описание",
      dataIndex: "name",
      fixed: "top",
      width: 120,
    },
    {
      key: 4,
      title: "Категория",
      dataIndex: "expense_category",
      fixed: "top",
      width: 120,
    },
    {
      key: 5,
      title: "Получатель",
      dataIndex: "payee",
      fixed: "top",
      width: 120,
    },
    {
      key: 6,
      title: "Создано",
      dataIndex: "created_at",
      fixed: "top",
      width: 120,
    },
    {
      key: 7,
      title: "Действия",
      dataIndex: "actions",
      fixed: "top",
      width: 80,
    },
  ];

  // fetching all expenses
  useEffect(() => {
    dispatch(fetchingExpenses());
    axios
      .get(`/api/expenses?from=2022-12-01&to=2022-12-30?page=${currentPage}`)
      .then((res) => {
        dispatch(fetchedExpenses(res?.data?.data?.data));
        let total = 0;
        for (let i = 0; i < expenses.length; i++) {
          total = total + expenses[i].amount;
          setExpensesAmount(total);
        }
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [refreshExpenses, currentPage, dispatch]);

  // fetching all expenses amount
  // useEffect(() => {
  //   dispatch(fetchingExpensesAmount());
  //   axios
  //     .get(`/api/expenses/amount?from=2022-12-01&to=2022-12-30`)
  //     .then((res) => {
  //       dispatch(fetchedExpensesAmount(res?.data?.data));
  //     })
  //     .catch((err) => {
  //       dispatch(fetchedError());
  //     });
  // }, [currentPage, dispatch]);

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

  const onDeleteExpense = (record) => {
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
  return (
    <div>
      <div className="lg:flex lg:gap-6">
        <div className="lg:w-3/4">
          <header className="bg-white flex flex-wrap p-4 rounded-lg items-center justify-center sm:justify-between md:justify-start gap-4 mb-8">
            <div className="text-2xl text-blue-400 bg-blue-50 p-2 rounded-md">
              <Coin />
            </div>
            <div className="md:flex md:gap-4 items-center">
              <p className="text-blue-400 text-2xl">Учет расходов</p>
              <p className="text-blue-400">
                Суммарные расходы:{"  "}
                <span className="text-xl">
                  {Number(expensesAmount)?.toLocaleString()}
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
              <label htmlFor="">Описание</label>
              <Input className="max-w-[130px]" allowClear />
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <label htmlFor="">Выбрать категорию</label>
              <Select
                mode="multiple"
                maxTagCount={1}
                placeholder="Выбрать"
                allowClear
                className="min-w-[130px]"
              >
                {expenseCategories?.map((expenseCategory, index) => {
                  return (
                    <Select.Option key={index}>
                      <button>{expenseCategory}</button>
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <label htmlFor="">Сумма</label>
              <Input className="max-w-[130px]" allowClear />
            </div>
            <div className="mt-auto">
              <MyButton>Фильтровать</MyButton>
            </div>
          </div>
          <Table
            loading={loading}
            columns={columns}
            dataSource={expensesDataSource}
            scroll={{
              x: 800,
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
        <div className="lg:w-1/4 bg-white p-4 rounded-md">
          <AddExpensesForm />
        </div>
      </div>
    </div>
  );
}
