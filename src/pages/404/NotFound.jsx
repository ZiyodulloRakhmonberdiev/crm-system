import { Link } from "react-router-dom";
import { MyButton } from "../../UI/Button.style";

export default function NotFound() {
  return (
    <div className="bg-gray-900 h-screen w-screen relative overflow-hidden flex justify-center items-center">
      <div className="h-96 w-96 bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
      <div className="h-80 w-80 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute -bottom-44 md:-bottom-20 -left-40 md:-left-20 transform rotate-180 animate-pulse"></div>
      <div className="container w-3/4 py-14 px-4 bg-white bg-opacity-10 rounded-2xl drop-shadow px-8 relative z-2 backdrop-filter backdrop-blur-lg">
        <div className="h-full flex flex-col justify-evenly items-center -mx-3">
          <div className="text-white text-xl md:text-2xl px-4 text-center tracking-widest mb-4">
            Страница не найдена
          </div>
          <MyButton color="primary" htmlType="submit">
            <Link style={{ fontSize: 18 }} to="/" className="hover:text-white">
              Вернуться на главную страницу
            </Link>
          </MyButton>
        </div>
      </div>
    </div>
  );
}
