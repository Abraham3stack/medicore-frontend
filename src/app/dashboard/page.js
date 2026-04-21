"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getAppointments } from "@/services/appointment.service";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      setAppointments(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments =
    filter === "all"
      ? appointments
      : appointments.filter((appt) => appt.status === filter);

  return (
    <ProtectedRoute role="patient">
      <main className="min-h-screen p-4 md:p-8 bg-background text-textPrimary">
        <h1 className="text-2xl font-bold mb-6">Patient Dashboard</h1>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {["all", "scheduled", "completed", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-full text-xs md:text-sm transition shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                filter === tab
                  ? "bg-primary text-white shadow"
                  : "bg-gray-200 text-black hover:bg-gray-300 hover:shadow"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-textSecondary">Loading...</p>
        ) : filteredAppointments.length === 0 ? (
          <p className="text-textSecondary">No appointments found</p>
        ) : (
          <div className="bg-surface rounded-xl shadow-md p-3">
            <div className="flex flex-col gap-3">
              {filteredAppointments.map((appt) => (
                <div
                  key={appt._id}
                  className="p-3 rounded-lg bg-white text-black shadow-sm flex flex-col md:flex-row md:justify-between md:items-center"
                >
                  <div>
                    <p className="font-semibold">
                      Dr. {appt.doctor?.firstName} {appt.doctor?.lastName}
                    </p>
                    <p className="text-xs">
                      {new Date(appt.appointmentDate).toLocaleDateString()} •{" "}
                      {new Date(appt.appointmentDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-2 md:mt-0">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        appt.status === "scheduled"
                          ? "bg-blue-100 text-blue-600"
                          : appt.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}