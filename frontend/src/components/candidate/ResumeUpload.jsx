import { useState } from "react";
import API from "../../services/api";
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react";

function ResumeUpload() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!resume) {
      setMessage("Please choose a resume.");
      return;
    }

    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("user", localStorage.getItem("userId"));

    console.log("User ID:", localStorage.getItem("userId"));
    try {
      setLoading(true);

      console.log("User ID:", localStorage.getItem("userId"));
      console.log("Token:", localStorage.getItem("token"));

      const res = await API.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message);
      setResume(null);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Resume Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 mt-8">

      <h2 className="text-2xl font-bold mb-2">
        Upload Resume
      </h2>

      <p className="text-gray-500  dark:text-gray-400 mb-6">
        Upload your latest resume before attending the interview.
      </p>

      <label className="border-2 border-dashed border-blue-300 rounded-xl p-10 flex flex-col items-center cursor-pointer hover:bg-blue-50 transition">

        <Upload
          size={55}
          className="text-blue-600  dark:text-blue-300 mb-4"
        />

        <span className="bg-blue-600 text-white px-5 py-3 rounded-lg">
          Choose Resume
        </span>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          hidden
          onChange={(e) => setResume(e.target.files[0])}
        />

      </label>

      {resume && (

        <div className="flex items-center justify-between mt-5 bg-green-50 border border-green-200 rounded-lg px-4 py-3">

          <div className="flex items-center">

            <FileText className="mr-2 text-green-600" />

            <span className="text-gray-700 dark:text-gray-200">
              {resume.name}
            </span>

          </div>

        </div>

      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`mt-6 w-full py-3 rounded-lg text-white transition
${loading
            ? "bg-gray-400   cursor-not-allowed"
            : "bg-blue-600  hover:bg-blue-700"
          }`}
      >

        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={18} className="animate-spin" />
            Uploading...
          </span>
        ) : (
          "Upload Resume"
        )}

      </button>

      {message && (

        <div className="mt-5 bg-green-100  border border-green-300 rounded-lg p-3 flex items-center text-green-700 ">

          <CheckCircle className="mr-2" />

          {message}

        </div>

      )}

    </div>
  );
}

export default ResumeUpload;