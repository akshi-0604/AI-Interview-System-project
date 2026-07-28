import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          AI Interview System
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex gap-8 font-medium text-gray-700">

          <li>
            <a href="#home" className="hover:text-blue-600 transition">
              Home
            </a>
          </li>

          <li>
            <a href="#features" className="hover:text-blue-600 transition">
              Features
            </a>
          </li>

          <li>
            <a href="#about" className="hover:text-blue-600 transition">
              About
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-blue-600 transition">
              Contact
            </a>
          </li>

        </ul>

        {/* Buttons */}
        <div className="flex gap-3">

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