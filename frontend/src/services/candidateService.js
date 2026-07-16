import axiosInstance from "./axiosInstance";

const getProfile = () => {
  return axiosInstance.get("/candidate/profile");
};

const createProfile = (profileData) => {
  return axiosInstance.post("/candidate/profile", profileData);
};

const updateProfile = (profileData) => {
  return axiosInstance.put("/candidate/profile", profileData);
};

const deleteProfile = () => {
  return axiosInstance.delete("/candidate/profile");
};

const candidateService = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};

export default candidateService;