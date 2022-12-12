import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Tabs,
  Table,
  Modal,
  Select,
  DatePicker,
  message,
  Spin,
  Drawer,
} from "antd";
import {
  CashStack,
  Envelope,
  Flag,
  TelephoneFill,
  Trash,
} from "react-bootstrap-icons";

import { EditOutlined, TeamOutlined } from "@ant-design/icons";
import { IconButton } from "../../UI/IconButton.style";
import {
  fetchedGroups,
  fetchingGroups,
  setGroupData,
} from "../../redux/groupsSlice";
import axios from "../../axios/axios";
import { MyButton } from "../../UI/Button.style";
import {
  changeUpdateUserData,
  setUserGroupData,
} from "../../redux/studentsSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddStudentForm from "./AddStudentForm";
import AddPaymentForm from "../finance/AddPaymentForm";

export default function StudentProfile() {
  // states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visiblePayment, setVisiblePayment] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [studentGroups, setStudentGroups] = useState([]);
  const { userData, userGroupData, refreshStudentsData } = useSelector(
    (state) => state.students
  );
  const { groups } = useSelector((state) => state.groups);
  const [group, setGroup] = useState({
    group_id: "",
    start_date: "",
    student_id: userData?.id,
  });

  // hooks
  const params = useParams();
  const dispatch = useDispatch();

  const url = "/api/groups/add-student";
  const columns = [
    {
      key: "1",
      title: "Дата",
      dataIndex: "id",
      fixed: "top",
    },
    {
      key: "2",
      title: "Сумма",
      dataIndex: "name",
      fixed: "top",
    },
    {
      key: "3",
      title: "Комментарий",
      dataIndex: "comment",
      fixed: "top",
    },
    {
      key: "4",
      title: "Сотрудник",
      dataIndex: "employee",
      fixed: "top",
    },
  ];

  // fetching groups for join function
  useEffect(() => {
    dispatch(fetchingGroups());
    axios.get(`/api/groups`).then((res) => {
      dispatch(fetchedGroups(res?.data?.data?.data));
    });
  }, []);

  // fetching students joined groups
  useEffect(() => {
    axios.get(`/api/students/${params?.id}/groups`).then((res) => {
      setStudentGroups(res?.data);
    });
  }, []);

  function submit(e) {
    e.preventDefault();
    const { group_id, start_date } = group;
    if (group_id && start_date) {
      setUploading(true);
      axios
        .post(url, {
          group_id: group.group_id,
          student_id: params.id,
          start_date: group.start_date,
        })
        .then((res) => {
          setGroup({
            group_id: "",
            start_date: "",
          });
          message.success("Пользователь успешно добавлен!");
          dispatch(refreshStudentsData());
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.data?.message === "student id already exists") {
            message.error("Этот пользователь уже есть в этой группе!");
          } else {
            message.error("Произошла ошибка! Попробуйте еще раз!");
          }
        })
        .finally(() => setUploading(false));
    } else {
      message.error("Заполните все поля!");
    }
  }

  // handle modal  "Join to group"
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // editing student
  const onEditStudent = (student) => {
    setModalType("update");
    setVisible(true);
    setEditingStudent({ ...student });
  };
  const compareDate = (d1, d2) => {
    let now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    let today = now.getFullYear() + "-" + month + "-" + day;

    let date1 = new Date(d1).getTime();
    let date2 = new Date(today).getTime();
    let date3 = new Date(d2).getTime();

    if (date1 >= date2 + 100000000 || date1 < date3) return true;
  };
  // update user data after refreshing or editing
  const changeUpdateUserDataFunc = (data) => {
    dispatch(changeUpdateUserData(data));
  };

  return (
    <div className="grid grid-cols-6 gap-8">
      <div className="col-span-6 md:col-span-3 lg:col-span-2">
        <p className="text-xl mb-4">
          {userData?.first_name} {userData?.last_name}
        </p>
        <div className="rounded-sm bg-white px-6 py-8 drop-shadow-md">
          <div className="grid mb-2 md:mb-4">
            <label className="text-xl mb-2">
              {userData?.first_name} {userData?.last_name}
            </label>
            <p className="text-slate-400 text-xs">(id: {userData?.id})</p>
          </div>
          <div className="grid mb-2 md:mb-4">
            <label className="mb-2">Баланс</label>
            <p className="text-red-400">{userData?.balance} сум</p>
          </div>
          <div className="grid mb-2 md:mb-4">
            <label className="mb-2">Контактные данные</label>
            <div>
              <p className="text-xs mb-1">Телефон:</p>
              <span className="text-xs border border-green-400 rounded-sm p-1 flex items-center justify-center gap-1 w-36">
                <TelephoneFill className="text-green-400" />
                {userData?.phone}
              </span>
            </div>
          </div>
          <div className="grid mb-2 md:mb-4 ">
            <label className="mb-2">Дополнительные:</label>
            {userData?.addition_phone?.map((item) => (
              <div key={item?.id} className="grid grid-cols-2">
                <p className="text-slate-400">{item?.label}</p>
                <span className="text-xs flex items-center justify-start gap-1 text-slate-400">
                  <TelephoneFill className="text-green-400" />{" "}
                  <span>{item?.phone}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-row flex-wrap gap-3">
            <IconButton
              color="success"
              onClick={() => {
                onEditStudent(userData);
              }}
            >
              <EditOutlined />
            </IconButton>
            <IconButton color="primary">
              <Envelope />
            </IconButton>
            <IconButton
              color="success"
              onClick={() => setVisiblePayment(!visiblePayment)}
            >
              <CashStack />
            </IconButton>
            <IconButton color="primary" onClick={showModal}>
              <TeamOutlined />
            </IconButton>
            <IconButton color="success">
              <Flag />
            </IconButton>
            <IconButton color="danger">
              <Trash />
            </IconButton>
          </div>
        </div>
      </div>
      <Drawer
        open={visible}
        title={modalType === "add" ? "Добавить пользователя" : "Редактировать"}
        onClose={() => {
          setVisible(!visible);
        }}
        maskClosable={true}
      >
        <AddStudentForm
          changeUpdateUserDataFunc={changeUpdateUserDataFunc}
          modalType={modalType}
          editingStudent={editingStudent}
          visible={visible}
          setVisible={() => setVisible(false)}
        />
      </Drawer>
      <Drawer
        open={visiblePayment}
        title={"Добавить оплату"}
        onClose={() => {
          setVisiblePayment(!visiblePayment);
        }}
        maskClosable={true}
      >
        <AddPaymentForm
          visible={visiblePayment}
          editingStudent={editingStudent}
          setVisiblePayment={() => setVisiblePayment(false)}
        />
      </Drawer>
      <Modal
        title="Добавить пользователя"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Select
          value={group?.group_id}
          onChange={(e) => {
            setGroup({ ...group, group_id: e });
          }}
          placeholder="Выберите группу"
          className="w-full mb-1"
          showSearch={true}
        >
          {groups?.map((item, index) => {
            return (
              <Select.Option value={item?.id} key={index}>
                <button
                  onClick={() => {
                    dispatch(setUserGroupData(item));
                  }}
                >
                  {item?.name}
                </button>
              </Select.Option>
            );
          })}
        </Select>
        <div>
          {group?.group_id && (
            <p className="mb-4 text-xs">
              Дата старта группы {userGroupData?.group_start_date}
            </p>
          )}
        </div>
        <div className="w-full mb-4">
          {group?.group_id && (
            <div>
              <p className="text-xs mb-1">Дата от</p>
              <DatePicker
                className="w-full"
                onChange={(date, dateString) => {
                  setGroup({ ...group, start_date: dateString });
                }}
                disabledDate={(currentDate) =>
                  compareDate(
                    currentDate.toDate(),
                    userGroupData?.group_start_date
                  )
                }
              />
            </div>
          )}
        </div>
        <Spin spinning={uploading}>
          <MyButton htmlType="submit" color="primary" onClick={submit}>
            Добавить
          </MyButton>
        </Spin>
      </Modal>
      <Tabs className="col-span-6 md:col-span-3 lg:col-span-4">
        <Tabs.TabPane tab="Профиль" key="item-1">
          <label className="text-lg block w-full mb-2">Группы</label>
          <div className="grid lg:grid-cols-2 gap-2 mb-4">
            {studentGroups?.data?.map((group) => (
              <div
                className="flex justify-between flex-col sm:flex-row gap-2 p-4 bg-white drop-shadow-md rounded-sm"
                key={group?.id}
              >
                <Link
                  to={`/groups/${group?.id}`}
                  onClick={() =>
                    dispatch(
                      setGroupData(groups?.find((x) => x?.id === group?.id))
                    )
                  }
                  className="font-bold text-md text-cyan-500"
                >
                  {group?.name}
                </Link>
                {group?.active ? (
                  <span className="font-bold text-green-400">
                    Группа активна
                  </span>
                ) : (
                  <span className="font-bold text-red-400">
                    Группа неактивна
                  </span>
                )}
              </div>
            ))}
          </div>
          <label className="text-lg block w-full">Платежи</label>
          <Table columns={columns} className="overflow-auto mt-2"></Table>
        </Tabs.TabPane>
        <Tabs.TabPane tab="История" key="item-2">
          <div className="bg-orange-50 p-4">Ничего не найдено</div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
