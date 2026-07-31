import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import API from "../../services/api";
import Button from "../../components/common/Button";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await API.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      alert(response.data.message);

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Register to start your AI Interview.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="relative mb-4">
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

          <div className="relative mb-6">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-4 text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <Button
            type="submit"
            text="Create Account"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          />

        </form>

        <div className="flex items-center my-6">
          <hr className="flex-1" />
          <span className="px-3 text-gray-400">OR</span>
          <hr className="flex-1" />
        </div>

        <div className="flex justify-center">

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log("Google Login Success");
              console.log(credentialResponse);

              alert("Google Login Successful");

              navigate("/candidate/dashboard");
            }}

            onError={() => {
              alert("Google Login Failed");
            }}
          />

        </div>

        <p className="text-center mt-8 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;