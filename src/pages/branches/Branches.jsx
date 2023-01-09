import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Drawer, Spin } from "antd";
import { PencilSquare, Trash, Palette2 } from "react-bootstrap-icons";

import { IconButton } from "../../UI/IconButton.style";
import axios from "../../axios/axios";
import AddBranchForm from "./AddBranchForm";
import {
  fetchingBranches,
  fetchedBranches,
  fetchedError,
} from "../../redux/branchesSlice";
import { HeaderItem, HeaderWrapper } from "../../UI/Header.style";
import MyHeaderButton from "../../UI/MyHeaderButton.style";

export default function Branches() {
  const [editingBranch, setEditingBranch] = useState(null);
  const [visible, setVisible] = useState(false);

  const [modalType, setModalType] = useState("add");
  const [fetchLoading, setFetchLoading] = useState(false);

  const dispatch = useDispatch();
  const { branches, refreshBranches } = useSelector((state) => state.branches);

  // Branches static data
  let dataSource = [];
  branches?.map((item) => {
    dataSource?.push({
      id: item?.id,
      branch_id: item?.id,
      name: item?.name,
    });
  });

  const onDeleteBranch = (record) => {
    Modal.confirm({
      title: "Вы уверены что хотите удалить?",
      okText: "Да",
      okType: "danger",
      cancelText: "Отмена",
      // onOk: () => {
      //   setDataSource(pre => {
      //     return pre.filter(Branch => Branch.id !== record.id)
      //   })
      // }
    });
  };

  const onEditBranch = (branch) => {
    setModalType("update");
    setVisible(true);
    setEditingBranch({ ...branch });
  };

  // fetching branches
  useEffect(() => {
    setFetchLoading(true);
    dispatch(fetchingBranches());
    axios
      .get(`/api/branches`)
      .then((res) => {
        dispatch(fetchedBranches(res?.data?.data));
      })
      .catch((err) => {
        dispatch(fetchedError());
      })
      .finally(() => setFetchLoading(false));
  }, [refreshBranches]);
  return (
    <div>
      <HeaderWrapper>
        <HeaderItem type="secondary">
          <div className="header__icon">
            <Palette2 />
          </div>
          <div className="header__content">
            <p className="header__title">Филиалы</p>
            <p>Количество: </p>
            <p className="header__result">{branches.length}</p>
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
          modalType === "add" ? "Добавить новый филиал" : "Обновить филиал"
        }
        onClose={() => {
          setVisible(!visible);
        }}
        maskClosable={true}
      >
        <AddBranchForm
          modalType={modalType}
          editingBranch={editingBranch}
          visible={visible}
          setVisible={() => setVisible(false)}
        />
      </Drawer>
      <Spin spinning={fetchLoading}>
        <div className="grid sm:w-2/3 lg:w-1/2 gap-6">
          {branches?.map((branch) => (
            <div
              key={branch?.id}
              className="flex drop-shadow-md rounded-md gap-2 bg-white p-4 justify-start items-center"
            >
              <p className="mr-2">{branch?.id}.</p>
              <p className="text-xl">{branch?.name}</p>
              <div className="flex gap-2 ml-auto">
                <IconButton
                  color="primaryOutlined"
                  onClick={() => {
                    onEditBranch(branch);
                  }}
                >
                  <PencilSquare />
                </IconButton>
                <IconButton
                  color="dangerOutlined"
                  onClick={() => {
                    onDeleteBranch(branch);
                  }}
                >
                  <Trash />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </Spin>
    </div>
  );
}
