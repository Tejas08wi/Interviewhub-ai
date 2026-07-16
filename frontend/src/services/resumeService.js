import axiosInstance from "./axiosInstance";

const uploadResume = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const downloadResume = () => {
  return axiosInstance.get("/resume/download", {
    responseType: "blob",
  });
};

const deleteResume = () => {
  return axiosInstance.delete("/resume");
};

const resumeService = {
  uploadResume,
  downloadResume,
  deleteResume,
};

export default resumeService;