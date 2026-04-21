"use client";
 
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getDoctors } from "@/services/doctor.service";
import { createAppointment } from "@/services/appointment.service";
import { getAppointments, deleteAppointment } from "@/services/appointment.service";

export default function AppointmentsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, []);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data.data || []);
      } catch (err) {
        setError("Failed to load doctors");
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        doctor: form.doctorId,
        appointmentDate: new Date(`${form.date}T${form.time}`).toISOString(),
        reason: "General consultation",
      };

      await createAppointment(payload);
      setMessage("Appointment booked successfully ✅");
      setTimeout(() => {
        setMessage("");
      }, 3000);

      // Refresh appointments list
      const updated = await getAppointments();
      setAppointments(updated.data || []);

      setForm({
        doctorId: "",
        date: "",
        time: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message || 
        "Booking failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      setCancelingId(id);
      await deleteAppointment(id);

      // Refresh list after cancel
      const updated = await getAppointments();
      setAppointments(updated.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <ProtectedRoute role="patient">
      <main className="min-h-screen bg-background p-6">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Book Appointment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-surface p-6 rounded-xl shadow-md max-w-lg"
        >
          {/* Doctor */}
          <select
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
            className="w-full p-3 border rounded-full mb-4 text-textPrimary bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            disabled={loadingDoctors}
            required
          >
            <option value="">
              {loadingDoctors
                ? "Loading doctors..."
                : doctors.filter((d) => d.availability === "available").length === 0
                ? "No available doctors"
                : "Select Doctor"}
            </option>

            {!loadingDoctors &&
              doctors
                .filter((doc) => doc.availability === "available")
                .map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    Dr. {doc.firstName} {doc.lastName} — {doc.specialization || "General"}
                  </option>
                ))}
          </select>

          {/* Date */}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4 text-textPrimary bg-white placeholder-gray-400"
            required
          />

          {/* Time */}
          <input 
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4 text-textPrimary bg-white placeholder-gray-400"
            required
          />

          {/* Feedback */}
          {error && (
            <p className="text-danger mb-3">{error}</p>
          )}

          {message && (
            <p className="text-green-600 mb-3">{message}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={!form.doctorId || loading}
            className="w-full bg-primary text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
        {/* Appointment List */}
        <div className="mt-10">
          <h2 className="text-xl text-textPrimary font-semibold mb-4">My Appointments</h2>

          {loadingAppointments ? (
            <p className="text-textSecondary">Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p className="text-textSecondary">No appointments found</p>
          ) : (
            <div className="overflow-x-auto w-full bg-surface rounded-xl shadow-md">
              <table className="w-full text-left break-words">
                <thead className="bg-gray-100 text-textPrimary">
                  <tr>
                    <th className="p-2 md:p-4 text-xs md:text-sm">Doctor</th>
                    <th className="p-2 md:p-4 text-xs md:text-sm">Date</th>
                    <th className="p-2 md:p-4 text-xs md:text-sm">Time</th>
                    <th className="p-2 md:p-4 text-xs md:text-sm">Status</th>
                    <th className="p-2 md:p-4 text-xs md:text-sm">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt._id} className="border-t text-textSecondary">
                      <td className="p-2 md:p-4 text-xs md:text-sm">
                        Dr. {appt.doctor?.firstName} {appt.doctor?.lastName}
                      </td>
                      <td className="p-2 md:p-4 text-xs md:text-sm">{new Date(appt.appointmentDate).toLocaleDateString()}</td>
                      <td className="p-2 md:p-4 text-xs md:text-sm">{new Date(appt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>

                      <td className="p-2 md:p-4 text-xs md:text-sm">
                        <span
                          className={`px-2 py-1 inline-block rounded text-xs font-semibold ${
                            appt.status === "scheduled"
                              ? "bg-blue-100 text-blue-600"
                              : appt.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>

                      <td className="p-2 md:p-4 text-xs md:text-sm">
                        {appt.status === "scheduled" && (
                          <button
                            onClick={() => handleCancel(appt._id)}
                            disabled={cancelingId === appt._id}
                            className={`text-xs md:text-sm ${
                              cancelingId === appt._id
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-red-600 hover:underline"
                            }`}
                          >
                            {cancelingId === appt._id ? "Cancelling..." : "Cancel"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}