"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth.service";

export default function Register() {
  const router = useRouter();
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "patient",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);

  const calculateStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0-4
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      setStrength(calculateStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    if (loading) return;
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await registerUser(form);

      const { user, token } = data.data;

      // Save auth data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // Trigger app refresh so navbar updates instantly
      window.dispatchEvent(new Event("storage"));

      console.log("Register success:", data);
      setSuccess("Account created successfully! Taking you to your dashboard...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center p-10">
        <div className="text-white max-w-md">
          <h2 className="text-4xl font-bold mb-4">Join Medicore</h2>
          <p className="text-blue-100">
            Create your account and start managing your healthcare appointments with ease.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/20 w-full max-w-md"
        >
          <h1 className="text-3xl font-extrabold text-primary mb-6 text-center tracking-tight">
            Register
          </h1>

          {error && (
            <p className="text-danger text-sm mb-4">{error}</p>
          )}

          {success && (
            <p className="text-secondary text-sm mb-4">{success}</p>
          )}

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full p-3 text-black border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-primary/40 focus:outline-none transition"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full p-3 text-black border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-primary/40 focus:outline-none transition"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 text-black border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-primary/40 focus:outline-none transition"
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 pr-12 text-black border border-gray-200 rounded-xl mb-2 focus:ring-2 focus:ring-primary/40 focus:outline-none transition"
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

          <div className="mb-4">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  strength <= 1
                    ? "w-1/4 bg-red-400"
                    : strength === 2
                    ? "w-2/4 bg-yellow-400"
                    : strength === 3
                    ? "w-3/4 bg-blue-400"
                    : strength === 4
                    ? "w-full bg-green-500"
                    : "w-0"
                }`}
              />
            </div>
            <p className="text-xs mt-1 text-gray-500">
              {strength <= 1 && "Weak password"}
              {strength === 2 && "Fair password"}
              {strength === 3 && "Good password"}
              {strength === 4 && "Strong password"}
            </p>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Must be at least 6 characters, include an uppercase letter, a number, and a special character.
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-xl font-semibold transition-all duration-200 ${
              loading
                ? "bg-primary/70 cursor-not-allowed"
                : "bg-primary text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-[1.03]"
            }`}
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-primary cursor-pointer font-semibold hover:underline hover:text-blue-700 transition"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </main>
  );
}