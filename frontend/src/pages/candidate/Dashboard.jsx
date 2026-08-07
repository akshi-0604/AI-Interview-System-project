import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import Sidebar from "../../components/candidate/Sidebar";
import Topbar from "../../components/candidate/Topbar";
import DashboardCard from "../../components/candidate/DashboardCard";
import RecentInterView from "../../components/candidate/RecentInterView";
import ResumeUpload from "../../components/candidate/ResumeUpload";
import StartInterview from "../../components/candidate/StartInterview";

import {
  FileText,
  Trophy,
  Clock,
  BarChart3,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    best: 0,
    latest: 0,
  });

  // Protect Dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Load Dashboard Data
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await API.get("/interview");

      const interviews = res.data;

      if (interviews.length === 0) return;

      const total = interviews.length;

      const scores = interviews.map((item) => item.score);

      const average = (
        scores.reduce((a, b) => a + b, 0) / total
      ).toFixed(0);

      const best = Math.max(...scores);

      const latest = interviews[interviews.length - 1].score;

      setStats({
        total,
        average,
        best,
        latest,
      });

    } catch (error) {
      console.log(error);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    alert("Logged out successfully.");

    navigate("/");
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 dark:bg-gray-900">

      <Sidebar />

      <div className="flex-1 ml-64 bg-gray-100 dark:bg-gray-900 min-h-screen overflow-y-auto transition-colors duration-300">

        <Topbar />

        <div className="p-4 lg:p-8">

          {/* Dashboard Heading */}

          <div className="flex justify-between items-center mb-6">

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
            >
              Logout
            </button>

          </div>

          {/* Dashboard Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">

            <DashboardCard
              title="Total Interviews"
              value={stats.total}
              icon={<FileText size={28} />}
              color="bg-blue-600"
            />

            <DashboardCard
              title="Average Score"
              value={`${stats.average}%`}
              icon={<BarChart3 size={28} />}
              color="bg-green-600"
            />

            <DashboardCard
              title="Pending Interviews"
              value="0"
              icon={<Clock size={28} />}
              color="bg-yellow-500"
            />

            <DashboardCard
              title="Best Score"
              value={`${stats.best}%`}
              icon={<Trophy size={28} />}
              color="bg-purple-600"
            />

          </div>

          <RecentInterView />

          <ResumeUpload />

          <StartInterview />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;