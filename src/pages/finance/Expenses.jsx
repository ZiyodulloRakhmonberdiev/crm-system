import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import { Input, Modal, Pagination, Select, Table } from "antd";
import { Coin, Trash } from "react-bootstrap-icons";

import {
  fetchingExpenses,
  fetchedExpenses,
  fetchedError,
} from "../../redux/expensesSlice";
import axios from "../../axios/axios";
import {
  fetchedEmployees,
  fetchingEmployees,
} from "../../redux/employeesSlice";
import { MyButton } from "../../UI/Button.style";
import AddExpensesForm from "./AddExpensesForm";
import { IconButton } from "../../UI/IconButton.style";
import { HeaderItem, HeaderWrapper } from "../../UI/Header.style";
import moment from "moment";

export default function Expenses() {
  const prevDate = new Date();
  prevDate.setMonth(prevDate.getMonth() - 1);
  // states
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(30);
  const [last_page] = useState(1);
  const { refreshExpenses, expenses, loading } = useSelector(
    (state) => state.expenses
  );
  const [from, setFrom] = useState(moment(prevDate).format("YYYY-MM-DD"));
  const [to, setTo] = useState(moment(new Date()).format("YYYY-MM-DD"));

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
      .get(`/api/expenses?from=${from}&to=${to}?page=${currentPage}`)
      .then((res) => {
        dispatch(fetchedExpenses(res?.data?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [refreshExpenses, currentPage, dispatch, from, to]);

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
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="lg:col-span-2 xl:col-span-3">
          <HeaderWrapper>
            <HeaderItem type="danger">
              <div className="header__icon">
                <Coin />
              </div>
              <div className="header__content">
                <p className="header__title">Учет расходов</p>
                <p>Общая сумма: </p>
                <p className="header__result">0</p>
              </div>
            </HeaderItem>
          </HeaderWrapper>
          <div className="flex gap-2 flex-col sm:flex-row flex-wrap mb-4">
            <div className="flex flex-col gap-1 justify-center">
              <label htmlFor="">Дата от</label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="rounded-md  border border-slate-300 p-2"
              />
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <label htmlFor="">Дата до</label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="rounded-md  border border-slate-300 p-2"
              />
            </div>
            {/* <div className="flex flex-col gap-1 justify-center">
              <label htmlFor="">Описание</label>
              <Input className="sm:max-w-[130px]" allowClear />
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
                      <button>{expenseCategory?.name}</button>
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <label htmlFor="">Сумма</label>
              <Input className="sm:max-w-[130px]" allowClear />
            </div>
            <div className="mt-4 sm:mt-auto">
              <MyButton>Фильтровать</MyButton>
            </div> */}
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
        <div className="lg:col-span-1 bg-white p-4 rounded-md h-full pb-12">
          <AddExpensesForm />
        </div>
      </div>
    </div>
  );
}
