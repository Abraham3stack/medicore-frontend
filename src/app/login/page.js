"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "@/services/auth.service";

export default function Login() {
  const router = useRouter();
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (loading) return;
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(form);

      const user = response.user || response.data?.user;
      const token = response.token || response.data?.token;

      if (!user) {
        throw new Error("User data missing from response");
      }

      // Save token and user to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Notify app that auth state changed
      window.dispatchEvent(new Event("authChange"));

      // Redirect based on user role
      if (user.role === "admin") {
        router.push("/admin");
      } else if (user.role === "doctor") {
        router.push("/doctor");
      } else {
        router.push("/dashboard");
      }
      
    } catch (err) {
      setError(typeof err === "string" ? err : err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* LEFT SIDE (IMAGE) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center p-10">
        <div className="text-white max-w-md">
          <h2 className="text-4xl font-bold mb-4">Welcome to Medicore</h2>
          <p className="text-blue-100">
            Book appointments, manage healthcare, and stay connected with your doctors easily.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/20 w-full max-w-md"
        >
          <h1 className="text-3xl font-extrabold text-primary mb-6 text-center tracking-tight">
            Login
          </h1>

          {error && (
            <p className="text-danger text-sm mb-4">{error}</p>
          )}

          <input 
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-200 text-black rounded-xl mb-4 focus:ring-2 focus:ring-primary/40 focus:outline-none transition"
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 pr-12 border border-gray-200 text-black rounded-xl mb-2 focus:ring-2 focus:ring-primary/40 focus:outline-none transition"
              onChange={handleChange}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-xl font-semibold transition-all duration-200 ${
              loading
                ? "bg-primary/70 cursor-not-allowed"
                : "bg-primary text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-[1.03]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className="text-primary cursor-pointer font-semibold hover:underline hover:text-blue-700 transition"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </main>
  );
}