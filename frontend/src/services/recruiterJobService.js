import axiosInstance from "./axiosInstance";

// Get all recruiter jobs
export const getRecruiterJobs = async () => {
  const response = await axiosInstance.get("/recruiter/jobs");
  return response.data;
};

// Get recruiter job by ID
export const getRecruiterJobById = async (jobId) => {
  const response = await axiosInstance.get(
    `/recruiter/jobs/${jobId}`
  );

  return response.data;
};

// Create recruiter job
export const createRecruiterJob = async (jobData) => {
  const response = await axiosInstance.post(
    "/recruiter/jobs",
    jobData
  );

  return response.data;
};

// Update recruiter job
export const updateRecruiterJob = async (
  jobId,
  jobData
) => {
  const response = await axiosInstance.put(
    `/recruiter/jobs/${jobId}`,
    jobData
  );

  return response.data;
};

// Delete recruiter job
export const deleteRecruiterJob = async (jobId) => {
  const response = await axiosInstance.delete(
    `/recruiter/jobs/${jobId}`
  );

  return response.data;
};

// Recruiter job pagination
export const getRecruiterJobsPage = async (
  page,
  size,
  sortBy,
  direction
) => {
  const response = await axiosInstance.get(
    "/recruiter/jobs/page",
    {
      params: {
        page,
        size,
        sortBy,
        direction,
      },
    }
  );

  return response.data;
};