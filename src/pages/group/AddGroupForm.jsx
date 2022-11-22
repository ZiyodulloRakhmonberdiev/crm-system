import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input, message, Spin, Select } from "antd";
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
  const url = "/api/groups";
  const [times, setTimes] = useState([]);
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
  const [inputFields, setInputFields] = useState([
    { name: "", flex: "", id: Date.now() },
  ]);

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
        days: "",
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
      } = editingGroup;
      const teachers_ids = [];
      editingGroup?.tachers?.map((item) => {
        teachers_ids.push(item.id);
      });
      setGroup({
        name: name,
        time_id: time?.id,
        group_start_date: group_start_date,
        group_end_date: group_end_date,
        teacher_ids: teachers_ids,
        room_id: room?.id,
        days: days?.join(","),
        course_id: course?.id,
      });
      if (teachers_ids) {
        setInputFields([]);
        const newAddTeacher = [];
        teachers_ids?.map((item) => {
          newAddTeacher.push({ ...item, id: uuidv4() });
        });
        setInputFields(newAddTeacher);
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
            teacher_ids: inputFields,
            room_id: group.room_id,
            days: group.days?.split(","),
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
              days: "",
              course_id: "",
            });
            message.success("Группа успешно добавлен!");
            dispatch(refreshGroupsData());
            setVisible();
          })
          .catch((err) => {
            if (err.response.data.data.room_id) {
              message.error("Кабинет в это время занята!");
            } else {
              message.error("Произошла ошибка! Попробуйте еще раз!");
            }
          })
          .finally(() => setUploading(false));
      } else if (modalType === "update") {
        axios
          .patch(url + "/" + editingGroup?.id, {
            group_id: editingGroup?.id,
            name: group.name,
            time_id: group.time_id,
            group_start_date: group_start_date,
            group_end_date: group.group_end_date,
            teacher_ids: inputFields,
            room_id: group.room_id,
            days: group.days?.split(","),
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
              days: "",
              course_id: "",
            });
            message.success("Группа успешно обновлен!");
            dispatch(refreshGroupsData());
            setVisible();
          })
          .catch((err) => {
            if (err.response.data.data.room_id) {
              message.error("Кабинет в это время занята!");
            } else {
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
    setInputFields([...inputFields, { name: "", flex: "", id: Date.now() }]);
  };

  const handleChangeInput = (type, id, event) => {
    setInputFields((prev) => {
      return inputFields?.map((item) => {
        if (id === item.id) {
          return {
            ...item,
            phone:
              type === "phone"
                ? `+998${event.target.value.split(" ").join("")}`
                : item.phone,
            label: type === "label" ? event : item.label,
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
          {courses.map((course, index) => {
            return (
              <Select.Option value={course?.id} key={index}>
                {course.name}
              </Select.Option>
            );
          })}
        </Select>
        <p>Выберите учителя и процент дохода (%)</p>
        <div className="mt-2 mb-4">
          <Select
            value={group?.teacher_ids}
            // onChange={(e) => {
            //   setGroup({ ...group, teacher_ids: e });
            // }}
            onChange={(e) => {
              handleChangeInput("label", inputFields?.[0]?.id, e);
            }}
            placeholder="Выбрать варианты"
            className="w-3/4"
            showSearch={true}
          >
            {teachers?.data?.map((teacher, index) => {
              return (
                <Select.Option value={teacher?.id} key={index}>
                  {teacher?.name}
                </Select.Option>
              );
            })}
          </Select>
          <Input
            onChange={(event) => {
              handleChangeInput("phone", inputFields?.[0]?.id, event);
            }}
            placeholder="%"
            className="w-1/4 ml-auto"
          ></Input>
        </div>
        {inputFields.map((inputField) => (
          <div key={inputField.id} className="mb-2">
            <div className="flex justify-between items-end mb-2">
              <span>Другой учитель</span>
              <button
                onClick={() => {
                  handleRemoveFields(inputField.id);
                }}
                className="border rounded-full text-slate-400 p-1"
              >
                <X className="text-xl" />
              </button>
            </div>
            <Select
              value={group?.teacher_ids?.name}
              // onChange={(e) => {
              //   setGroup({ ...group, teacher_ids: e });
              // }}
              onChange={(e) => {
                handleChangeInput("label", inputField.id, e);
              }}
              placeholder="Выбрать варианты"
              className="w-3/4"
              showSearch={true}
            >
              {teachers?.data?.map((teacher, index) => {
                return (
                  <Select.Option value={teacher?.id} key={index}>
                    {teacher?.name}
                  </Select.Option>
                );
              })}
            </Select>
            <Input
              onChange={(event) => {
                handleChangeInput("phone", inputField.id, event);
              }}
              value={group?.teacher_ids?.felx}
              placeholder="%"
              className="w-1/4 ml-auto"
            ></Input>
            {/* <Input
              placeholder="Пользователь телефона"
              onChange={(e) => {
                handleChangeInput("label", inputField.id, e);
              }}
              value={inputField.label}
              required
            />
            <InputMask
              mask="99 999 99 99"
              onChange={(event) => {
                handleChangeInput("phone", inputField.id, event);
              }}
              value={inputField?.phone?.slice(4, inputField?.length)} // +998
              maskChar={null}
              required
            >
              {(props) => (
                <Input
                  name="phone"
                  {...props}
                  addonBefore="+998"
                  className="mb-4 mt-2"
                />
              )}
            </InputMask> */}
          </div>
        ))}
        <MyButton onClick={handleAddFields} type="button" className="mb-4">
          Добавить еще одного учителя
        </MyButton>
        <p>Дата старта группы</p>
        <div className="flex gap-x-2 mb-4 mt-2">
          <input
            value={group?.group_start_date}
            id="group_start_date"
            onChange={(e) => handle(e)}
            type="date"
            className="rounded-sm p-1 border border-slate-300"
          />
          <input
            onChange={(e) => handle(e)}
            id="group_end_date"
            value={group?.group_end_date}
            type="date"
            className="rounded-sm p-1 border border-slate-300"
          />
        </div>
        <p>Дни</p>
        <Select
          value={group?.days}
          onChange={(e) => {
            setGroup({ ...group, days: e });
          }}
          placeholder="Выбрать варианты"
          className="w-full mb-4 mt-2"
          showSearch={true}
        >
          <Select.Option value={"1,3,5"}>Нечетные дни</Select.Option>
          <Select.Option value={"2,4,6"}>Четные дни</Select.Option>
          <Select.Option value={"1,2,3,4,5,6"}>Каждый день</Select.Option>
          <Select.Option value={"6,7"}>Другое</Select.Option>
        </Select>
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
