import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Dropdown, Modal, Space, Input, Spin, Select, Drawer } from "antd";
import {
  BookmarkPlus,
  CashStack,
  Person,
  Search,
  PlusCircle,
  BoxArrowRight,
} from "react-bootstrap-icons";

import logo from "../assets/img/logo.png";
import axios from "../axios/axios";
import {
  fetchedBranches,
  fetchingBranches,
  setSelectedBranch,
} from "../redux/branchesSlice";
import { logout } from "../redux/loginSlice";
import AddStudentForm from "../pages/student/AddStudentForm";
import AddPaymentForm from "../pages/finance/AddPaymentForm";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [visiblePayment, setVisiblePayment] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);

  const { branches, loading, selected_branch } = useSelector(
    (state) => state.branches
  );
  const dispatch = useDispatch();
  const { Option } = Select;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchingBranches());
    axios.get("/api/branches").then((res) => {
      dispatch(fetchedBranches(res.data.data));
      dispatch(setSelectedBranch(res.data.data[0]));
    });
  }, []);

  const resetEditing = () => {
    setIsOpenSearchModal(false);
  };
  return (
    <header
      style={{
        width: "100%",
        maxWidth: 1920,
      }}
      className="fixed bg-white h-14 flex items-center justify-between px-2 md:px-8 z-20 border-b"
    >
      <div className="flex align-center justify-between items-center">
        <Link to="/" className="w-20">
          <img src={logo} alt="" />
        </Link>
        <Spin spinning={loading}>
          <Select
            loading={loading}
            value={selected_branch?.id}
            style={{ backgroundColor: "transparent" }}
            className="w-24 lg:w-44 lg:ml-4"
            bordered={false}
            onChange={(e) => {
              dispatch(setSelectedBranch(e));
            }}
          >
            {branches?.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Spin>
      </div>
      <div className="w-42 hidden lg:block">
        <Input.Search
          placeholder="Поиск"
          allowClear
          className="min-w-[250px]"
        />
      </div>
      <div className="flex space-x-2 md:space-x-4 items-center">
        <Search
          className="block lg:hidden sm:text-xl text-gray-500 font-bold cursor-pointer "
          onClick={() => {
            setIsOpenSearchModal(!isOpenSearchModal);
          }}
        />
        <Modal
          title="Поиск"
          open={isOpenSearchModal}
          okText="Поиск"
          cancelText="Отмена"
          onCancel={() => {
            resetEditing();
          }}
        >
          <Input placeholder="Поиск" className="mb-2" />
        </Modal>
        <Dropdown
          overlay={
            <div className="p-3 border bg-white drop-shadow-md flex flex-col gap-2">
              <a
                key="0"
                onClick={() => {
                  setVisible(!visible);
                }}
                className="flex items-center gap-2"
              >
                <PlusCircle className="text-gray-400 text-xl" />
                <span>Добавить студента</span>
              </a>
              <a
                key="1"
                className="flex items-center gap-2"
                onClick={() => setVisiblePayment(!visiblePayment)}
              >
                <CashStack className="text-gray-400 text-xl" />
                <span>Добавить оплату</span>
              </a>
            </div>
          }
        >
          <a>
            <Space className="border border-cyan-500 rounded-full p-2 bg-cyan-500 text-white hover:bg-white hover:text-cyan-400 transition">
              <BookmarkPlus className="md:text-xl" />
            </Space>
          </a>
        </Dropdown>
        <Dropdown
          overlay={
            <div className="p-3 border bg-white drop-shadow-md flex flex-col gap-2">
              <a key="0" className="flex items-center gap-2">
                <Person className="text-gray-400 text-xl" />
                <span>Мой аккаунт</span>
              </a>
              <a
                key="1"
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem("crm_token");
                  navigate("/login", { replace: true });
                }}
                className="flex items-center gap-2"
              >
                <BoxArrowRight className="text-gray-400 text-xl" />
                <span>Выход</span>
              </a>
            </div>
          }
        >
          <a>
            <Space className="border border-slate-500 rounded-full p-2 bg-slate-500 text-white hover:bg-white hover:text-slate-400 transition">
              <Person className="sm:text-xl" />
            </Space>
          </a>
        </Dropdown>
      </div>
      <Drawer
        open={visible}
        title={"Добавить студента"}
        onClose={() => {
          setVisible(!visible);
        }}
        maskClosable={true}
      >
        <AddStudentForm
          modalType={modalType}
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
          setVisiblePayment={() => setVisiblePayment(false)}
        />
      </Drawer>
    </header>
  );
}
