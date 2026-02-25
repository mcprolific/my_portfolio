import React, { useEffect, useRef } from "react";

const Contact = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.classList.add("show");
    }, { threshold: 0.25 });
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="Contact" ref={ref} className="py-20 bg-gray-50 fade-slide-up">
      <div className="container px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Contact Me</h2>
        <form className="max-w-xl mx-auto space-y-4">
          <input type="text" placeholder="Name" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary transition" />
          <input type="email" placeholder="Email" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary transition" />
          <textarea placeholder="Message" rows="5" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary transition resize-none"></textarea>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition transform hover:scale-105">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
