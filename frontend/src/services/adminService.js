import axiosInstance from "./axiosInstance";

const getDashboard = async () => {
  const response = await axiosInstance.get("/admin/dashboard");
  return response.data;
};

const getCandidates = async () => {
  const response = await axiosInstance.get("/admin/candidates");
  return response.data;
};

const getCandidateById = async (candidateId) => {
  const response = await axiosInstance.get(`/admin/candidates/${candidateId}`);
  return response.data;
};

const deleteCandidate = async (candidateId) => {
  const response = await axiosInstance.delete(`/admin/candidates/${candidateId}`);
  return response.data;
};
const getRecruiters = async () => {
  const response = await axiosInstance.get("/admin/recruiters");
  return response.data;
};

const getRecruiterById = async (recruiterId) => {
  const response = await axiosInstance.get(`/admin/recruiters/${recruiterId}`);
  return response.data;
};

const deleteRecruiter = async (recruiterId) => {
  const response = await axiosInstance.delete(`/admin/recruiters/${recruiterId}`);
  return response.data;
};
const getJobs = async () => {
  const response = await axiosInstance.get("/admin/jobs");
  return response.data;
};

const getJobById = async (jobId) => {
  const response = await axiosInstance.get(`/admin/jobs/${jobId}`);
  return response.data;
};

const deleteJob = async (jobId) => {
  const response = await axiosInstance.delete(`/admin/jobs/${jobId}`);
  return response.data;
};
const getApplications = async () => {
  const response = await axiosInstance.get("/admin/applications");
  return response.data;
};

const getApplicationById = async (applicationId) => {
  const response = await axiosInstance.get(
    `/admin/applications/${applicationId}`
  );
  return response.data;
};

const deleteApplication = async (applicationId) => {
  const response = await axiosInstance.delete(
    `/admin/applications/${applicationId}`
  );
  return response.data;
};
const getInterviews = async () => {
  const response = await axiosInstance.get("/admin/interviews");
  return response.data;
};

const getInterviewById = async (sessionId) => {
  const response = await axiosInstance.get(
    `/admin/interviews/${sessionId}`
  );
  return response.data;
};

const deleteInterview = async (sessionId) => {
  const response = await axiosInstance.delete(
    `/admin/interviews/${sessionId}`
  );
  return response.data;
};

const adminService = {
  getDashboard,

  getCandidates,
  getCandidateById,
  deleteCandidate,

  getRecruiters,
  getRecruiterById,
  deleteRecruiter,

  getJobs,
  getJobById,
  deleteJob,

  getApplications,
  getApplicationById,
  deleteApplication,

  getInterviews,
  getInterviewById,
  deleteInterview,
};

export default adminService;