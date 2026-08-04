import { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

function InterviewHistory() {
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        fetchInterviews();
    }, []);

    const fetchInterviews = async () => {
        try {
            const res = await API.get("/interview/results");
            setInterviews(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">
                Candidate Interview Reports
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-3">Candidate</th>

                            <th className="p-3">Email</th>

                            <th className="p-3">Score</th>

                            <th className="p-3">No Face</th>

                            <th className="p-3">Multi Face</th>

                            <th className="p-3">Tab Switch</th>

                            <th className="p-3">Fullscreen</th>

                            <th className="p-3">Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {interviews.map((item) => (

                            <tr
                                key={item._id}
                                className="border-b text-center hover:bg-gray-50"
                            >

                                <td className="p-3">
                                    {item.user?.fullName}
                                </td>

                                <td>
                                    {item.user?.email}
                                </td>

                                <td>
                                    {item.score}
                                </td>

                                <td>
                                    {item.noFaceViolations}
                                </td>

                                <td>
                                    {item.multipleFaceViolations}
                                </td>

                                <td>
                                    {item.tabSwitchViolations}
                                </td>

                                <td>
                                    {item.fullscreenViolations}
                                </td>

                                <td>
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </td>
                                

                                <td>
                                    <Link
                                        to={`/admin/interview/${item._id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                    >
                                        View Details
                                    </Link>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default InterviewHistory;