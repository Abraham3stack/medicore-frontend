import API from "@/lib/axios";

// Get all patients
export const getPatients = async () => {
  try {
    const res = await API.get("/api/patients");
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
  }
};