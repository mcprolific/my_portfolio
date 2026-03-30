import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthed, logout, getSection, setSection, setProjects, currentUser, saveUser } from "../state/contentStore";

const AdminDashboard = () => {
  const nav = useNavigate();
  useEffect(() => {
    if (!isAuthed()) nav("/admin/login", { replace: true });
  }, [nav]);

  const [tab, setTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const [homeTitle, setHomeTitle] = useState(getSection("home")?.title || "Saka Idris (McP)");
  const [homeDesc, setHomeDesc] = useState(getSection("home")?.desc || "I specialize in Project Write-up, Data Analysis, Graphic Design, Computer Engineering and AI Developer/Engineer.");

  const work = getSection("work");
  const [projects, setLocalProjects] = useState(work?.projects || []);
  const [projForm, setProjForm] = useState({ title: "", description: "", image: "", link: "" });

  const about = getSection("about") || {};
  const [aboutP1, setAboutP1] = useState(about.p1 || "");
  const [aboutP2, setAboutP2] = useState(about.p2 || "");

  const resumeStore = getSection("resume") || {};
  const [resumeJSON, setResumeJSON] = useState(JSON.stringify(resumeStore.items || [], null, 2));
  const [resumeError, setResumeError] = useState("");

  const [contactSub, setContactSub] = useState(getSection("contact")?.subtitle || "I usually reply within 24 hours");

  const social = getSection("social") || {};
  const [github, setGithub] = useState(social.github || "https://github.com/");
  const [linkedin, setLinkedin] = useState(social.linkedin || "https://www.linkedin.com/in/saka-idris-906a0b256");
  const [twitter, setTwitter] = useState(social.twitter || "https://x.com/prolificmcp/");

  const settings = getSection("settings") || {};
  const [theme, setTheme] = useState(settings.theme || "light");

  const creds = currentUser();
  const [username, setUsername] = useState(creds.username);
  const [password, setPassword] = useState(creds.password);

  useEffect(() => {
    const loadOverview = async () => {
      setLoading(true);
      setNotice("");
      try {
        const res = await fetch(`${API_BASE}/admin/overview`);
        if (!res.ok) throw new Error("Failed to load admin content");
        const data = await res.json();
        // Prefill UI state
        if (data?.home) {
          setHomeTitle(data.home.title || "");
          setHomeDesc(data.home.desc || "");
          setSection("home", { title: data.home.title || "", desc: data.home.desc || "" });
        }
        if (Array.isArray(data?.projects)) {
          setLocalProjects(data.projects);
          setProjects(data.projects.map(p => ({ title: p.title, description: p.description, image: p.image, link: p.link })));
        }
        if (data?.about) {
          setAboutP1(data.about.p1 || "");
          setAboutP2(data.about.p2 || "");
          setSection("about", { p1: data.about.p1 || "", p2: data.about.p2 || "" });
        }
        if (Array.isArray(data?.resume)) {
          setResumeJSON(JSON.stringify(data.resume.map(it => ({
            title: it.title,
            iconKey: it.iconKey,
            description: it.description,
            skills: it.skills || []
          })), null, 2));
          setSection("resume", { items: data.resume });
        }
        if (data?.contact) {
          setContactSub(data.contact.subtitle || "");
          setSection("contact", { subtitle: data.contact.subtitle || "" });
        }
        if (data?.social) {
          setGithub(data.social.github || "");
          setLinkedin(data.social.linkedin || "");
          setTwitter(data.social.twitter || "");
          setSection("social", { github: data.social.github || "", linkedin: data.social.linkedin || "", twitter: data.social.twitter || "" });
        }
        if (data?.settings) {
          setTheme(data.settings.theme || "light");
          setSection("settings", { theme: data.settings.theme || "light" });
        }
      } catch (e) {
        setNotice(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };
    loadOverview();
  }, [API_BASE]);

  const saveHome = async () => {
    setSection("home", { title: homeTitle, desc: homeDesc });
    try {
      await fetch(`${API_BASE}/admin/home`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: homeTitle, desc: homeDesc })
      });
      setNotice("Home saved");
    } catch {}
  };
  const addProject = async () => {
    if (!projForm.title) return;
    try {
      const res = await fetch(`${API_BASE}/admin/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projForm)
      });
      const data = await res.json().catch(() => ({}));
      const newProj = { ...projForm, id: data.id };
      const next = [newProj, ...projects];
      setLocalProjects(next);
      setProjects(next.map(p => ({ title: p.title, description: p.description, image: p.image, link: p.link })));
      setProjForm({ title: "", description: "", image: "", link: "" });
      setNotice("Project added");
    } catch {
      // fallback just local
      const next = [projForm, ...projects];
      setLocalProjects(next);
      setProjects(next);
      setProjForm({ title: "", description: "", image: "", link: "" });
    }
  };
  const removeProject = async (i) => {
    const item = projects[i];
    const next = projects.filter((_, idx) => idx !== i);
    setLocalProjects(next);
    setProjects(next.map(p => ({ title: p.title, description: p.description, image: p.image, link: p.link })));
    if (item?.id) {
      try {
        await fetch(`${API_BASE}/admin/projects/${item.id}`, { method: "DELETE" });
      } catch {}
    }
  };
  const saveSocial = async () => {
    setSection("social", { github, linkedin, twitter });
    try {
      await fetch(`${API_BASE}/admin/social`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ github, linkedin, twitter })
      });
      setNotice("Social saved");
    } catch {}
  };
  const saveContact = async () => {
    setSection("contact", { subtitle: contactSub });
    try {
      await fetch(`${API_BASE}/admin/contact`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subtitle: contactSub })
      });
      setNotice("Contact saved");
    } catch {}
  };
  const saveCreds = () => saveUser({ username, password });
  const saveAbout = async () => {
    setSection("about", { p1: aboutP1, p2: aboutP2 });
    try {
      await fetch(`${API_BASE}/admin/about`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p1: aboutP1, p2: aboutP2 })
      });
      setNotice("About saved");
    } catch {}
  };
  const saveResume = async () => {
    try {
      const items = JSON.parse(resumeJSON);
      if (!Array.isArray(items)) throw new Error("Resume JSON must be an array");
      setSection("resume", { items });
      setResumeError("");
      try {
        await fetch(`${API_BASE}/admin/resume`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items })
        });
        setNotice("Resume saved");
      } catch {}
    } catch (e) {
      setResumeError(e.message || "Invalid JSON");
    }
  };
  const saveSettings = async () => {
    setSection("settings", { theme });
    try {
      await fetch(`${API_BASE}/admin/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme })
      });
      setNotice("Settings saved");
    } catch {}
  };

  const tabs = [
    { key: "home", label: "Home" },
    { key: "work", label: "Work" },
    { key: "about", label: "About" },
    { key: "resume", label: "Resume" },
    { key: "contact", label: "Contact" },
    { key: "social", label: "Social" },
    { key: "settings", label: "Settings" },
    { key: "security", label: "Security" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside
        className={`w-64 bg-white border-r fixed inset-y-0 left-0 transform transition-transform duration-200 md:static md:translate-x-0 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 py-4 font-bold text-lg border-b">Admin Dashboard</div>
        <nav className="p-3 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition ${
                tab === t.key ? "bg-orange-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {t.label}
            </button>
          ))}
          <button
            onClick={() => {
              logout();
              nav("/admin/login", { replace: true });
            }}
            className="w-full text-left mt-2 px-3 py-2 rounded-lg bg-gray-200"
          >
            Logout
          </button>
        </nav>
      </aside>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <main className="flex-1 md:ml-0 ml-0">
        <div className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Toggle sidebar"
            >
              <span className="w-5 h-0.5 bg-current block relative before:content-[''] before:block before:w-5 before:h-0.5 before:bg-current before:absolute before:-translate-y-2 after:content-[''] after:block after:w-5 after:h-0.5 after:bg-current after:absolute after:translate-y-2" />
            </button>
            <div className="font-semibold">Manage Content</div>
          </div>
          <div className="text-sm text-gray-600">{loading ? "Loading..." : notice || `Theme: ${theme}`}</div>
        </div>
        <div className="max-w-5xl mx-auto p-5 space-y-6">
          {tab === "home" && (
            <section className="bg-white rounded-2xl shadow p-5">
              <h3 className="text-xl font-semibold mb-3">Home</h3>
              <label className="block text-sm mb-1">Title</label>
              <input className="w-full border rounded-lg p-2 mb-3" value={homeTitle} onChange={(e) => setHomeTitle(e.target.value)} />
              <label className="block text-sm mb-1">Description</label>
              <textarea className="w-full border rounded-lg p-2 mb-3" rows={3} value={homeDesc} onChange={(e) => setHomeDesc(e.target.value)} />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg" onClick={saveHome}>Save</button>
            </section>
          )}

          {tab === "work" && (
            <section className="bg-white rounded-2xl shadow p-5">
              <h3 className="text-xl font-semibold mb-3">Work</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Title</label>
                  <input className="w-full border rounded-lg p-2 mb-2" value={projForm.title} onChange={(e) => setProjForm({ ...projForm, title: e.target.value })} />
                  <label className="block text-sm mb-1">Description</label>
                  <textarea className="w-full border rounded-lg p-2 mb-2" rows={3} value={projForm.description} onChange={(e) => setProjForm({ ...projForm, description: e.target.value })} />
                  <label className="block text-sm mb-1">Image URL</label>
                  <input className="w-full border rounded-lg p-2 mb-2" value={projForm.image} onChange={(e) => setProjForm({ ...projForm, image: e.target.value })} />
                  <label className="block text-sm mb-1">Link</label>
                  <input className="w-full border rounded-lg p-2 mb-3" value={projForm.link} onChange={(e) => setProjForm({ ...projForm, link: e.target.value })} />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={addProject}>Add Project</button>
                </div>
                <div>
                  <ul className="space-y-2">
                    {projects.map((p, i) => (
                      <li key={i} className="flex items-center justify-between border rounded-lg p-2 bg-white">
                        <div className="text-sm">
                          <div className="font-semibold">{p.title}</div>
                          <div className="text-gray-600 truncate max-w-[320px]">{p.description}</div>
                        </div>
                        <button className="text-red-600 text-sm" onClick={() => removeProject(i)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {tab === "about" && (
            <section className="bg-white rounded-2xl shadow p-5">
              <h3 className="text-xl font-semibold mb-3">About</h3>
              <label className="block text-sm mb-1">Paragraph 1</label>
              <textarea className="w-full border rounded-lg p-2 mb-2" rows={3} value={aboutP1} onChange={(e) => setAboutP1(e.target.value)} />
              <label className="block text-sm mb-1">Paragraph 2</label>
              <textarea className="w-full border rounded-lg p-2 mb-3" rows={3} value={aboutP2} onChange={(e) => setAboutP2(e.target.value)} />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg" onClick={saveAbout}>Save</button>
            </section>
          )}

          {tab === "resume" && (
            <section className="bg-white rounded-2xl shadow p-5">
              <h3 className="text-xl font-semibold mb-3">Resume Items (JSON)</h3>
              <p className="text-gray-600 text-sm mb-2">
                Provide an array of items with title, iconKey (react,node,python,db), description, skills: [
                {"{"}name, level{"}"}]
              </p>
              <textarea className="w-full border rounded-lg p-2 font-mono text-sm" rows={12} value={resumeJSON} onChange={(e) => setResumeJSON(e.target.value)} />
              {resumeError && <div className="text-red-600 text-sm mt-2">{resumeError}</div>}
              <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg" onClick={saveResume}>Save</button>
            </section>
          )}

          {tab === "contact" && (
            <section className="bg-white rounded-2xl shadow p-5">
              <h3 className="text-xl font-semibold mb-3">Contact</h3>
              <label className="block text-sm mb-1">Subtitle</label>
              <input className="w-full border rounded-lg p-2 mb-3" value={contactSub} onChange={(e) => setContactSub(e.target.value)} />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg" onClick={saveContact}>Save</button>
            </section>
          )}

          {tab === "social" && (
            <section className="bg-white rounded-2xl shadow p-5">
              <h3 className="text-xl font-semibold mb-3">Social</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1">GitHub</label>
                  <input className="w-full border rounded-lg p-2" value={github} onChange={(e) => setGithub(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm mb-1">LinkedIn</label>
                  <input className="w-full border rounded-lg p-2" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm mb-1">Twitter/X</label>
                  <input className="w-full border rounded-lg p-2" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                </div>
              </div>
              <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg" onClick={saveSocial}>Save</button>
            </section>
          )}

          {tab === "settings" && (
            <section className="bg-white rounded-2xl shadow p-5">
              <h3 className="text-xl font-semibold mb-3">Settings</h3>
              <label className="block text-sm mb-1">Theme</label>
              <select className="border rounded-lg p-2" value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="light">Light</option>
                <option value="dark">Dark (preview only)</option>
              </select>
              <button className="ml-3 bg-gray-800 text-white px-4 py-2 rounded-lg" onClick={saveSettings}>Save</button>
            </section>
          )}

          {tab === "security" && (
            <section className="bg-white rounded-2xl shadow p-5">
              <h3 className="text-xl font-semibold mb-3">Security</h3>
              <label className="block text-sm mb-1">Admin Username</label>
              <input className="w-full border rounded-lg p-2 mb-2" value={username} onChange={(e) => setUsername(e.target.value)} />
              <label className="block text-sm mb-1">Admin Password</label>
              <input className="w-full border rounded-lg p-2 mb-3" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg" onClick={saveCreds}>Update Credentials</button>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
