import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/candidate/Login.jsx";
import Register from "../pages/candidate/Register.jsx";
import Home from "../pages/candidate/Home.jsx";
import Dashboard from "../pages/candidate/Dashboard.jsx";
import ResumeUpload from "../pages/candidate/ResumeUpload.jsx";
import Interview from "../pages/candidate/Interview";
import Result from "../pages/candidate/Result";
import AdminDashboard from "../pages/admin/Dashboard";
import InterviewDetails from "../pages/admin/InterviewDetails";
import ForgotPassword from "../pages/candidate/ForgotPassword";


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

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

    </Routes>
  );
}


export default AppRoutes;