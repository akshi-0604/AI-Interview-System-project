import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);

  return (
<nav className="bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600 dark:text-blue-400"
        >
          AI Interview System
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex gap-8 font-medium text-gray-800 dark:text-white">

          <li>
            <a href="#home" className="hover:text-blue-700 transition">
              Home
            </a>
          </li>

          <li>
            <a href="#features" className="hover:text-blue-700 transition">
              Features
            </a>
          </li>

          <li>
            <a href="#about" className="hover:text-blue-700 transition">
              About
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-blue-700 transition">
              Contact
            </a>
          </li>

        </ul>

        {/* Buttons */}

        <div className="flex gap-3">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="
    border
    rounded-lg
    px-3
    py-2
    bg-white
    text-gray-800
    dark:bg-gray-800
    dark:text-white
    dark:border-gray-600
  "
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

          <Button
            text="Candidate Login"
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          />

          <Button
            text="Register"
            onClick={() => navigate("/register")}
            className="bg-green-600 hover:bg-green-700 text-white"
          />

          <Button
            text="Admin Login"
            onClick={() => navigate("/admin/login")}
            className="bg-gray-900 hover:bg-black text-white"
          />

        </div>

      </div>
    </nav>
  );
}

export default Navbar;