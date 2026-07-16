import axiosInstance from "./axiosInstance";

const getAllJobs = () => {
  return axiosInstance.get("/candidate/jobs");
};

const getJobById = (jobId) => {
  return axiosInstance.get(`/candidate/jobs/${jobId}`);
};

const searchJobs = (
  title,
  skills,
  location,
  experience
) => {
  return axiosInstance.get("/candidate/jobs/search", {
    params: {
      title,
      skills,
      location,
      experience,
    },
  });
};

const getJobsPage = (
  page = 0,
  size = 5,
  sortBy = "createdAt",
  direction = "desc"
) => {
  return axiosInstance.get("/candidate/jobs/page", {
    params: {
      page,
      size,
      sortBy,
      direction,
    },
  });
};

const candidateJobService = {
  getAllJobs,
  getJobById,
  searchJobs,
  getJobsPage,
};

export default candidateJobService;