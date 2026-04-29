"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaFileMedical,
  FaShieldAlt,
  FaLock,
  FaTachometerAlt,
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

  const [user, setUser] = useState(null);

  const router = useRouter();

  const heroRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll(".reveal");
    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-5");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-surface">
      
      {/* HERO */}
      <section ref={heroRef} className="px-6 py-24 text-center max-w-6xl mx-auto relative mb-10 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-blue-100/10 blur-2xl"></div>
        <div className="reveal opacity-0 translate-y-5 transition-all duration-700 inline-block mb-4 px-4 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
          Trusted Healthcare Platform
        </div>
        <h1 className="reveal opacity-0 translate-y-5 transition-all duration-700 text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight break-words">
          <span className="whitespace-nowrap bg-gradient-to-r from-purple-700 via-purple-500 to-purple-900 bg-clip-text text-transparent">
            Smart Healthcare
          </span>
          <span className="block text-primary">Management System</span>
        </h1>

        <p className="reveal opacity-0 translate-y-5 transition-all duration-700 text-textSecondary/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Manage patients, doctors, appointments, and medical records seamlessly, all in one powerful platform.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {user ? (
            <button
              onClick={() => {
                if (user.role === "admin") router.push("/admin");
                else if (user.role === "doctor") router.push("/doctor");
                else router.push("/dashboard");
              }}
              className="bg-primary text-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all duration-300 flex items-center gap-2 group"
            >
              <FaTachometerAlt className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
              {user.role === "admin"
                ? "Go to Admin Dashboard"
                : user.role === "doctor"
                ? "Go to Doctor Dashboard"
                : "Go to Dashboard"}
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/register")}
                className="bg-primary text-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all duration-300"
              >
                Get Started
              </button>

              <button
                onClick={() => router.push("/login")}
                className="border border-primary text-primary px-8 py-4 rounded-xl hover:bg-primary hover:text-white transition"
              >
                Login
              </button>
            </>
          )}
        </div>
        <div className="mt-16 flex justify-center relative">
          <div className="absolute w-[500px] h-[500px] bg-blue-400/20 blur-3xl rounded-full -z-10"></div>
          <img
            ref={imgRef}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) / 25;
              const y = (e.clientY - rect.top - rect.height / 2) / 25;
              e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(0,0)";
            }}
            src="/dashboard-preview.png"
            alt="Dashboard Preview"
            className="w-full max-w-4xl rounded-2xl shadow-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(37,99,235,0.25)]"
          />
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="px-6 pb-16">
        <h2 className="text-3xl font-bold text-center text-textPrimary mb-10">
          Our Impact
        </h2>

        <p className="text-textSecondary text-center max-w-2xl mx-auto mb-12">
          Real numbers that show how MediCore is improving healthcare management.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-surface p-6 rounded-xl shadow text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-400/0 group-hover:bg-blue-400/10 blur-2xl transition-all duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-extrabold text-primary tracking-tight">
                {loadingStats ? "..." : `${animatedStats.totalPatients}+`}
              </h3>
              <p className="text-textSecondary text-sm mt-2">Registered Patients</p>
            </div>
          </div>

          <div className="bg-surface p-6 rounded-xl shadow text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-400/0 group-hover:bg-blue-400/10 blur-2xl transition-all duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-extrabold text-green-600 tracking-tight">
                {loadingStats ? "..." : `${animatedStats.totalDoctors}+`}
              </h3>
              <p className="text-textSecondary text-sm mt-2">Expert Doctors</p>
            </div>
          </div>

          <div className="bg-surface p-6 rounded-xl shadow text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-400/0 group-hover:bg-blue-400/10 blur-2xl transition-all duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-extrabold text-purple-600 tracking-tight">
                {loadingStats ? "..." : `${animatedStats.totalAppointments}+`}
              </h3>
              <p className="text-textSecondary text-sm mt-2">Appointments Booked</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-20 bg-surface">
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
    className="p-6 rounded-2xl shadow-md border border-gray-100 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group hover:shadow-xl"
  >
    <div className="absolute inset-0 bg-blue-400/0 group-hover:bg-blue-400/10 blur-2xl transition-all duration-500"></div>
    <div className="relative z-10">
      <div className="mb-4">{item.icon}</div>
      <h3 className="font-semibold text-lg mb-2 text-primary">
        {item.title}
      </h3>
      <p className="text-textSecondary text-sm">
        {item.desc}
      </p>
    </div>
  </div>
))}
        </div>
      </section>

      {/* CTA */}
      {!user && (
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
      )}

    </main>
  );
}