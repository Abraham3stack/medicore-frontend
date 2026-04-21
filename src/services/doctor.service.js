import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDoctors = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API_URL}/api/doctors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);

    if (error.response) {
      throw error.response.data.message || "Failed to fetch doctors";
    }

    throw "Network error. Check your server.";
  }
};