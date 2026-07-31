import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await API.post(`/auth/reset-password/${token}`, {
        password,
      });

      alert(res.data.message);
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-3 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-3 rounded mb-6"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Update Password
          </button>

        </form>
      </div>
    </div>
  );
}

export default ResetPassword;