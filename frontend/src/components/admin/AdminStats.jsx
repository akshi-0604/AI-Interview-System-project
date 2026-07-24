import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminStats() {
  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
    totalViolations: 0,
    bestScore: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/interview");

      const interviews = res.data;

      const totalInterviews = interviews.length;

      const totalScore = interviews.reduce(
        (sum, item) => sum + item.score,
        0
      );

      const averageScore =
        totalInterviews > 0
          ? (totalScore / totalInterviews).toFixed(1)
          : 0;

      const bestScore =
        totalInterviews > 0
          ? Math.max(...interviews.map((i) => i.score))
          : 0;

      const totalViolations = interviews.reduce(
        (sum, item) =>
          sum +
          item.noFaceViolations +
          item.multipleFaceViolations +
          item.tabSwitchViolations +
          item.fullscreenViolations,
        0
      );

      setStats({
        totalInterviews,
        averageScore,
        totalViolations,
        bestScore,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      <Card title="Total Interviews" value={stats.totalInterviews} />

      <Card title="Average Score" value={`${stats.averageScore}%`} />

      <Card title="Total Violations" value={stats.totalViolations} />

      <Card title="Best Score" value={`${stats.bestScore}%`} />

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-3xl font-bold mt-3">
        {value}
      </p>
    </div>
  );
}

export default AdminStats;
