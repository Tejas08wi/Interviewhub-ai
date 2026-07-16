import axiosInstance from "./axiosInstance";

// Get Recruiter Profile
export const getRecruiterProfile = async () => {
  const response = await axiosInstance.get("/recruiter/profile");
  return response.data;
};

// Create Recruiter Profile
export const createRecruiterProfile = async (profileData) => {
  const response = await axiosInstance.post(
    "/recruiter/profile",
    profileData
  );

  return response.data;
};

// Update Recruiter Profile
export const updateRecruiterProfile = async (profileData) => {
  const response = await axiosInstance.put(
    "/recruiter/profile",
    profileData
  );

  return response.data;
};

// Delete Recruiter Profile
export const deleteRecruiterProfile = async () => {
  const response = await axiosInstance.delete(
    "/recruiter/profile"
  );

  return response.data;
};