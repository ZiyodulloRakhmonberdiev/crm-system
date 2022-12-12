import { PieChartOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import {
  CashStack,
  Download,
  MicrosoftTeams,
  Mortarboard,
  House,
  Wallet2,
  DoorOpen,
  Layers,
  Palette2,
  Git,
  Coin,
  CurrencyExchange,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const { Sider } = Layout;
  const items = [
    getItem(<Link to="/">Главная страница</Link>, "home", <House />),
    getItem(<Link to="/leads">Заявки</Link>, "application", <Download />),
    getItem(<Link to="/students">Студенты</Link>, "pupils", <Mortarboard />),
    getItem(
      <Link to="/teachers">Учителя</Link>,
      "teachers",
      <MicrosoftTeams />
    ),
    getItem(<Link to="/groups">Группы</Link>, "groups", <TeamOutlined />),
    getItem("Финансы", "finance", <CashStack />, [
      getItem(
        <Link
          className="flex items-center justify-start gap-3"
          to="/finance/payments"
        >
          <Coin /> Все платежи
        </Link>,
        "payments"
      ),
      getItem(
        <Link
          className="flex items-center justify-start gap-3"
          to="/finance/expenses"
        >
          <CurrencyExchange /> Учет расходов
        </Link>,
        "expenses"
      ),
    ]),
    getItem(<Link to="/report">Отчеты</Link>, "report", <PieChartOutlined />),
    getItem("Дополнительные", "addition", <Wallet2 />, [
      getItem(
        <Link className="flex items-center justify-start gap-3" to="/employees">
          <Layers /> Сотрудники
        </Link>,
        "employees"
      ),
      getItem(
        <Link className="flex items-center justify-start gap-3" to="/courses">
          <Palette2 /> Курсы
        </Link>,
        "courses"
      ),
      getItem(
        <Link className="flex items-center justify-start gap-3" to="/rooms">
          <DoorOpen /> Кабинеты
        </Link>,
        "rooms"
      ),
      getItem(
        <Link className="flex items-center justify-start gap-3" to="/branches">
          <Git /> Филиалы
        </Link>,
        "branches"
      ),
    ]),
  ];

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="56"
        style={{ height: "100vh" }}
        className="mt-14 pt-4 fixed overflow-y-scroll pb-24"
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
    </Layout>
  );
}
