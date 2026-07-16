import axiosInstance from "./axiosInstance";

const generateInterview = (requestData) => {
  return axiosInstance.post("/interview/generate", requestData);
};

const submitInterview = (requestData) => {
  return axiosInstance.post("/interview/submit", requestData);
};

const getInterviewHistory = () => {
  return axiosInstance.get("/interview/history");
};

const getInterviewEvaluation = (sessionId) => {
  return axiosInstance.get(`/interview/evaluation/${sessionId}`);
};

const interviewService = {
  generateInterview,
  submitInterview,
  getInterviewHistory,
  getInterviewEvaluation,
};

export default interviewService;