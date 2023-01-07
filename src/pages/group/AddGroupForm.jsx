import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input, message, Spin, Select, DatePicker } from "antd";
import { v4 as uuidv4 } from "uuid";
import axios from "../../axios/axios";
import { MyButton } from "../../UI/Button.style";
import { refreshGroupsData } from "../../redux/groupsSlice";
import {
  fetchedCourses,
  fetchedError,
  fetchingCourses,
} from "../../redux/coursesSlice";
import { fetchedTeachers, fetchingTeachers } from "../../redux/teachersSlice";
import { fetchedRooms, fetchingRooms } from "../../redux/roomsSlice";
import { X } from "react-bootstrap-icons";

export default function AddGroupForm({
  modalType,
  editingGroup,
  visible,
  setVisible,
}) {
  // states
  const { teachers } = useSelector((state) => state.teachers);
  const { courses } = useSelector((state) => state.courses);
  const { rooms } = useSelector((state) => state.rooms);
  const [uploading, setUploading] = useState(false);
  const [times, setTimes] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  const [manualMarking, setManualMarking] = useState(false);

  const [group, setGroup] = useState({
    name: "",
    time_id: "",
    group_start_date: "",
    group_end_date: "",
    teacher_ids: [],
    room_id: "",
    days: [],
    course_id: "",
  });
  const url = "/api/groups";
  // hooks
  const dispatch = useDispatch();

  // fetching courses
  useEffect(() => {
    dispatch(fetchingCourses());
    axios
      .get(`/api/courses`)
      .then((res) => {
        dispatch(fetchedCourses(res?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      });

    axios.get("/api/times").then((res) => {
      setTimes(res.data.data);
    });
  }, []);

  // fetching teachers
  useEffect(() => {
    dispatch(fetchingTeachers());
    axios.get(`/api/teachers`).then((res) => {
      dispatch(fetchedTeachers(res?.data?.data));
    });
    setManualMarking(false);
  }, []);

  // fetching rooms
  useEffect(() => {
    dispatch(fetchingRooms());
    axios.get(`/api/rooms`).then((res) => {
      dispatch(fetchedRooms(res?.data?.data?.data));
    });
  }, []);
  useEffect(() => {
    if (modalType === "add") {
      setGroup({
        name: "",
        time_id: "",
        group_start_date: "",
        group_end_date: "",
        teacher_ids: [],
        room_id: "",
        days: [],
        course_id: "",
      });
      setInputFields([]);
    } else {
      const {
        name,
        time,
        group_start_date,
        group_end_date,
        room,
        days,
        course,
        tachers,
      } = editingGroup;
      setGroup({
        name: name,
        time_id: time?.id,
        group_start_date: group_start_date,
        group_end_date: group_end_date,
        teacher_ids: tachers,
        room_id: room?.id,
        days: days?.join(","),
        course_id: course?.id,
      });
      const teachers_ids = [];
      editingGroup?.tachers?.map((item) => {
        teachers_ids.push(item.id);
      });
      if (tachers) {
        setInputFields([]);
        const newAddTeacher = [];
        tachers?.map((item) => {
          newAddTeacher.push({ ...item, id: uuidv4(), teacher_id: item?.id });
        });
        setInputFields(newAddTeacher);
        console.log(inputFields);
      } else {
        setInputFields([]);
      }
    }
  }, [modalType, visible]);

  function handle(e) {
    const newGroup = { ...group };
    newGroup[e.target.id] = e.target.value;
    setGroup(newGroup);
  }
  function submit(e) {
    e.preventDefault();
    const {
      name,
      time_id,
      group_start_date,
      teacher_ids,
      room_id,
      days,
      course_id,
    } = group;
    if (
      name &&
      time_id &&
      group_start_date &&
      teacher_ids &&
      room_id &&
      days &&
      course_id
    ) {
      setUploading(true);
      if (modalType === "add") {
        axios
          .post(url, {
            name: group.name,
            time_id: group.time_id,
            group_start_date: group.group_start_date,
            group_end_date: group.group_end_date,
            teachers: inputFields,
            room_id: group.room_id,
            days: manualMarking ? group.days : group.days?.split(","),
            course_id: group.course_id,
          })
          .then((res) => {
            setGroup({
              name: "",
              time_id: "",
              group_start_date: "",
              group_end_date: "",
              teacher_ids: [],
              room_id: "",
              days: [],
              course_id: "",
            });
            message.success("Группа успешно добавлен!");
            dispatch(refreshGroupsData());
            setVisible();
          })
          .catch((err) => {
            console.log(err);
            if (err?.response?.data?.message === "Lesson chalk in the room") {
              message.error("Кабинет в это время занята!");
            } else {
              message.error("Произошла ошибка! Попробуйте еще раз!");
            }
          })
          .finally(() => setUploading(false));
      } else if (modalType === "update") {
        const teacherIds = [];
        inputFields.map((item) =>
          teacherIds.push({ teacher_id: item?.teacher_id, flex: +item?.flex })
        );
        const dayArr = [];
        if (!manualMarking) {
          group?.days?.split(",")?.map((item) => dayArr.push(+item));
        }
        console.log(group?.days);
        console.log(dayArr);
        axios
          .patch(url + "/" + editingGroup?.id, {
            group_id: editingGroup?.id,
            name: group.name,
            time_id: group.time_id,
            group_start_date: group_start_date,
            group_end_date: group.group_end_date,
            teachers: teacherIds,
            room_id: group.room_id,
            days: manualMarking ? group.days : dayArr,
            course_id: group.course_id,
          })
          .then((res) => {
            setGroup({
              name: "",
              time_id: "",
              group_start_date: "",
              group_end_date: "",
              teacher_ids: [],
              room_id: "",
              days: [],
              course_id: "",
            });
            message.success("Группа успешно обновлен!");
            dispatch(refreshGroupsData());
            setVisible();
          })
          .catch((err) => {
            if (err?.response?.data?.data?.room_id) {
              message.error("Кабинет в это время занята!");
            } else {
              console.log(err);
              message.error("Произошла ошибка! Попробуйте еще раз!");
            }
          })
          .finally(() => setUploading(false));
      }
    } else {
      message.error("Заполните все поля!");
    }
  }

  // Addition teachers
  const handleAddFields = () => {
    const currItems = teachers?.data?.filter(
      (item) => !inputFields?.find((x) => x.teacher_id === item.id)
    );
    if (currItems?.length === 1) {
      setInputFields([
        ...inputFields,
        { teacher_id: currItems[0]?.id, flex: "", id: Date.now() },
      ]);
    } else {
      setInputFields([
        ...inputFields,
        { teacher_id: "", flex: "", id: Date.now() },
      ]);
    }
  };

  const handleChangeInput = (type, id, event) => {
    setInputFields((prev) => {
      return inputFields?.map((item) => {
        if (id === item.id) {
          return {
            ...item,
            teacher_id: type === "teacher_id" ? event : item?.teacher_id,
            flex: type === "flex" ? event.target.value : item?.flex,
          };
        } else {
          return item;
        }
      });
    });
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const options = [
    {
      label: "Понедельник",
      value: 1,
    },
    {
      label: "Вторник",
      value: 2,
    },
    {
      label: "Среда",
      value: 3,
    },
    {
      label: "Четверг",
      value: 4,
    },
    {
      label: "Пятница",
      value: 5,
    },
    {
      label: "Суббота",
      value: 6,
    },
    {
      label: "Воскресенье",
      value: 7,
    },
  ];

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <p>Название группы</p>
        <Input
          required
          id="name"
          value={group?.name}
          onChange={(e) => {
            setGroup({ ...group, name: e.target.value });
          }}
          type="text"
          className="mb-4 mt-2"
        />
        <p>Выберите курс</p>
        <Select
          value={group?.course_id}
          onChange={(e) => {
            setGroup({ ...group, course_id: e });
          }}
          placeholder="Выбрать варианты"
          className="w-full mb-4 mt-2"
          showSearch={true}
        >
          {courses?.map((course, index) => {
            return (
              <Select.Option value={course?.id} key={index}>
                {course.name}
              </Select.Option>
            );
          })}
        </Select>
        <p>Выберите учителя и процент дохода (%)</p>
        <div className="mt-2 mb-4">
          {inputFields?.map((inputField) => (
            <div key={inputField?.id} className="mb-2">
              <div className="flex justify-between items-end mb-2">
                <span>Другой учитель</span>
                <button
                  onClick={() => {
                    handleRemoveFields(inputField?.id);
                  }}
                  className="border rounded-full text-slate-400 p-1"
                >
                  <X className="text-xl" />
                </button>
              </div>
              <Select
                value={inputField?.teacher_id}
                onChange={(e) => {
                  handleChangeInput("teacher_id", inputField.id, e);
                }}
                placeholder="Выбрать варианты"
                className="w-3/4"
                showSearch={true}
              >
                {teachers?.data?.map((teacher, index) => {
                  const curr = inputFields.find(
                    (item) => item?.teacher_id == teacher?.id
                  );
                  if (!curr || curr.id === inputField.id) {
                    return (
                      <Select.Option value={teacher?.id} key={index}>
                        {teacher?.name}
                      </Select.Option>
                    );
                  }
                })}
              </Select>
              <Input
                required
                onChange={(event) => {
                  handleChangeInput("flex", inputField.id, event);
                }}
                value={inputField?.flex}
                placeholder="%"
                className="w-1/4 ml-auto"
              ></Input>
            </div>
          ))}
        </div>
        {teachers?.data?.filter(
          (item) => !inputFields?.find((x) => x.teacher_id === item.id)
        )?.length === 0 ? null : inputFields.length > 0 ? (
          <MyButton onClick={handleAddFields} type="button" className="mb-4">
            Добавить еще одного учителя
          </MyButton>
        ) : (
          <MyButton onClick={handleAddFields} type="button" className="mb-4">
            Добавить учителя
          </MyButton>
        )}
        <p>Дата старта группы</p>
        <div className="flex gap-x-2 mb-4 mt-2">
          <input
            value={group?.group_start_date}
            id="group_start_date"
            onChange={(e) => {
              if (group?.group_end_date !== e.target.value) {
                handle(e);
              }
            }}
            type="date"
            className="rounded-sm p-1 border border-slate-300"
          />
          <input
            onChange={(e) => {
              if (group?.group_start_date !== e.target.value) {
                handle(e);
              }
            }}
            id="group_end_date"
            value={group?.group_end_date}
            min={group?.group_start_date}
            type="date"
            className="rounded-sm p-1 border border-slate-300"
          />
        </div>
        <p className="flex flex-wrap gap-2 justify-between align-bottom">
          <span className="mt-auto">Дни</span>
          <button
            type="button"
            className="font-bold border rounded-md py-1 px-2"
            onClick={() => {
              setManualMarking(!manualMarking);
              setGroup({ ...group, days: [] });
            }}
          >
            {!manualMarking
              ? "Набрать дни вручную"
              : "Набрать дни автоматически"}
          </button>
        </p>

        {manualMarking ? (
          <Select
            mode="multiple"
            className={`${manualMarking ? "" : "hidden"} w-full mb-4 mt-2`}
            options={options}
            value={group?.days?.length === 0 ? null : group?.days}
            onChange={(e) => {
              setGroup({ ...group, days: e?.filter((e) => e !== undefined) });
              console.log(e);
            }}
            placeholder="Выбрать варианты"
          />
        ) : (
          <Select
            value={group?.days}
            onChange={(e) => {
              setGroup({ ...group, days: e });
            }}
            placeholder="Выбрать варианты"
            className={`${manualMarking ? "hidden" : ""} w-full mb-4 mt-2`}
          >
            <Select.Option value={"1,3,5"}>Нечетные дни</Select.Option>
            <Select.Option value={"2,4,6"}>Четные дни</Select.Option>
            <Select.Option value={"1,2,3,4,5,6"}>Каждый день</Select.Option>
            <Select.Option value={"6,7"}>Выходные</Select.Option>
          </Select>
        )}

        <p>Выберите аудиторию</p>
        <Select
          value={group?.room_id}
          onChange={(e) => {
            setGroup({ ...group, room_id: e });
          }}
          placeholder="Выбрать варианты"
          className="w-full mb-4 mt-2"
          showSearch={true}
        >
          {rooms?.map((room, index) => {
            return (
              <Select.Option value={room?.id} key={room.id}>
                {room.name}
              </Select.Option>
            );
          })}
        </Select>
        <p>Время начала урока</p>
        <Select
          value={group?.time_id}
          onChange={(e) => {
            setGroup({ ...group, time_id: e });
          }}
          placeholder="Выбрать варианты"
          className="w-full mb-4 mt-2"
          showSearch={true}
        >
          {times?.map((time) => (
            <Select.Option value={time?.id}>{time?.time}</Select.Option>
          ))}
        </Select>
        <Spin spinning={uploading}>
          <MyButton htmlType="submit" color="primary">
            Отправить
          </MyButton>
        </Spin>
      </form>
    </div>
  );
}
