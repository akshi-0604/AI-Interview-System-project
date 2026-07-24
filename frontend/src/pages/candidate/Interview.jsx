import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import WebcamFeed from "../../components/candidate/WebcamFeed";
import { getQuestions } from "../../services/questionService";
import { evaluateAnswer } from "../../services/evaluationService";
import { getFollowupQuestion } from "../../services/followupService";

function Interview() {
  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const navigate = useNavigate();
  const [noFaceViolations, setNoFaceViolations] = useState(0);
  const [multipleFaceViolations, setMultipleFaceViolations] = useState(0);
  const [tabSwitchViolations, setTabSwitchViolations] = useState(0);
  const [fullscreenViolations, setFullscreenViolations] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
 


  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Time is up!");

      navigate("/candidate/result", {
        state: {
          score,
          total: questions.length,
        },

      });

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchViolations((prev) => prev + 1);

        alert("Warning! Tab switching detected.");
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  useEffect(() => {
    const enterFullscreen = async () => {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    };

    enterFullscreen();
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenViolations((prev) => prev + 1);

        alert("Warning! Fullscreen exited.");
      }
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await getQuestions();

      console.log("Questions from API:", data);

      setQuestions(data.questions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onstart = () => {
      console.log("🎤 Listening...");
      setIsListening(true);
    };

    recognitionInstance.onend = () => {
      console.log("🛑 Candidate Finished Speaking");
      setIsListening(false);
    };

    recognitionInstance.onerror = (e) => {
      console.log("Speech Error:", e.error);

      if (e.error === "not-allowed") {
        alert("Microphone permission denied.");
      }

      if (e.error === "audio-capture") {
        alert("No microphone detected.");
      }

      if (e.error === "no-speech") {
        recognitionInstance.stop();
      }

      setIsListening(false);
    };

    recognitionInstance.onresult = (event) => {
      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        transcript += event.results[i][0].transcript;
      }

      let finalTranscript = "";

      recognitionInstance.onresult = (event) => {
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        setAnswer(finalTranscript + interimTranscript);
        clearTimeout(window.speechTimer);

        window.speechTimer = setTimeout(() => {
          recognitionInstance.stop();
        }, 2500);
      };
    };

    setRecognition(recognitionInstance);
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      speakQuestion(questions[currentQuestion].question);
    }
  }, [currentQuestion, questions]);
  const speakQuestion = (text) => {
    if (!text) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    speech.onstart = () => {
      recognition?.stop();
    };

    speech.onend = () => {
      recognition?.start();
    };

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };


  const handleNext = async () => {
  if (!answer.trim()) {
    alert("Please answer the question before proceeding.");
    return;
  }

  try {
    setLoading(true);

    console.log("🔥 handleNext called");

    const evaluation = await evaluateAnswer(
      questions[currentQuestion].question,
      answer
    );

    const aiScore = evaluation.score;
    const feedback = evaluation.feedback;
    const strengths = evaluation.strengths;
    const weaknesses = evaluation.weaknesses;
    const improvement = evaluation.improvement;
    const confidence = evaluation.confidence;

    setFeedback(feedback);

    const updatedScore = score + aiScore;

    const currentTranscript = {
      question: questions[currentQuestion].question,
      answer,
      feedback,
      strengths,
      weaknesses,
      improvement,
      confidence,
      score: aiScore,
    };

    const updatedTranscript = [
      ...transcript,
      currentTranscript,
    ];

    setTranscript(updatedTranscript);

    console.log("AI Evaluation:", evaluation);

    if (currentQuestion < questions.length - 1) {

      const followup = await getFollowupQuestion(
        questions[currentQuestion].question,
        answer
      );

      const updatedQuestions = [...questions];

      updatedQuestions[currentQuestion + 1] = {
        ...updatedQuestions[currentQuestion + 1],
        question: followup.question,
      };

      setQuestions(updatedQuestions);

      setScore(updatedScore);

      setCurrentQuestion((prev) => prev + 1);

      setAnswer("");

      setFeedback("");

    } else {

      window.speechSynthesis.cancel();

      await API.post("/interview/save", {
        user: localStorage.getItem("userId"),
        transcript: updatedTranscript,
        score: updatedScore,
        totalQuestions: questions.length,
        noFaceViolations,
        multipleFaceViolations,
        tabSwitchViolations,
        fullscreenViolations,
      });

      navigate("/candidate/result", {
        state: {
          score: updatedScore,
          total: questions.length,
          transcript: updatedTranscript,
          noFaceViolations,
          multipleFaceViolations,
          tabSwitchViolations,
          fullscreenViolations,
        },
      });
    }

  } catch (error) {

    console.error(error);

    alert("Something went wrong. Please try again.");

  } finally {

    setLoading(false);

  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-6">
            AI Interview
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            ← Back
          </button>

          <div className="flex justify-between mb-6">

            <p className="font-semibold text-blue-600">
              Time Left
            </p>

            <p className="font-bold text-red-600">
              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </p>

          </div>

          <h2 className="text-xl font-semibold mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </h2>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
            <div
              className="bg-blue-600 h-3 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>

          <p className="text-xl font-semibold ">
            {questions[currentQuestion]?.question}
          </p>

          {isSpeaking && (
            <p className="text-blue-600 font-bold mt-2">
              🔊 AI is asking the question...
            </p>
          )}

          <div className="mb-3">
            {
              isListening ? (
                <p className="text-green-600 font-bold">
                  🎤 Listening...
                </p>
              ) : (
                <p className="text-gray-500">
                  Microphone Idle
                </p>
              )
            }
          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full mt-6 border rounded-lg p-4 h-36 resize-none"
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-4">

            <button
              onClick={() => recognition?.start()}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              🎤 Start Recording
            </button>

            <button
              onClick={() => recognition?.stop()}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              ⏹ Stop Recording
            </button>

          </div>

          {feedback && (
            <div className="bg-green-100 p-3 rounded-lg mt-4">
              <strong>AI Feedback:</strong>
              <p>{feedback}</p>
            </div>
          )}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mt-6">

            <p className="text-lg font-bold text-green-600">
              Score : {score}
            </p>

            <p className="text-red-600 font-semibold">
              Tab Switch Violations : {tabSwitchViolations}
            </p>

            <p className="text-red-600 font-semibold">
              Fullscreen Violations : {fullscreenViolations}
            </p>

            <button
              onClick={handleNext}
              disabled={!answer.trim() || loading}
              className={`px-6 py-3 rounded-lg text-white ${answer.trim() || loading
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              {
                loading
                  ? "Evaluating..."
                  : currentQuestion === questions.length - 1
                    ? "Finish Interview"
                    : "Next Question"
              }
            </button>

          </div>

        </div>

        {/* Right Side */}
        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-4">
            Live Proctoring
          </h2>

          <WebcamFeed
            noFaceViolations={noFaceViolations}
            setNoFaceViolations={setNoFaceViolations}
            multipleFaceViolations={multipleFaceViolations}
            setMultipleFaceViolations={setMultipleFaceViolations}
          />

          <div className="mt-6 space-y-3">

            <div className="bg-green-100 text-green-700 p-3 rounded-lg">
              ✅ Face Detected
            </div>

            <div className="bg-green-100 text-green-700 p-3 rounded-lg">
              🎤 Microphone Connected
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Interview;
