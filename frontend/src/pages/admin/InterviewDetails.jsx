import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function InterviewDetails() {
  const { id } = useParams();

  const [interview, setInterview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInterview();
  }, []);

  const fetchInterview = async () => {
    try {
      const res = await API.get(`/interview/${id}`);
      setInterview(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!interview) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-3xl font-bold">
          Loading Interview...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          Interview Report
        </h1>

         <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            ← Back
          </button>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="font-semibold">
              Candidate Name
            </p>

            <p className="text-lg">
              {interview.user?.fullName}
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Email
            </p>

            <p className="text-lg">
              {interview.user?.email}
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Overall Score
            </p>

            <p className="text-green-600 text-2xl font-bold">
              {interview.score}
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Total Questions
            </p>

            <p className="text-lg">
              {interview.totalQuestions}
            </p>
          </div>

        </div>

      </div>

      {/* Violations */}

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Proctoring Report
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div className="bg-red-100 p-4 rounded-lg">
            No Face Violations
            <h2 className="text-3xl font-bold">
              {interview.noFaceViolations}
            </h2>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">
            Multiple Face Violations
            <h2 className="text-3xl font-bold">
              {interview.multipleFaceViolations}
            </h2>
          </div>

          <div className="bg-orange-100 p-4 rounded-lg">
            Tab Switches
            <h2 className="text-3xl font-bold">
              {interview.tabSwitchViolations}
            </h2>
          </div>

          <div className="bg-purple-100 p-4 rounded-lg">
            Fullscreen Violations
            <h2 className="text-3xl font-bold">
              {interview.fullscreenViolations}
            </h2>
          </div>

        </div>

      </div>

      {/* Transcript */}

      <h2 className="text-3xl font-bold mb-6">
        AI Interview Transcript
      </h2>

      {interview.transcript?.map((item, index) => (

        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >

          <h2 className="text-2xl font-bold text-blue-700 mb-6">
            Question {index + 1}
          </h2>

          <div className="mb-4">

            <h3 className="font-bold">
              Question
            </h3>

            <p>{item.question}</p>

          </div>

          <div className="mb-4">

            <h3 className="font-bold">
              Candidate Answer
            </h3>

            <p>{item.answer}</p>

          </div>

          <div className="mb-4">

            <h3 className="font-bold text-green-700">
              AI Feedback
            </h3>

            <p>{item.feedback}</p>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-green-100 p-4 rounded-lg">

              <h3 className="font-bold">
                Strengths
              </h3>

              <p>{item.strengths}</p>

            </div>

            <div className="bg-red-100 p-4 rounded-lg">

              <h3 className="font-bold">
                Weaknesses
              </h3>

              <p>{item.weaknesses}</p>

            </div>

          </div>

          <div className="bg-blue-100 p-4 rounded-lg mt-6">

            <h3 className="font-bold">
              Improvement Suggestions
            </h3>

            <p>{item.improvement}</p>

          </div>

          <div className="flex justify-between mt-8">

            <div>

              <h3 className="font-bold">
                AI Score
              </h3>

              <p className="text-green-700 text-2xl font-bold">
                {item.score} / 5
              </p>

            </div>

            <div>

              <h3 className="font-bold">
                Confidence
              </h3>

              <p className="text-blue-700 text-2xl font-bold">
                {item.confidence}%
              </p>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default InterviewDetails;