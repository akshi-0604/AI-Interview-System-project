import {
  LayoutDashboard,
  Mic,
  FileText,
  BarChart3,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black  bg-opacity-50 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static top-0 left-0
          w-64 h-screen
          bg-gray-900 text-white
          p-6
          z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <h1 className="text-2xl font-bold mb-10">
          AI Interview
        </h1>

        <nav className="space-y-3">

          <Link
            to="/candidate/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/candidate/interview"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
          >
            <Mic size={20} />
            <span>Start Interview</span>
          </Link>

          <Link
            to="/candidate/resume"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
          >
            <FileText size={20} />
            <span>Resume</span>
          </Link>

          <Link
            to="/candidate/result"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
          >
            <BarChart3 size={20} />
            <span>Results</span>
          </Link>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
            <User size={20} />
            <span>Profile</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
            <Settings size={20} />
            <span>Settings</span>
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              setOpen(false);
              window.location.href = "/login";
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 mt-10"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>

        </nav>
      </div>
    </>
  );
}

export default Sidebar;