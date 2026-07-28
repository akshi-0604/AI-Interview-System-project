import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">

        
        <div className="inline-block bg-white/20 px-5 py-2 rounded-full text-sm font-semibold mb-6">
           AI Powered Recruitment Platform
        </div>

        
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Crack Your Next
          <br />
          <span className="text-yellow-300">
            AI Powered Interview
          </span>
        </h1>

        
        <p className="mt-8 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-8">
          Practice resume-based AI interviews with voice interaction,
          intelligent follow-up questions, instant evaluation,
          and detailed performance reports.
        </p>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-sm md:text-base">

          <div>
            📄
            <p className="mt-2 font-semibold">Resume Analysis</p>
          </div>

          <div>
            🎤
            <p className="mt-2 font-semibold">Voice Interview</p>
          </div>

          <div>
            🤖
            <p className="mt-2 font-semibold">AI Evaluation</p>
          </div>

          <div>
            📊
            <p className="mt-2 font-semibold">Performance Report</p>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">

          <Button
            text="Candidate Login"
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          />

          <Button
            text="Register"
            onClick={() => navigate("/register")}
            className="bg-green-600 hover:bg-green-700 text-white"
          />

          <Button
            text="Learn More"
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white text-blue-700 hover:bg-gray-200"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;