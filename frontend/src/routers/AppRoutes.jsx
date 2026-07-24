import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Candidate/Login.jsx";
import Register from "../pages/Candidate/Register.jsx";
import Home from "../pages/Candidate/Home.jsx";
import Dashboard from "../pages/Candidate/Dashboard.jsx";
import ResumeUpload from "../pages/Candidate/ResumeUpload.jsx";
import Interview from "../pages/Candidate/Interview";
import Result from "../pages/Candidate/Result";
import AdminDashboard from "../pages/admin/Dashboard";
import InterviewDetails from "../pages/admin/InterviewDetails";


function AppRoutes() {

  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/candidate/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/candidate/resume"
        element={<ResumeUpload />}
      />

      <Route
        path="/candidate/interview"
        element={<Interview />}
      />

      <Route
        path="/candidate/result"
        element={<Result />}
      />

      <Route path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin/interview/:id"
        element={<InterviewDetails />}
      />

    </Routes>
  );
}


export default AppRoutes;