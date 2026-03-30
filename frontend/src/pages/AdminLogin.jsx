import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../state/contentStore";

const AdminLogin = () => {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (login(username.trim(), password)) {
      nav("/admin", { replace: true });
    } else {
      setErr("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full mb-3 p-3 rounded-lg border"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 p-3 rounded-lg border"
        />
        {err && <div className="text-red-600 text-sm mb-2">{err}</div>}
        <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600">
          Sign In
        </button>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Default: admin / admin123 (change later in dashboard)
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;

