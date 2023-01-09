import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import InputMask from "react-input-mask";
import { Form, Input, message, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "../../axios/axios";
import { checkUserIdLoggedIn, login } from "../../redux/loginSlice";
import { MyButton } from "../../UI/Button.style";

const LOGIN_URL = "https://crm.my-project.site/api/signIn";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/schedule")
      .then((res) => {
        navigate("/", { replace: true });
      })
      .catch((err) => setLogged(false))
      .finally(() => setLoading(false));
  }, [location]);

  useEffect(() => {
    checkUserIdLoggedIn();
  }, []);

  const onFinish = async (e) => {
    setLoading(true);
    axios
      .post(
        LOGIN_URL,
        JSON.stringify({
          phone: "+998" + phone?.split(" ").join(""),
          password,
          role: null,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      )
      .then((response) => {
        dispatch(
          login({
            token: response?.data?.data?.token,
            user: {
              name: response?.data?.data?.name,
              id: response?.data?.data?.id,
              role: response?.data?.data?.role,
            },
          })
        );
        setPhone("");
        setPassword("");
        localStorage.setItem("crm_token", response?.data?.data?.token);
        message.success("Успешно введено");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        if (err?.response?.data?.message === "phone or password incorrect") {
          message.error("Введен неверный логин или пароль!");
        } else if (err?.message === "Network Error") {
          message.error("У вас нет подключения к интернету!");
        } else {
          message.error("Произошла ошибка! Попробуйте еще раз!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Spin spinning={loading}>
      <div className="bg-gray-900 h-screen w-screen relative overflow-hidden flex justify-center items-center">
        <div className="h-96 w-96 bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
        <div className="h-80 w-80 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute -bottom-44 md:-bottom-20 -left-40 md:-left-20 transform rotate-180 animate-pulse"></div>
        <div className="container h-96 md:w-96 bg-white bg-opacity-10 rounded-2xl drop-shadow px-8 relative z-2 backdrop-filter backdrop-blur-lg">
          <Form
            onFinish={onFinish}
            className="h-full flex flex-col justify-evenly items-center -mx-3"
          >
            <div className="text-white text-xl md:text-2xl px-4 text-center tracking-widest">
              SAODAT LEARNING CENTER
            </div>
            <InputMask
              mask="99 999 99 99"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              value={phone}
              maskChar={null}
            >
              {(props) => (
                <Input
                  required
                  {...props}
                  addonBefore="+998"
                  className="bg-white focus:outline-none tracking-wide"
                  placeholder="телефон"
                />
              )}
            </InputMask>
            <Input.Password
              type="password"
              placeholder="пароль"
              className="bg-white focus:outline-none tracking-wide login-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone className="text-slate-500" />
                ) : (
                  <EyeInvisibleOutlined className="text-slate-500" />
                )
              }
            />
            <MyButton color="primary" htmlType="submit">
              Вход
            </MyButton>
          </Form>
        </div>
      </div>
    </Spin>
  );
}
