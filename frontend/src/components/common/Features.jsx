import { FaRobot, FaFileAlt, FaVideo, FaChartLine } from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaRobot size={40} className="text-blue-600" />,
      title: "AI Interview",
      description:
        "Adaptive AI asks technical and HR questions based on the candidate's resume and previous answers.",
    },
    {
      icon: <FaFileAlt size={40} className="text-green-600" />,
      title: "Resume Analysis",
      description:
        "Automatically extracts candidate skills, education, experience, and generates interview questions.",
    },
    {
      icon: <FaVideo size={40} className="text-red-600" />,
      title: "Live Proctoring",
      description:
        "Detects mobile phones, multiple faces, no face, voice anomalies, and lip-sync mismatches.",
    },
    {
      icon: <FaChartLine size={40} className="text-purple-600" />,
      title: "Smart Evaluation",
      description:
        "Scores candidates in real time and generates detailed reports for administrators.",
    },
  ];

  return (
    <section
  id="features"
  className="py-20 bg-gray-100"
>
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">
  Why Choose Our Platform?
</h2>

        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-14">
  Experience next-generation AI interviews with resume analysis,
  voice interaction, live monitoring, intelligent evaluation,
  and comprehensive performance reports.
</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 hover:shadow-2xl hover:-translate-y-3 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-center mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-center leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Features;