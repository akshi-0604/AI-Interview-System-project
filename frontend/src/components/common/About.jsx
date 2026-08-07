import { FaUserGraduate, FaBrain, FaShieldAlt } from "react-icons/fa";

function About() {
  return (
    <section
      id="about"
      className="py-24  bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-gray-800  dark:text-gray-100 mb-5">
          About Our Platform
        </h2>

        <p className="text-center text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-16 leading-8">
          AI Interview System is an intelligent recruitment platform that
          helps candidates practice interviews while enabling organizations
          to evaluate technical and HR skills through AI-powered assessments,
          resume analysis, live proctoring, and automated scoring.
        </p>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition">
            <FaBrain className="text-blue-600 text-5xl mb-5" />
            <h3 className="text-2xl font-bold mb-4">
              AI Powered
            </h3>

            <p className="text-gray-600  dark:text-gray-300 leading-7">
              Intelligent interview questions generated dynamically based on
              candidate resumes and previous answers.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition">
            <FaShieldAlt className="text-green-600 text-5xl mb-5" />
            <h3 className="text-2xl font-bold mb-4">
              Secure Proctoring
            </h3>

            <p className="text-gray-600  dark:text-gray-300 leading-7">
              Live monitoring with face detection, mobile detection,
              fullscreen tracking and voice anomaly detection.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition">
            <FaUserGraduate className="text-purple-600 text-5xl mb-5" />
            <h3 className="text-2xl font-bold mb-4">
              Career Ready
            </h3>

            <p className="text-gray-600  dark:text-gray-300 leading-7">
              Practice interviews, receive AI feedback,
              improve confidence and prepare for real company interviews.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;
