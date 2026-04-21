"use client";

import { useState } from "react";
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
    <main className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-surface p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100"
      >
        <h1 className="text-2xl font-bold text-primary mb-6 text-center tracking-tight">
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
          className="w-full p-3 text-black border rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          onChange={handleChange}
          required
        />

        <input 
          type="text" 
          name="lastName" 
          placeholder="Last Name" 
          className="w-full p-3 text-black border rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          onChange={handleChange}
          required
        />

        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className="w-full p-3 text-black border rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          onChange={handleChange}
          required
        />

        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="w-full p-3 text-black border rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-full shadow-md hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm text-secondary mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => router.push("login")}
            className="text-primary cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </form>
    </main>
  );
}