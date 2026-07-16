import axiosInstance from "./axiosInstance";

const analyzeResume = () => {
  return axiosInstance.post("/ai/resume/analyze");
};

const resumeAnalysisService = {
  analyzeResume,
};

export default resumeAnalysisService;