import axiosInstance from "./axiosInstance";

// Get applications for a job
export const getJobApplications = async (jobId) => {
  const response = await axiosInstance.get(
    `/recruiter/jobs/${jobId}/applications`
  );
  return response.data;
};

// Update application status
export const updateApplicationStatus = async (applicationId, status) => {
  const response = await axiosInstance.put(
    `/recruiter/jobs/applications/${applicationId}/status`,
    {
      status,
    }
  );
  return response.data;
}; // <-- Fixed: Properly closed updateApplicationStatus here

// Download candidate resume
export const downloadCandidateResume = async (applicationId) => {
  const response = await axiosInstance.get(
    `/recruiter/jobs/applications/${applicationId}/resume`,
    {
      responseType: "blob",
    }
  );

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", "resume.pdf");
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  link.remove();
  window.URL.revokeObjectURL(url);
};