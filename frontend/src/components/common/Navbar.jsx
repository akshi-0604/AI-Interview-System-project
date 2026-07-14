import { Link } from "react-router-dom";
import Button from "./Button";

function Navbar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

                {/* Logo */}
                <h1 className="text-2xl font-bold text-blue-600">
                    AI Interview
                </h1>

                {/* Navigation */}
                <ul className="hidden md:flex gap-8 font-medium text-gray-700">
                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/">Features</Link>
                    </li>

                    <li>
                        <Link to="/">About</Link>
                    </li>
                </ul>

                {/* Buttons */}
                <Button
                    text="Candidate Login"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                />

                <Button
                    text="Admin Login"
                    className="bg-gray-900 hover:bg-black text-white"
                />

            </div>

        
    </nav >
  );
}

export default Navbar;