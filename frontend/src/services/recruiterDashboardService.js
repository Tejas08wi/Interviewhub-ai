import axiosInstance from "./axiosInstance";

export const getRecruiterDashboard = async () => {
  const response = await axiosInstance.get("/recruiter/dashboard");
  return response.data;
};