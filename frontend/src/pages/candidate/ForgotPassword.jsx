import { useState } from "react";
import API from "../../services/api";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Forgot Password button clicked");
        console.log("Email:", email);

        try {
            const response = await API.post("/auth/forgot-password", {
                email,
            });

            console.log(response.data);

            alert(response.data.message);

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">

                    Forgot Password

                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Enter Registered Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-3 rounded-lg mb-6"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg"
                    >
                        Send Reset Link
                    </button>

                </form>

            </div>

        </div>

    );

}

export default ForgotPassword;