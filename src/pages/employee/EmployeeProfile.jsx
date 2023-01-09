import { useSelector } from "react-redux";

import { Card, Tabs } from "antd";
import photo from "../../assets/img/Default-avatar.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function EmployeeProfile() {
  const { employeesData } = useSelector((state) => state.employees);
  const navigate = useNavigate();
  useEffect(() => {
    if (!employeesData?.id) {
      navigate("/employees", { replace: true });
    }
  }, []);

  return (
    <Tabs>
      <Tabs.TabPane tab="Profil" key="item-1" className="pt-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Card className="md:p-4 mb-4 rounded-sm drop-shadow-md">
              <div className="flex text-center flex-col items-center mb-4">
                <img
                  alt=""
                  src={employeesData?.photo ? employeesData?.photo : photo}
                  className="w-32 h-32 mx-auto rounded-sm -mt-28 mb-4"
                />
                <p className="text-xl font-bold mb-4 text-slate-700">
                  {employeesData?.name}
                </p>
              </div>

              <div className="grid md:grid-cols-2 mb-2 md:mb-4">
                <label className="text-slate-600">Телефон:</label>
                <p>{employeesData?.phone}</p>
              </div>
              <div className="grid mb-2 md:mb-4">
                <label className="text-slate-600 mb-1">Роли:</label>
                <div className="flex flex-wrap gap-2">
                  {employeesData?.role?.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 rounded-md text-violet-500 border border-violet-500 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-slate-600">Филиалы:</label>
                <br />
                <div className="mt-2">
                  <span className="px-2 py-0.5 rounded-md text-cyan-500 border border-cyan-500 text-sm">
                    Saodat
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Tabs.TabPane>
    </Tabs>
  );
}
