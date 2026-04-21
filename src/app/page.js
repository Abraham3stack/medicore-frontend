"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaFileMedical,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
  });

  const [animatedStats, setAnimatedStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);

  const router = useRouter();

useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/stats`);
      const result = await res.json();

      const data = result.data || {
        totalPatients: 0,
        totalDoctors: 0,
        totalAppointments: 0,
      };

      setStats(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingStats(false);
    }
  };

  // Initial fetch
  fetchStats();

  // Auto refresh every 10 seconds
  const interval = setInterval(fetchStats, 10000);

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    if (loadingStats) return;

    const duration = 800;
    const steps = 20;
    const intervalTime = duration / steps;

    let step = 0;

    const interval = setInterval(() => {
      step++;

      setAnimatedStats({
        totalPatients: Math.floor((stats.totalPatients / steps) * step),
        totalDoctors: Math.floor((stats.totalDoctors / steps) * step),
        totalAppointments: Math.floor((stats.totalAppointments / steps) * step),
      });

      if (step >= steps) {
        setAnimatedStats(stats);
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [stats, loadingStats]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-surface">
      
      {/* HERO */}
      <section className="px-6 py-24 text-center max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
          Smart Healthcare <br className="hidden md:block" />
          Management System
        </h1>

        <p className="text-textSecondary text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Manage patients, doctors, appointments, and medical records seamlessly, all in one powerful platform.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => router.push("/register")}
            className="bg-primary text-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => router.push("/login")}
            className="border border-primary text-primary px-8 py-4 rounded-xl hover:bg-primary hover:text-white transition"
          >
            Login
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-surface p-6 rounded-xl shadow text-center">
            <h3 className="text-3xl font-bold text-primary">
              {loadingStats ? "..." : `${animatedStats.totalPatients}+`}
            </h3>
            <p className="text-textSecondary text-sm mt-2">Registered Patients</p>
          </div>

          <div className="bg-surface p-6 rounded-xl shadow text-center">
            <h3 className="text-3xl font-bold text-green-600">
              {loadingStats ? "..." : `${animatedStats.totalDoctors}+`}
            </h3>
            <p className="text-textSecondary text-sm mt-2">Expert Doctors</p>
          </div>

          <div className="bg-surface p-6 rounded-xl shadow text-center">
            <h3 className="text-3xl font-bold text-purple-600">
              {loadingStats ? "..." : `${animatedStats.totalAppointments}+`}
            </h3>
            <p className="text-textSecondary text-sm mt-2">Appointments Booked</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 bg-surface">
        <h2 className="text-3xl font-bold text-center text-textPrimary mb-14">
          Powerful Features
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[
  {
    title: "Patient Management",
    desc: "Manage patient records, history, and profiles seamlessly.",
    icon: <FaUserInjured className="text-primary text-2xl" />,
  },
  {
    title: "Doctor Scheduling",
    desc: "Track doctor availability and manage schedules efficiently.",
    icon: <FaUserMd className="text-green-600 text-2xl" />,
  },
  {
    title: "Appointment Booking",
    desc: "Book and manage appointments without conflicts.",
    icon: <FaCalendarCheck className="text-purple-600 text-2xl" />,
  },
  {
    title: "Medical Records",
    desc: "Secure storage of patient diagnosis and prescriptions.",
    icon: <FaFileMedical className="text-red-500 text-2xl" />,
  },
  {
    title: "Role-Based Access",
    desc: "Different access levels for admin, doctors, and patients.",
    icon: <FaShieldAlt className="text-yellow-500 text-2xl" />,
  },
  {
    title: "Secure Authentication",
    desc: "JWT-based authentication for safe user access.",
    icon: <FaLock className="text-blue-500 text-2xl" />,
  },
].map((item, i) => (
  <div
    key={i}
    className="p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 hover:-translate-y-1"
  >
    <div className="mb-4">{item.icon}</div>

    <h3 className="font-semibold text-lg mb-2 text-primary">
      {item.title}
    </h3>

    <p className="text-textSecondary text-sm">
      {item.desc}
    </p>
  </div>
))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl font-bold text-textPrimary mb-4">
          Ready to transform healthcare management?
        </h2>

        <p className="text-textSecondary mb-8">
          Join MediCore today and experience a smarter way to manage healthcare systems.
        </p>

        <button
          onClick={() => router.push("/register")}
          className="bg-primary text-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Create Account
        </button>
      </section>
    </main>
  );
}