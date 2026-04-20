import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getSection } from "../state/contentStore";

const Contact = () => {
  const ref = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [source, setSource] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.classList.add("show");
    }, { threshold: 0.25 });
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ ok: false, msg: "Please fill all fields" });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, source }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to send message");
      }
      setStatus({ ok: true, msg: "Message sent successfully" });
      setName("");
      setEmail("");
      setMessage("");
      setSource("");
    } catch (err) {
      setStatus({ ok: false, msg: err.message || "Something went wrong" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="Contact" ref={ref} className="py-20 bg-gray-50 fade-slide-up">
      <div className="container px-4">
        {(() => {
          const c = getSection("contact");
          const subtitle = c?.subtitle || "I usually reply within 24 hours";
          return (
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold text-gray-800">Contact Me</h2>
              <p className="text-gray-600 mt-2">{subtitle}</p>
            </div>
          );
        })()}
        <form onSubmit={onSubmit} className="max-w-xl mx-auto space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary transition"
            disabled={submitting}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary transition"
            disabled={submitting}
          />
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary transition bg-white"
            disabled={submitting}
          >
            <option value="">Where did you find us?</option>
            <option value="Google">Google</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Twitter/X">Twitter/X</option>
            <option value="Facebook">Facebook</option>
            <option value="Friend/Referral">Friend/Referral</option>
            <option value="Nairaland">Nairaland</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            placeholder="Message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary transition resize-none"
            disabled={submitting}
          ></textarea>
          {status && (
            <div
              className={`text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}
            >
              {status.msg}
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition transform hover:scale-105 disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
