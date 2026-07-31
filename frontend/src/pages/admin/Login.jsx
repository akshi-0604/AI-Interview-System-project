import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../../services/api";
import Button from "../../components/common/Button";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", formData);

      if (response.data.user.role !== "admin") {
        alert("You are not authorized as Admin.");
        return;
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);

      alert("Admin Login Successful");

      navigate("/admin/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to access the Admin Dashboard.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="relative mb-6">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <Button
            type="submit"
            text="Admin Login"
            className="w-full bg-gray-900 hover:bg-black text-white"
          />

        </form>

        <p className="text-center mt-8 text-gray-600">
          <Link
            to="/"
            className="text-blue-600 font-semibold"
          >
            Back to Home
          </Link>
        </p>

      </div>
    </div>
  );
}

export default AdminLogin;