import { useState } from "react";

import { Input, message, Spin, Select } from "antd";
import InputMask from "react-input-mask";

import axios from "../../axios/axios";
import { MyButton } from "../../UI/Button.style";
import { useDispatch } from "react-redux";
import { refreshExpensesData } from "../../redux/expensesSlice";

export default function AddexpenseForm() {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const url = "/api/expenses";
  const [expense, setExpense] = useState({
    name: "",
    payee: "",
    amount: "",
    expense_category_id: null,
    date: "",
  });
  const expenseCategories = [
    {
      id: 1,
      name: "Другое",
    },
    {
      id: 2,
      name: "Административные расходы",
    },
    {
      id: 3,
      name: "Аренда",
    },
    {
      id: 4,
      name: "Зарплаты",
    },
    {
      id: 5,
      name: "Маркетинг",
    },
    {
      id: 6,
      name: "Канцелярия",
    },
    {
      id: 7,
      name: "Хозяйственные расходы",
    },
    {
      id: 8,
      name: "Налоги",
    },
    {
      id: 9,
      name: "Инвестиции",
    },
    {
      id: 10,
      name: "Возврат средств",
    },
  ];
  function handle(e) {
    const newExpense = { ...expense };
    newExpense[e.target.id] = e.target.value;
    setExpense(newExpense);
  }

  function submit(e) {
    e.preventDefault();
    const { name, payee, amount, date, expense_category_id } = expense;
    if (name && payee && amount && date && expense_category_id) {
      setUploading(true);
      axios
        .post(url, {
          name: expense.name,
          payee: expense.payee,
          amount: expense.amount?.split(" ").join(""),
          expense_category_id: expense.expense_category_id,
          date: expense.date,
        })
        .then(() => {
          setExpense({
            name: "",
            payee: "",
            amount: "",
            expense_category_id: null,
            date: "",
          });
          message.success("Расход успешно добавлен!");
          dispatch(refreshExpensesData());
        })
        .catch(() => {
          message.error("Произошла ошибка! Попробуйте еще раз!");
        })
        .finally(() => {
          setUploading(false);
        });
    } else {
      message.error("Заполните все поля!");
    }
  }

  return (
    <div>
      <center className="text-xl mb-3 font-bold border-b">Новый расход</center>
      <form onSubmit={(e) => submit(e)}>
        <p>Описание </p>
        <Input
          required
          id="name"
          value={expense?.name}
          onChange={(e) => {
            handle(e);
          }}
          type="text"
          className="mb-4 mt-2"
        />
        <p>Дата</p>
        <input
          id="date"
          type="date"
          onChange={(e) => {
            handle(e);
          }}
          placeholder="mana"
          value={expense?.date}
          className="p-1 mb-4 mt-2 rounded-sm border border-slate-300 w-full"
        />
        <p>Категория </p>
        <Select
          type="mode"
          placeholder="Выбрать"
          className="w-full mb-4 mt-2"
          value={expense?.expense_category_id}
          onChange={(e) => {
            setExpense({ ...expense, expense_category_id: e });
          }}
        >
          {expenseCategories?.map((expenseCategory, index) => {
            return (
              <Select.Option value={expenseCategory?.id} key={index}>
                <li>{expenseCategory?.name}</li>
              </Select.Option>
            );
          })}
        </Select>
        <p>Получатель </p>
        <Input
          required
          id="payee"
          value={expense?.payee}
          onChange={(e) => {
            handle(e);
          }}
          type="text"
          className="mb-4 mt-2"
        />
        <p>Сумма</p>
        <InputMask
          mask="999 999 999"
          onChange={(e) => {
            setExpense({ ...expense, amount: e.target.value });
          }}
          value={expense?.amount}
          maskChar={null}
        >
          {(props) => (
            <Input {...props} required addonAfter="сум" className="mb-4 mt-2" />
          )}
        </InputMask>

        <Spin spinning={uploading}>
          <MyButton htmlType="submit" color="primary">
            Отправить
          </MyButton>
        </Spin>
      </form>
    </div>
  );
}
