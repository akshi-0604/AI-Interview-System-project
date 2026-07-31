import InterviewHistory from "../../components/admin/InterviewHistory";
import AdminStats from "../../components/admin/AdminStats";

function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold mb-8">
                Admin Dashboard
            </h1>

            <AdminStats />

            <InterviewHistory />
        </div>
    );
}

export default AdminDashboard;