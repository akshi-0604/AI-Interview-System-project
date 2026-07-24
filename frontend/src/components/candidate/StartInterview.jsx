import { useNavigate } from "react-router-dom";

function StartInterview() {
  const navigate = useNavigate();

  const handleStart = () => {
    console.log("Button Clicked");
    navigate("/candidate/interview");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        Ready for Interview?
      </h2>

      <button
        type="button"
        onClick={handleStart}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer"
      >
        Start Interview
      </button>
    </div>
  );
}

export default StartInterview;