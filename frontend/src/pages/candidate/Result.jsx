import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score || 0;
  const total = location.state?.total || 20;
  const noFaceViolations =
    location.state?.noFaceViolations || 0;

  const multipleFaceViolations =
    location.state?.multipleFaceViolations || 0;

  const tabSwitchViolations =
    location.state?.tabSwitchViolations || 0;

  const fullscreenViolations =
    location.state?.fullscreenViolations || 0;

  const percentage = ((score / (total * 5)) * 100).toFixed(0);

  let performance = "";
  let color = "";

  if (percentage >= 90) {
    performance = "Excellent";
    color = "text-green-600";
  } else if (percentage >= 70) {
    performance = "Good";
    color = "text-blue-600";
  } else if (percentage >= 50) {
    performance = "Average";
    color = "text-yellow-600";
  } else {
    performance = "Needs Improvement";
    color = "text-red-600";
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-xl">

        <h1 className="text-4xl font-bold text-center text-red-600">
          THIS IS MY NEW RESULT PAGE
        </h1>
         <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            ← Back
          </button>


        <div className="mt-8 space-y-5">

          <div className="flex justify-between">
            <span>Total Questions</span>
            <span>{total}</span>
          </div>

          <div className="flex justify-between">
            <span>Final Score</span>
            <span>{score}</span>
          </div>

          <div className="flex justify-between">
            <span>Percentage</span>
            <span>{percentage}%</span>
          </div>

          <div className="flex justify-between">
            <span>Performance</span>
            <span className={`font-bold ${color}`}>
              {performance}
            </span>
          </div>

          <div className="flex justify-between">
            <span>No Face Violations</span>
            <span>{noFaceViolations}</span>
          </div>

          <div className="flex justify-between">
            <span>Multiple Face Violations</span>
            <span>{multipleFaceViolations}</span>
          </div>

          <div className="flex justify-between">
            <span>Tab Switch Violations</span>
            <span>{tabSwitchViolations}</span>
          </div>

          <div className="flex justify-between">
            <span>Fullscreen Violations</span>
            <span>{fullscreenViolations}</span>
          </div>

        </div>

        <button
          onClick={() => {
            console.log("Dashboard button clicked");
            navigate("/candidate/dashboard");
          }}
          className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default Result;