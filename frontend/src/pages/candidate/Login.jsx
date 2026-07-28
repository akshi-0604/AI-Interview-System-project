import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending:", formData);

    try {
      const response = await API.post("/auth/login", formData);

      console.log(response.data);

      console.log("Success:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);

      alert("Login Successful!");
      navigate("/candidate/dashboard");

    } catch (error) {
      console.log("Complete Error:", error);

      if (error.response) {
        console.log("Response Data:", error.response.data);
        console.log("Status:", error.response.status);
        alert(error.response.data.message);
      } else {
        console.log("Error Message:", error.message);
        alert(error.message);
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Candidate Login
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
          <div className="text-center mt-4">

            <button
              onClick={() => navigate("/forgot-password")}
              className="text-blue-600 hover:underline"
            >

              Forgot Password?

            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;