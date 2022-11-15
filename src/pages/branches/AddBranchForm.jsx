import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Input, message, Spin } from "antd";
import { v4 as uuidv4 } from "uuid";

import axios from "../../axios/axios";
import { refreshBranchesData } from "../../redux/branchesSlice";
import { MyButton } from "../../UI/Button.style";

export default function AddBranchForm({
  modalType,
  editingBranch,
  visible,
  setVisible,
}) {
  const [uploading, setUploading] = useState(false);

  const url = "/api/branches";
  const [branch, setBranch] = useState({
    name: "",
    branch_id: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (modalType === "add") {
      setBranch({
        name: "",
        branch_id: "",
      });
    } else {
      const { name, branch_id } = editingBranch;
      setBranch({
        name: name,
        branch_id: branch_id,
      });
    }
  }, [modalType, visible]);

  function handle(e) {
    const newBranch = { ...branch };
    newBranch[e.target.id] = e.target.value;
    setBranch(newBranch);
  }

  function submit(e) {
    e.preventDefault();
    const { name } = branch;
    if (name) {
      setUploading(true);
      if (modalType === "add") {
        axios
          .post(url, {
            name: branch.name,
          })
          .then((res) => {
            console.log(res);
            setBranch({
              name: "",
            });
            message.success("Филиал успешно добавлен!");
            dispatch(refreshBranchesData());
            setVisible();
          })
          .catch((err) => {
            message.error("Произошла ошибка! Попробуйте еще раз!");
          })
          .finally(() => setUploading(false));
      } else if (modalType === "update") {
        axios
          .patch(url + "/" + editingBranch?.id, {
            name: branch.name,
            branch_id: editingBranch?.id,
          })
          .then((res) => {
            setBranch({
              name: "",
            });
            message.success("Филиал успешно обновлен!");
            dispatch(refreshBranchesData());
            setVisible();
          })
          .catch((err) => {
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
        <p>Название филиала</p>
        <Input
          required
          id="name"
          value={branch?.name}
          onChange={(e) => {
            handle(e);
          }}
          type="text"
          className="mb-4 mt-2"
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
