import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";


const ResumeUpload = () => {

    const [resume, setResume] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    // Select resume file
    const handleFileChange = (e) => {

        setResume(e.target.files[0]);

    };
    // Upload resume
    const handleUpload = async () => {
        if (!resume) {

            setMessage("Please select your resume file.");

            return;
        }
        const formData = new FormData();

        formData.append("resume", resume);
        try {
            setLoading(true);

            setMessage("");

            const response = await API.post(
                "/resume/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setMessage(response.data.message);

            setResume(null);
        }
        catch (error) {
            console.log(error);
            setMessage(
                error.response?.data?.message ||
                "Resume upload failed."
            );
        }
        finally {

            setLoading(false);
        }
    };
    return (

        <div className="resume-upload-container">
            <h2>
                Upload Resume
            </h2>

            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
                ← Back
            </button>
            <p>
                Upload your latest resume for AI Interview evaluation.
            </p>
            <input

                type="file"

                accept=".pdf,.doc,.docx"

                onChange={handleFileChange}

            />
            <button
                onClick={handleUpload}

                disabled={loading}
            >
                {
                    loading
                        ? "Uploading..."
                        : "Upload Resume"
                }

            </button>
            {
                message && (
                    <p>
                        {message}
                    </p>

                )
            }

        </div>

    );

};


export default ResumeUpload;