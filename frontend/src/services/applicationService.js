import axiosInstance from "./axiosInstance";

const applyJob = (jobId) => {
  return axiosInstance.post("/candidate/applications", {
    jobId,
  });
};

const getApplications = () => {
  return axiosInstance.get("/candidate/applications");
};

const applicationService = {
  applyJob,
  getApplications,
};

export default applicationService;