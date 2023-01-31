import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Drawer, Pagination, Table } from "antd";
import { PencilSquare, Trash, DoorOpen } from "react-bootstrap-icons";

import { MyButton } from "../../UI/Button.style";
import { IconButton } from "../../UI/IconButton.style";
import axios from "../../axios/axios";
import AddRoomsForm from "./AddRoomsForm";
import { v4 as uuidv4 } from "uuid";
import {
  fetchingRooms,
  fetchedRooms,
  fetchedError,
} from "../../redux/roomsSlice";
import { HeaderItem, HeaderWrapper } from "../../UI/Header.style";
import MyHeaderButton from "../../UI/MyHeaderButton.style";

export default function Rooms() {
  const [editingRoom, setEditingRoom] = useState(null);
  const [visible, setVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(30);
  const [last_page, setLastPage] = useState(1);

  const [modalType, setModalType] = useState("add");

  const dispatch = useDispatch();
  const { rooms, loading, refreshRooms } = useSelector((state) => state.rooms);

  // rooms static data
  let dataSource = [];
  rooms?.map((item) => {
    dataSource?.push({
      id: item?.id,
      uid: uuidv4(),
      name: item?.name,
      capacity: item?.capacity,
      branch_id: item?.id,
      room_id: item?.id,
      actions: (
        <div className="flex gap-2">
          <IconButton
            color="primaryOutlined"
            onClick={() => {
              onEditRoom(item);
            }}
          >
            <PencilSquare />
          </IconButton>
          <IconButton
            color="dangerOutlined"
            onClick={() => {
              onDeleteRoom(item);
            }}
          >
            <Trash />
          </IconButton>
        </div>
      ),
    });
  });

  const columns = [
    {
      key: "1",
      title: "",
      dataIndex: "id",
      width: 50,
      render: (record) => {
        return <span className="pl-1">{record}</span>;
      },
    },
    {
      key: "2",
      title: "Название",
      dataIndex: "name",
      fixed: "top",
    },
    {
      key: "3",
      title: "Студенческая емкость",
      dataIndex: "capacity",
      fixed: "top",
    },
    {
      key: "4",
      title: "Действие",
      fixed: "top",
      dataIndex: "actions",
    },
  ];

  // Actions with table
  const onDeleteRoom = (record) => {
    Modal.confirm({
      title: "Вы уверены что хотите удалить?",
      okText: "Да",
      okType: "danger",
      cancelText: "Отмена",
      // onOk: () => {
      //   setDataSource(pre => {
      //     return pre.filter(room=> room.id !== record.id)
      //   })
      // }
    });
  };

  const onEditRoom = (room) => {
    setModalType("update");
    setVisible(true);
    setEditingRoom({ ...room });
  };

  // fetching rooms
  useEffect(() => {
    dispatch(fetchingRooms());
    axios
      .get(`/api/rooms?page=${currentPage}`)
      .then((res) => {
        dispatch(fetchedRooms(res?.data?.data?.data));
        setPerPage(res?.data?.data?.per_page);
        setLastPage(res?.data?.data?.last_page);
      })
      .catch((err) => {
        dispatch(fetchedError());
      });
  }, [refreshRooms]);
  return (
    <div>
      <HeaderWrapper>
        <HeaderItem type="secondary">
          <div className="header__icon">
            <DoorOpen />
          </div>
          <div className="header__content">
            <p className="header__title">Кабинеты</p>
            <p>Количество: </p>
            <p className="header__result">{rooms?.length}</p>
          </div>
          <MyHeaderButton
            setModalType={() => setModalType("add")}
            setVisible={() => setVisible(!visible)}
          />
        </HeaderItem>
      </HeaderWrapper>
      <Drawer
        open={visible}
        title={
          modalType === "add" ? "Добавить кабинет" : "Редактировать кабинет"
        }
        onClose={() => {
          setVisible(!visible);
        }}
        maskClosable={true}
      >
        <AddRoomsForm
          modalType={modalType}
          editingRoom={editingRoom}
          visible={visible}
          setVisible={() => setVisible(false)}
        />
      </Drawer>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        className="overflow-auto bg-white sm:w-2/3 lg:w-1/2"
        pagination={false}
        rowKey={(record) => record.uid}
      ></Table>
      <br />
      <center className="sm:w-2/3 lg:w-1/2">
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
  );
}
