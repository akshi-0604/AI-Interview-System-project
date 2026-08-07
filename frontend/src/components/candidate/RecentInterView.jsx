import { useEffect, useState } from "react";
import API from "../../services/api";

function RecentInterView() {
  const [interviews, setInterviews] = useState([]);
  console.log("Current interviews:", interviews);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
  try {
    console.log("Fetching interviews...");

    const res = await API.get("/interview");

    console.log("Response:", res.data);

    setInterviews(res.data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mt-8">

      <h2 className="text-2xl font-semibold mb-6">
        Recent Interviews
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>
            <tr className="border-b">
              <th className="py-3">Date</th>
              <th className="py-3">Score</th>
              <th className="py-3">Questions</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((item) => (
              <tr key={item._id}>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>{item.score}</td>
                <td>{item.totalQuestions}</td>
                <td>Completed</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default RecentInterView;