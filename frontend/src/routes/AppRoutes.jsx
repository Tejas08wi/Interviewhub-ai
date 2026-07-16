import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import CandidateRegister from "../pages/auth/CandidateRegister";
import RecruiterRegister from "../pages/auth/RecruiterRegister";

import ProtectedRoute from "./ProtectedRoute";

import CandidateLayout from "../layouts/CandidateLayout";
import RecruiterLayout from "../layouts/RecruiterLayout";
import AdminLayout from "../layouts/AdminLayout"; // <-- Added missing import

import CandidateDashboard from "../pages/candidate/Dashboard";
import Profile from "../pages/candidate/Profile";
import Resume from "../pages/candidate/Resume";
import ResumeAnalysis from "../pages/candidate/ResumeAnalysis";
import Interview from "../pages/candidate/Interview";
import Jobs from "../pages/candidate/Jobs";
import Applications from "../pages/candidate/Applications";

import RecruiterProfile from "../pages/recruiter/Profile";
import RecruiterJobs from "../pages/recruiter/Jobs";
import JobForm from "../pages/recruiter/JobForm";
import RecruiterApplications from "../pages/recruiter/Applications";
import RecruiterDashboard from "../pages/recruiter/Dashboard";

// <-- Added missing Admin imports with explicit aliases to prevent naming collisions
import AdminDashboard from "../pages/admin/Dashboard";
import AdminCandidates from "../pages/admin/Candidates";
import AdminRecruiters from "../pages/admin/Recruiters";
import AdminJobs from "../pages/admin/Jobs";
import AdminApplications from "../pages/admin/Applications";
import AdminInterviews from "../pages/admin/Interviews";

function NotFound() {
  return <h2>404 Page Not Found</h2>;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CandidateRegister />} />
        <Route path="/recruiter/register" element={<RecruiterRegister />} />

        {/* Candidate Routes */}
        <Route
          path="/candidate"
          element={
            <ProtectedRoute allowedRoles={["CANDIDATE"]}>
              <CandidateLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<CandidateDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="resume" element={<Resume />} />
          <Route path="resume-analysis" element={<ResumeAnalysis />} />
          <Route path="interview" element={<Interview />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="applications" element={<Applications />} />
        </Route>

        {/* Recruiter */}
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute allowedRoles={["RECRUITER"]}>
              <RecruiterLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="profile" element={<RecruiterProfile />} />
          <Route path="jobs" element={<RecruiterJobs />} />
          <Route path="jobs/create" element={<JobForm />} />
          <Route path="jobs/edit/:jobId" element={<JobForm />} />
          <Route
            path="jobs/:jobId/applications"
            element={<RecruiterApplications />}
          />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="candidates" element={<AdminCandidates />} />
          <Route path="recruiters" element={<AdminRecruiters />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="interviews" element={<AdminInterviews />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}