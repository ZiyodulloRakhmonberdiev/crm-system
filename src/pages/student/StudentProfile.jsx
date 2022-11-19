import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tabs, Table, Modal, Select, DatePicker, message, Spin } from "antd";
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
  refreshGroupsData,
  setGroupData,
} from "../../redux/groupsSlice";
import axios from "../../axios/axios";
import { MyButton } from "../../UI/Button.style";
import {
  fetchedStudentJoinedGroups,
  fetchingStudentJoinedGroups,
  setUserData,
  setUserGroupData,
} from "../../redux/studentsSlice";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function StudentProfile() {
  // states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const {
    userData,
    userGroupData,
    refreshStudentsData,
    studentJoinedGroups,
    loadingJoinedGroups,
  } = useSelector((state) => state.students);
  const { groups } = useSelector((state) => state.groups);
  const [group, setGroup] = useState({
    group_id: "",
    start_date: "",
    student_id: userData.id,
  });

  // hooks
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!userData.id) {
      navigate("/", { replace: true });
    }
    // axios.get(`/api/students/${params.id}`).then((res) => {
    //   dispatch(setUserData(res?.data));
    // });
  });

  // fetching groups for join
  useEffect(() => {
    dispatch(fetchingGroups());
    axios.get(`/api/groups`).then((res) => {
      dispatch(fetchedGroups(res?.data?.data?.data));
    });
  }, []);

  // fetching students joined groups
  useEffect(() => {
    userData?.id && dispatch(fetchingStudentJoinedGroups());
    userData?.id &&
      axios.get(`/api/students/${userData?.id}/groups`).then((res) => {
        dispatch(fetchedStudentJoinedGroups(res?.data));
      });
  }, [userData?.id]);

  // main function for send datas to DB
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
          dispatch(refreshStudentsData());
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.data.student_id) {
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
            <p className="text-red-400">
              {userData?.balance ? userData?.balance : "Информация не введена"}{" "}
              сум
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
              <div key={item.id} className="flex flex-col justify-start">
                <p className="text-slate-400">{item.label}</p>
                <span className="text-xs flex items-center justify-start gap-1 text-slate-400">
                  <TelephoneFill className="text-green-400" /> {item.phone}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-row flex-wrap gap-3">
            <IconButton color="success">
              <EditOutlined />
            </IconButton>
            <IconButton color="primary">
              <Envelope />
            </IconButton>
            <IconButton color="success">
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
          {groups.map((item, index) => {
            return (
              <Select.Option value={item?.id} key={index}>
                <button
                  onClick={() => {
                    dispatch(setUserGroupData(item));
                  }}
                >
                  {item.name}
                </button>
              </Select.Option>
            );
          })}
        </Select>
        <div>
          {group.group_id && (
            <p className="mb-4 text-xs">
              Дата старта группы {userGroupData?.group_start_date}
            </p>
          )}
        </div>
        <div className="w-full mb-4">
          {group.group_id && (
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
          <Spin spinning={loadingJoinedGroups}>
            <div className="grid lg:grid-cols-2 gap-2 mb-4">
              {studentJoinedGroups?.data?.map((group) => (
                <div
                  className="flex justify-between flex-col sm:flex-row gap-2 p-4 bg-white drop-shadow-md rounded-sm"
                  key={group?.id}
                >
                  <Link
                    to={`/groups/${group.id}`}
                    onClick={() => dispatch(setGroupData(group))}
                    className="font-bold text-md"
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
          </Spin>
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
