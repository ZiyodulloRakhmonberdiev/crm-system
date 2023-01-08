import { useSelector } from "react-redux";

import { Card, Tabs } from "antd";
import photo from "../../assets/img/Default-avatar.jpg";
import InProcess from "../../UI/InProcess.style";

export default function TeacherProfile() {
  const { teachersData } = useSelector((state) => state.teachers);

  return (
    <Tabs>
      <Tabs.TabPane tab="Профиль" key="item-1" className="pt-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Card className="md:p-4 mb-4 rounded-sm drop-shadow-md">
              <div className="flex text-center flex-col items-center mb-4">
                <img
                  alt=""
                  src={teachersData?.photo ? teachersData?.photo : photo}
                  className="w-32 h-32 mx-auto rounded-sm -mt-28 mb-4"
                />
                <p className="text-xl font-bold mb-4 text-slate-700">
                  {teachersData?.name}
                </p>
              </div>
              <div className="grid md:grid-cols-2 mb-2 md:mb-4">
                <label className="text-slate-600">Телефон:</label>
                <p>{teachersData?.phone}</p>
              </div>
              <div className="grid mb-2 md:mb-4">
                <label className="text-slate-600 mb-1">Роли:</label>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 rounded-md text-violet-500 border border-violet-500 text-sm">
                    Teacher
                  </span>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <p className="text-xl font-bold mb-4">Группы</p>
            <InProcess />
          </div>
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Зарплата" key="item-2">
        <InProcess />
      </Tabs.TabPane>
    </Tabs>
  );
}
