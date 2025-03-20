import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* بخش لینک‌ها */}
        <ul className="flex space-x-6 mb-4 md:mb-0">
          <li>
            <NavLink
              to="/"
              className="hover:text-gray-300"
            >
              خانه
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="hover:text-gray-300"
            >
              درباره ما
            </NavLink>
          </li>
          <li>
            <Link
              to="/todos"
              className="hover:text-gray-300"
            >
              todos
            </Link>
          </li>
        </ul>

        {/* بخش کپی‌رایت */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} همه حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
};

export default Footer;