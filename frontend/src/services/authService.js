import axiosInstance from "./axiosInstance";

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post("/api/auth/login", loginData);
  return response.data.data.token;
};

export const registerCandidate = async (candidateData) => {
  const response = await axiosInstance.post(
    "/api/auth/register",
    candidateData
  );
  return response.data;
};

export const registerRecruiter = async (recruiterData) => {
  const response = await axiosInstance.post(
    "/api/recruiter/register",
    recruiterData
  );
  return response.data;
};