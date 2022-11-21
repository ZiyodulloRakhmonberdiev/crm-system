import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Input, Modal, Spin, Tooltip } from "antd";
import { CheckCircle, XCircle } from "react-bootstrap-icons";
import moment from "moment";

import {
  fetchedAtt,
  fetchingAtt,
  fetchingErrorAtt,
} from "../../redux/attendancesSlice";
import axios from "../../axios/axios";
moment.locale("ru");

const GroupAttendance = () => {
  const params = useParams();
  const { attendances, loading, error } = useSelector(
    (state) => state.attendances
  );
  const { groupData } = useSelector((state) => state.groups);
  const [refreshing, setRefreshing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [attendanceData, setAttendanceData] = useState({
    attStatus: null,
    date: null,
    student_id: null,
    group_id: null,
    description,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchingAtt());
    axios
      .get(
        `/api/groups/${params?.id}/attendance?from=${groupData?.group_start_date}&to=${groupData?.group_end_date}`
      )
      .then((res) => {
        dispatch(fetchedAtt(res.data));
      })
      .catch((err) => {
        dispatch(fetchingErrorAtt());
      });
  }, [refreshing]);

  const handleSetAttendanceStudent = () => {
    const { student_id, group_id, attStatus: status, date } = attendanceData;
    setUploading(true);
    axios
      .post("/api/groups/attendance", {
        student_id,
        group_id,
        status,
        date,
        description,
      })
      .then((res) => {
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

    return date1 > date2;
  };

  if (error) return <center>При загрузке произошла ошибка</center>;
  return (
    <Spin spinning={loading}>
      <Modal
        open={modalIsOpen}
        onCancel={() => setModalIsOpen(false)}
        onOk={() => handleSetAttendanceStudent()}
        title={"Описание..."}
        okText="Добавить"
        cancelText="Отмена"
      >
        <Input.TextArea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></Input.TextArea>
      </Modal>
      <div className="">
        <table className="overflow-auto">
          <tr className=" overflow-auto flex bg-slate-100 px-2 py-1 rounded-md">
            <th width="200" align="left">
              Имя
            </th>
            {attendances?.days?.map((day) => (
              <th width="100">{moment(day?.data).format("DD MMM, YYYY")}</th>
            ))}
          </tr>

          <tbody>
            {attendances?.students?.map((student) => (
              <tr className="flex p-2  border-b border-gray-100">
                <td width={200} className="bg-gray-100 rounded-md p-1">
                  {student?.first_name} {student?.last_name}
                </td>
                {attendances?.days?.map((day) => {
                  const current = student.attendance.find(
                    (att) => att?.date === day?.data
                  );

                  return current ? (
                    <td
                      width="100"
                      align="center"
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
                          <span className="cursor-pointer bg-red-400 px-2 py-1 text-xs text-white rounded-md">
                            Нет
                          </span>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title={
                            current?.description
                              ? current?.description
                              : "Нет описания"
                          }
                        >
                          <span className="cursor-pointer bg-blue-400 px-2 py-1 text-xs text-white rounded-md">
                            Был
                          </span>
                        </Tooltip>
                      )}
                    </td>
                  ) : (
                    <td
                      width="100"
                      align="center"
                      className="flex items-center justify-center"
                    >
                      <div
                        className={`
                        flex flex-row border rounded-full 
                        border-gray-400 w-10 transition attendance__btn-group
                        ${
                          compareDate(day?.data)
                            ? "opacity-60 bg-gray-200"
                            : "hover:w-auto"
                        }`}
                      >
                        <button
                          disabled={uploading || compareDate(day.data)}
                          onClick={() => {
                            setAttendanceData({
                              attStatus: true,
                              date: day?.data,
                              student_id: student.id,
                              group_id: params.id,
                            });
                            setModalIsOpen(true);
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
                                compareDate(day?.data)
                                  ? ""
                                  : "hover:opacity-100"
                              } 
                              flex 
                              items-center 
                              justify-center 
                              transition
                              `}
                        >
                          <Tooltip title="Был">
                            <CheckCircle />
                          </Tooltip>
                        </button>
                        <button
                          disabled={uploading || compareDate(day?.data)}
                          onClick={() => {
                            setAttendanceData({
                              attStatus: false,
                              date: day?.data,
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
                              compareDate(day?.data) ? "" : "hover:opacity-100"
                            } 
                            flex items-center justify-center 
                            transition`}
                        >
                          <Tooltip title="Нет">
                            <XCircle />
                          </Tooltip>
                        </button>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Spin>
  );
};

export default GroupAttendance;
