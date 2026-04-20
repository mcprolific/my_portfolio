import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [tab, setTab] = useState("home");
  const nav = useNavigate();

  const tabs = [
    { key: "home", label: "Home" },
    { key: "work", label: "Work" },
    { key: "about", label: "About" },
    { key: "resume", label: "Resume" },
    { key: "contact", label: "Contact" },
    { key: "social", label: "Social" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <motion.div
      className="min-h-screen flex bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <aside className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="p-4">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`w-full text-left mb-2 px-3 py-2 rounded-lg ${
                tab === t.key ? "bg-gray-800 text-white" : "hover:bg-gray-100"
              }`}
            >
              {t.label}
            </button>
          ))}
          <button
            onClick={() => nav("/")}
            className="w-full text-left mb-2 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            Back to Portfolio
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("siteAuthV1");
              localStorage.removeItem("siteTokenV1");
              nav("/admin/login");
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Welcome to Admin Dashboard</h1>
          <p className="text-gray-600">Select a tab from the sidebar to manage your portfolio content.</p>

          {tab === "home" && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Home Section</h2>
              <p className="text-gray-600">Manage your home page content here.</p>
            </div>
          )}

          {tab === "work" && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Work Section</h2>
              <p className="text-gray-600">Manage your work/portfolio projects here.</p>
            </div>
          )}

          {tab === "about" && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">About Section</h2>
              <p className="text-gray-600">Manage your about section content here.</p>
            </div>
          )}

          {tab === "resume" && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Resume Section</h2>
              <p className="text-gray-600">Manage your resume/skills content here.</p>
            </div>
          )}

          {tab === "contact" && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Contact Section</h2>
              <p className="text-gray-600">Manage your contact information here.</p>
            </div>
          )}

          {tab === "social" && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Social Links</h2>
              <p className="text-gray-600">Manage your social media links here.</p>
            </div>
          )}

          {tab === "settings" && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <p className="text-gray-600">General settings and configuration.</p>
            </div>
          )}
        </div>
      </main>
    </motion.div>
  );
};

export default AdminDashboard;
