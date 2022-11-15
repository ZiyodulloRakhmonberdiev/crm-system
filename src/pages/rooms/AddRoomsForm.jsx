// import type { RadioChangeEvent } from 'antd'
import { useState, useEffect } from "react";
import { Input, message, Spin } from "antd";
import axios from "../../axios/axios";
import { MyButton } from "../../UI/Button.style";
import { useDispatch, useSelector } from "react-redux";
import { refreshRoomsData } from "../../redux/roomsSlice";

export default function AddRoomsForm({
  modalType,
  editingRoom,
  visible,
  setVisible,
}) {
  const [uploading, setUploading] = useState(false);
  const { selected_branch } = useSelector((state) => state.branches);
  const dispatch = useDispatch();
  const url = "/api/rooms";

  const [room, setRoom] = useState({
    name: "",
    capacity: "",
    branch_id: selected_branch?.id,
  });

  useEffect(() => {
    if (modalType === "add") {
      setRoom({
        name: "",
        capacity: "",
        branch_id: selected_branch?.id,
      });
    } else {
      const { name, capacity, branch_id, room_id } = editingRoom;
      setRoom({
        name: name,
        capacity: capacity,
        branch_id: branch_id,
        room_id: room_id,
      });
    }
  }, [modalType, visible]);

  function handle(e) {
    const newRoom = { ...room };
    newRoom[e.target.id] = e.target.value;
    setRoom(newRoom);
  }

  function submit(e) {
    e.preventDefault();
    const { name, capacity } = room;
    if (name && capacity) {
      setUploading(true);
      if (modalType === "add") {
        axios
          .post(url, {
            name: room.name,
            capacity: room.capacity,
            branch_id: selected_branch?.id,
          })
          .then((res) => {
            setRoom({
              name: "",
              capacity: "",
            });
            message.success("Кабинет успешно добавлен!");
            dispatch(refreshRoomsData());
            setVisible();
          })
          .catch((err) => {
            message.error("Произошла ошибка! Попробуйте еще раз!");
          })
          .finally(() => setUploading(false));
      } else if (modalType === "update") {
        axios
          .patch(url + "/" + editingRoom?.id, {
            room_id: editingRoom?.id,
            name: room?.name,
            capacity: room?.capacity,
            branch_id: selected_branch?.id,
          })
          .then((res) => {
            setRoom({
              name: "",
              capacity: "",
            });
            message.success("Кабинет успешно обновлен!");
            dispatch(refreshRoomsData());
            setVisible();
          })
          .catch((err) => {
            console.log(err);
            message.error("Произошла ошибка! Попробуйте еще раз!");
          })
          .finally(() => setUploading(false));
      }
    } else {
      message.error("Заполните все поля!");
    }
  }

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <p>Название</p>
        <Input
          required
          id="name"
          value={room?.name}
          onChange={(e) => {
            handle(e);
          }}
          type="text"
          className="mb-4 mt-2"
          name="name"
        />
        <p>Студенческая емкость</p>
        <Input
          type="number"
          required
          id="capacity"
          value={room?.capacity}
          onChange={(e) => {
            handle(e);
          }}
          className="mb-4 mt-2"
          name="capacity"
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
