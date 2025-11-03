import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuth((state) => state.login);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: "John Doe", email: form.email });
    navigate("/");
  };

  return (
    <AuthLayout title="Welcome Back 👋" subtitle="Login to your account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-muted mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-muted mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm text-muted mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
