import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input, message, Spin, Select, Radio } from "antd";
import InputMask from "react-input-mask";

import axios from "../../axios/axios";
import { MyButton } from "../../UI/Button.style";
import {
  fetchedStudentJoinedGroups,
  fetchedStudents,
  fetchingStudentJoinedGroups,
  fetchingStudents,
} from "../../redux/studentsSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function AddPaymentForm({ visible, setVisiblePayment }) {
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = "/api/payments";
  const { students, studentJoinedGroups, loadingJoinedGroups } = useSelector(
    (state) => state.students
  );
  const location = useLocation();
  const params = useParams();
  const [payment, setPayment] = useState({
    student_id: "",
    group_id: "",
    amount: "",
    payment_type: "",
    date: "",
    description: "",
  });
  useEffect(() => {
    setPayment({
      student_id: location?.pathname?.includes("/students/profile")
        ? +params?.id
        : "",
      group_id: "",
      amount: "",
      payment_type: "",
      date: "",
      description: "Курс оплачен",
    });
  }, [visible]);

  // fetching students
  useEffect(() => {
    dispatch(fetchingStudents());
    axios.get(`/api/students`).then((res) => {
      dispatch(fetchedStudents(res?.data?.data));
    });
  }, []);

  // fetching students joined groups
  useEffect(() => {
    payment?.student_id && dispatch(fetchingStudentJoinedGroups());
    payment?.student_id &&
      axios.get(`/api/students/${payment?.student_id}/groups`).then((res) => {
        dispatch(fetchedStudentJoinedGroups(res?.data));
      });
  }, [payment?.student_id]);

  function handle(e) {
    const newPayment = { ...payment };
    newPayment[e.target.id] = e.target.value;
    setPayment(newPayment);
  }

  function submit(e) {
    e.preventDefault();
    const { student_id, group_id, amount, date, payment_type, description } =
      payment;
    if (
      student_id &&
      group_id &&
      amount &&
      date &&
      payment_type &&
      description
    ) {
      setUploading(true);
      axios
        .post(url, {
          student_id: payment.student_id,
          group_id: payment.group_id,
          amount: payment.amount?.split(" ").join(""),
          payment_type: payment.payment_type,
          date: payment.date,
          description: payment.description,
        })
        .then((res) => {
          setPayment({
            student_id: "",
            group_id: "",
            amount: "",
            payment_type: "",
            date: "",
            description: "",
          });
          message.success("Платеж успешно добавлен!");
          setVisiblePayment();
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
          message.error("Произошла ошибка! Попробуйте еще раз!");
        })
        .finally(() => setUploading(false));
    } else {
      message.error("Заполните все поля!");
    }
  }

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <p>Студент</p>
        <Select
          value={payment?.student_id}
          onChange={(e) => {
            setPayment({ ...payment, student_id: e });
          }}
          placeholder="Выбрать студента"
          className="w-full mb-4 mt-2"
          showSearch={true}
        >
          {students?.data?.map((student, index) => {
            return (
              <Select.Option value={student?.id} key={index}>
                {student?.first_name} {student?.last_name}
              </Select.Option>
            );
          })}
        </Select>
        <p>Группа</p>
        <Spin spinning={loadingJoinedGroups}>
          <Select
            disabled={!payment?.student_id}
            value={payment?.group_id}
            onChange={(e) => {
              setPayment({ ...payment, group_id: e });
            }}
            placeholder="Выбрать группу"
            className="w-full mb-4 mt-2"
            showSearch={true}
          >
            {studentJoinedGroups?.data?.map((group, index) => {
              return (
                <Select.Option value={group?.id} key={index}>
                  {group?.name}
                </Select.Option>
              );
            })}
          </Select>
        </Spin>
        <p>Сумма</p>
        <Input
          onChange={(e) => {
            setPayment({ ...payment, amount: e.target.value });
          }}
          value={payment?.amount}
          required
          addonAfter="сум"
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
          value={payment?.date}
          className="p-1 mb-4 mt-2 rounded-sm border border-slate-300"
        />
        <p>Метод оплаты</p>
        <Radio.Group value={payment?.payment_type} className="mb-4 mt-2">
          <Radio
            checked={payment?.payment_type === "cash"}
            value="cash"
            id="payment_type"
            name="payment_type"
            onChange={(e) => {
              handle(e);
            }}
          >
            Наличные
          </Radio>
          <Radio
            checked={payment?.payment_type === "card"}
            value="card"
            id="payment_type"
            name="payment_type"
            onChange={(e) => {
              handle(e);
            }}
          >
            Картой
          </Radio>
          <Radio
            checked={payment?.payment_type === "click"}
            value="click"
            id="payment_type"
            name="payment_type"
            onChange={(e) => {
              handle(e);
            }}
          >
            Click
          </Radio>
          <Radio
            checked={payment?.payment_type === "payme"}
            value="payme"
            id="payment_type"
            name="payment_type"
            onChange={(e) => {
              handle(e);
            }}
          >
            Payme
          </Radio>
          <Radio
            checked={payment?.payment_type === "bank"}
            value="bank"
            id="payment_type"
            name="payment_type"
            onChange={(e) => {
              handle(e);
            }}
          >
            Банк перевод
          </Radio>
        </Radio.Group>
        <p>Коментарий</p>
        <Input.TextArea
          onChange={(e) => {
            handle(e);
          }}
          value={payment?.description}
          id="description"
          rows={4}
          className="mb-4 mt-2"
          required
        />
        <Spin spinning={uploading}>
          <MyButton htmlType="submit" color="primary">
            Отправить
          </MyButton>
        </Spin>
      </form>
    </div>
  );
}
