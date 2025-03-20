import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <NavLink to="/">لوگو</NavLink>
        </div>

        <ul className="flex space-x-6 text-white">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-yellow-400" : "hover:text-gray-300"
              }
            >
              خانه
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-yellow-400" : "hover:text-gray-300"
              }
            >
              درباره ما
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/todos"
              className={({ isActive }) =>
                isActive ? "text-yellow-400" : "hover:text-gray-300"
              }
            >
              todo
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;