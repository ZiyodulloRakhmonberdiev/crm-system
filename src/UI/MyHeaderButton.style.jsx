import { MyButton } from "./Button.style";

const MyHeaderButton = ({ setVisible, setModalType }) => {
  return (
    <MyButton
      onClick={() => {
        setVisible();
        setModalType();
      }}
      className="header__button"
    >
      Добавить
    </MyButton>
  );
};

export default MyHeaderButton;
