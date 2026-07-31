import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import API from "../../services/api";
import Button from "../../components/common/Button";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);

      if (rememberMe) {
        localStorage.setItem("rememberEmail", formData.email);
      }

      alert("Login Successful");

      navigate("/candidate/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Candidate Login
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Welcome back! Login to continue your AI Interview.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="relative mb-4">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
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

          <div className="flex justify-between items-center mb-6">

            <label className="flex items-center gap-2 text-sm text-gray-600">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />

              Remember Me

            </label>

            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </Link>

          </div>

          <Button
            type="submit"
            text="Candidate Login"
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
            onSuccess={async (credentialResponse) => {
              try {

                const response = await API.post("/auth/google", {
                  token: credentialResponse.credential,
                });

                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.user._id);

                alert("Google Login Successful");

                navigate("/candidate/dashboard");

              } catch (error) {
                alert("Google Login Failed");
              }
            }}

            onError={() => {
              alert("Google Login Failed");
            }}
          />

        </div>

        <p className="text-center mt-8 text-gray-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;