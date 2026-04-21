import API from "@/lib/axios";

// Register
export const registerUser = async (userData) => {
  try {
    const res = await API.post("/api/auth/register", userData);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

// Login
export const loginUser = async (userData) => {
  try {
    const res = await API.post("/api/auth/login", userData);
    return res.data;
  } catch ( error) {
    throw error.response?.data?.message || "Login failed";
  }
};