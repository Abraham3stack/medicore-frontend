"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";
import { loginUser } from "@/services/auth.service";

export default function Login() {
  const router = useRouter();
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
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
    <main className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-surface p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className=" text-2xl font-bold text-primary mb-6 text-center">
          Login
        </h1>

        {error && (
          <p className="text-danger text-sm mb-4">{error}</p>
        )}

        <input 
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border text-black rounded-lg mb-4"
          onChange={handleChange}
          required
        />

        <input 
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border text-black rounded-lg mb-4"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-secondary mt-4 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-primary cursor-pointer font-medium"
          >
            Register
          </span>
        </p>
      </form>
    </main>
  );
}