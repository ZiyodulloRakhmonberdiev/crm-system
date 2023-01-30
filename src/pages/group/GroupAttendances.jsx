import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Input, message, Modal, Spin, Tooltip } from "antd";
import { CheckCircle, X, XCircle } from "react-bootstrap-icons";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import "moment/locale/ru";
import {
  fetchedAtt,
  fetchingAtt,
  fetchingErrorAtt,
} from "../../redux/attendancesSlice";
import axios from "../../axios/axios";
import "./style.css";
moment.locale("ru");

const GroupAttendance = ({ from, to, setFrom, setTo }) => {
  // states
  const { groupData } = useSelector((state) => state.groups);
  const [refreshing, setRefreshing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { attendances, loading, error } = useSelector(
    (state) => state.attendances
  );
  const [attendanceData, setAttendanceData] = useState({
    attStatus: null,
    date: null,
    student_id: null,
    group_id: null,
    description,
  });

  // hooks
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    let date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    let lastDay = new Date(y, m + 1, 0);

    setFrom(moment(firstDay).format("YYYY-MM-DD"));
    setTo(moment(lastDay).format("YYYY-MM-DD"));
  }, []);

  useEffect(() => {
    dispatch(fetchingAtt());
    setTimeout(() => {
      axios
        .get(`/api/groups/${params?.id}/attendance?from=${from}&to=${to}`)
        .then((res) => {
          dispatch(fetchedAtt(res?.data));
        })
        .catch((err) => {
          dispatch(fetchingErrorAtt());
        });
    }, 500);
  }, [refreshing, from, to]);

  const handleSetAttendanceStudent = (data) => {
    const { student_id, group_id, attStatus: status, date } = data;
    setUploading(true);
    axios
      .post("/api/groups/attendance", {
        student_id,
        group_id,
        status,
        date,
        description,
      })
      .then(() => {
        setRefreshing(!refreshing);
      })
      .finally(() => {
        setUploading(false);
        setModalIsOpen(false);
        setDescription(null);
      });
  };

  const compareDate = (d1) => {
    let now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    let today = now.getFullYear() + "-" + month + "-" + day;

    let date1 = new Date(d1).getTime();
    let date2 = new Date(today).getTime();
    const role = localStorage.getItem("crm_role");
    if (
      role?.toUpperCase() === "ADMINISTRATOR" ||
      role?.toUpperCase() === "CEO"
    ) {
      return date1 > date2;
    } else {
      return date1 !== date2;
    }
  };

  const deleteAtt = (currentId) => {
    setUploading(true);
    axios
      .delete(`/api/groups/attendance/${currentId}`)
      .then(() => {
        setRefreshing(!refreshing);
      })
      .catch((err) => {
        message.error("Произошла ошибка! Попробуйте еще раз!");
      })
      .finally(() => setUploading(false));
  };
  if (error) return <center>При загрузке произошла ошибка</center>;
  return (
    <Spin spinning={loading}>
      <Modal
        open={modalIsOpen}
        onCancel={() => setModalIsOpen(false)}
        onOk={() => handleSetAttendanceStudent(attendanceData)}
        title={"Описание..."}
        okText="Добавить"
        cancelText="Отмена"
      >
        <Input.TextArea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Описание не обязательно..."
        ></Input.TextArea>
      </Modal>
      <div className="relative  overflow-x-auto pb-2">
        <table className=" ">
          <thead>
            <tr className="flex rounded-sm mb-3 pt-2 border-t">
              <th width="200" align="left">
                Имя
              </th>
              {attendances?.days?.map((day) => (
                <th key={uuidv4()} width="100">
                  {moment(day?.date).format("DD MMM")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendances?.students?.map(
              (student) =>
                student?.active === true && (
                  <tr key={uuidv4()} className="flex mb-2">
                    <td width={200} className="bg-gray-100 rounded-sm p-1">
                      {student?.first_name} {student?.last_name}
                    </td>
                    {attendances?.days?.map((day) => {
                      const current = student.attendance.find(
                        (att) => att?.date === day?.date
                      );
                      return current ? (
                        <td
                          key={uuidv4()}
                          width="100"
                          className="flex items-center justify-center"
                        >
                          {!current.status ? (
                            <Tooltip
                              title={
                                current?.description
                                  ? current?.description
                                  : "Нет описания"
                              }
                            >
                              <span className="bg-red-400 px-2 py-1 text-xs text-white rounded-md relative attendance__cancel-btn-wrapper">
                                <button
                                  disabled={uploading || compareDate(day?.date)}
                                  onClick={() => {
                                    deleteAtt(current?.id);
                                  }}
                                  className="absolute rounded-full bg-white -top-2 -right-2 border border-slate-400 p-0.5 text-slate-400 attendance__cancel-btn"
                                >
                                  <X />
                                </button>
                                Нет
                              </span>
                            </Tooltip>
                          ) : (
                            <span
                              key={uuidv4()}
                              className="bg-blue-400 px-2 py-1 text-xs text-white rounded-md relative attendance__cancel-btn-wrapper"
                            >
                              <button
                                disabled={uploading || compareDate(day?.date)}
                                onClick={() => {
                                  deleteAtt(current?.id);
                                }}
                                className="  absolute rounded-full bg-white -top-2 -right-2 border border-slate-400 p-0.5 text-slate-400 attendance__cancel-btn"
                              >
                                <X />
                              </button>
                              Был
                            </span>
                          )}
                        </td>
                      ) : (
                        <td
                          key={uuidv4()}
                          width="100"
                          className="flex items-center justify-center"
                        >
                          <div
                            className={`
                        flex flex-row border rounded-full 
                        border-gray-400 w-10 transition attendance__btn-group
                        ${
                          compareDate(day?.date)
                            ? "opacity-60 bg-gray-200 pointer-events-none"
                            : "hover:w-auto"
                        }`}
                          >
                            <Tooltip title="Был">
                              <button
                                disabled={uploading || compareDate(day?.date)}
                                onClick={() => {
                                  // setAttendanceData();
                                  handleSetAttendanceStudent({
                                    attStatus: true,
                                    date: day?.date,
                                    student_id: student?.id,
                                    group_id: params?.id,
                                  });
                                }}
                                className={`
                                  have
                                  text-blue-500 
                                  hover:bg-blue-500 
                                  hover:text-bg-500 
                                  hover:text-white 
                                  rounded-full
                                  p-1 w-8 h-8 
                                  opacity-0 
                              ${
                                compareDate(day?.date)
                                  ? ""
                                  : "hover:opacity-100"
                              } 
                                  flex 
                                  items-center 
                                  justify-center 
                                  transition
                              `}
                              >
                                <CheckCircle />
                              </button>
                            </Tooltip>
                            <Tooltip title="Нет">
                              <button
                                disabled={uploading || compareDate(day?.date)}
                                onClick={() => {
                                  setAttendanceData({
                                    attStatus: false,
                                    date: day?.date,
                                    student_id: student?.id,
                                    group_id: params?.id,
                                  });
                                  setModalIsOpen(true);
                                }}
                                className={`
                            havenot
                            hover:bg-red-400 
                            text-red-400 
                            hover:text-white 
                            rounded-full 
                            p-1 
                            w-8 
                            h-8 
                            opacity-0 
                            ${
                              compareDate(day?.date) ? "" : "hover:opacity-100"
                            } 
                            flex items-center justify-center 
                            transition`}
                              >
                                <XCircle />
                              </button>
                            </Tooltip>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </Spin>
  );
};

export default GroupAttendance;
