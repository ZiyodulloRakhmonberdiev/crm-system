import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import {
  Tabs,
  Table,
  Modal,
  Select,
  DatePicker,
  message,
  Spin,
  Drawer,
  Pagination,
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
  fetchedStudentPayments,
  fetchingStudentPayments,
  setUserGroupData,
} from "../../redux/studentsSlice";
import AddStudentForm from "./AddStudentForm";
import AddPaymentForm from "../finance/AddPaymentForm";
import InProcess from "../../UI/InProcess.style";

export default function StudentProfile() {
  // states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [refreshPayments, setRefreshPayments] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visiblePayment, setVisiblePayment] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(30);
  const [last_page] = useState(1);
  const [modalType, setModalType] = useState("add");
  const [studentGroups, setStudentGroups] = useState([]);
  const { userData, userGroupData, studentPayments, loadingPayments } =
    useSelector((state) => state.students);
  const { groups } = useSelector((state) => state.groups);
  const [group, setGroup] = useState({
    group_id: "",
    start_date: "",
    student_id: userData?.id,
  });
  // get TEACHER
  const [TEACHER, setTEACHER] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("crm_role").toUpperCase() === "TEACHER") {
      setTEACHER(true);
    } else {
      setTEACHER(false);
    }
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  // hooks
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = "/api/groups/add-student";
  const formatter = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  // students static data
  let dataSource = [];
  studentPayments?.map((item) => {
    dataSource?.push({
      id: item?.id,
      uid: uuidv4(),
      amount: Number(item?.amount).toLocaleString(),
      payment_type: item?.payment_type,
      date: item?.date,
      description: item?.description,
      created_at: formatter.format(Date.parse(item?.created_at)),
      employee: item?.employee?.name,
      group: item?.group?.name,
      actions: (
        <div className="flex gap-2">
          <IconButton color="danger">
            <Trash />
          </IconButton>
        </div>
      ),
    });
  });
  const columns = [
    {
      key: "1",
      title: "Дата",
      dataIndex: "date",
      fixed: "top",
    },
    {
      key: "2",
      title: "Сумма",
      dataIndex: "amount",
      fixed: "top",
    },
    {
      key: "3",
      title: "Комментарий",
      dataIndex: "description",
      fixed: "top",
    },
    {
      key: "4",
      title: "Сотрудник",
      dataIndex: "employee",
      fixed: "top",
    },
    {
      key: "5",
      title: "Метод оплаты",
      dataIndex: "payment_type",
      fixed: "top",
    },
    {
      key: "6",
      title: "Группа",
      dataIndex: "group",
      fixed: "top",
    },
    {
      key: "7",
      title: "Создано",
      dataIndex: "created_at",
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

  // fetching student payments
  useEffect(() => {
    dispatch(fetchingStudentPayments());
    axios
      .get(`/api/students/${params?.id}/payments?page=${currentPage}`)
      .then((res) => {
        dispatch(fetchedStudentPayments(res?.data?.data?.data));
      })
      .finally(setRefreshPayments(false));
    if (!userData?.id) {
      navigate("/students", { replace: true });
    }
  }, [refreshPayments, currentPage]);

  // fetching students joined groups
  useEffect(() => {
    axios.get(`/api/students/${params?.id}/groups`).then((res) => {
      setStudentGroups(res?.data);
    });
  }, [refreshing]);

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
        .then(() => {
          setGroup({
            group_id: "",
            start_date: "",
          });
          message.success("Пользователь успешно добавлен!");
          setRefreshing(!refreshing);
        })
        .catch((err) => {
          if (err?.response?.data?.message === "student id already exists") {
            message.error("Этот пользователь уже есть в этой группе!");
          } else if (err?.message === "Network Error") {
            message.error("У вас нет подключения к интернету!");
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
            <p
              className={`${
                userData?.balance >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {Number(userData?.balance).toLocaleString()} сум
            </p>
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
              <div key={uuidv4()} className="grid grid-cols-2">
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
            <IconButton
              color="success"
              onClick={() => setVisiblePayment(!visiblePayment)}
            >
              <CashStack />
            </IconButton>
            {TEACHER ? (
              ""
            ) : (
              <IconButton color="primary" onClick={showModal}>
                <TeamOutlined />
              </IconButton>
            )}
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
          {groups?.map((item) => {
            return (
              <Select.Option value={item?.id} key={item?.id}>
                <button
                  className=" w-full block text-left"
                  onClick={() => {
                    dispatch(setUserGroupData(item));
                    setGroup({ ...group, start_date: null });
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
      <Tabs
        className="col-span-6 md:col-span-3 lg:col-span-4"
        items={[
          {
            key: "1",
            label: `Профиль`,
            children: (
              <div>
                <label className="text-lg block w-full mb-2">Группы</label>
                <div className="flex flex-wrap justify-start xl:grid w-full xl:grid-cols-2 gap-2 mb-4 relative">
                  {studentGroups?.data
                    ?.sort((a, b) => a?.id - b?.id)
                    ?.map((group, i) => {
                      if (
                        group?.id ==
                        studentGroups?.data?.sort((a, b) => a?.id - b?.id)[
                          i + 1
                        ]?.id
                      ) {
                        return null;
                      } else {
                        return (
                          <div
                            className="flex justify-start sm:justify-between w-full flex-col items-start sm:items-center sm:flex-row gap-2 p-4 bg-white drop-shadow-md rounded-sm"
                            key={group?.id}
                          >
                            <div className="flex flex-col justify-start gap-1 w-full">
                              <Link
                                to={`/groups/${group?.id}`}
                                onClick={() =>
                                  dispatch(
                                    setGroupData(
                                      groups?.find((x) => x?.id === group?.id)
                                    )
                                  )
                                }
                                className="font-bold text-xl text-cyan-500"
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
                          </div>
                        );
                      }
                    })}
                </div>
                <label className="text-lg block w-full">Платежи</label>
                <Table
                  loading={loadingPayments}
                  columns={columns}
                  dataSource={dataSource}
                  className="overflow-auto mt-2"
                  pagination={false}
                  scroll={{
                    x: 800,
                  }}
                  rowKey={(record) => record.uid}
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
            ),
          },
          {
            key: "2",
            label: `История`,
            children: <InProcess />,
          },
        ]}
      ></Tabs>
    </div>
  );
}
