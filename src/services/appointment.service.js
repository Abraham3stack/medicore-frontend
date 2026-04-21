import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create appointment
export const createAppointment = async (data) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API_URL}/api/appointments`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// Get appointments
export const getAppointments = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_URL}/api/appointments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export const deleteAppointment = async (id) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(`${API_URL}/api/appointments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};