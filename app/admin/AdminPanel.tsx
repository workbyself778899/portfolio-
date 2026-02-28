"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

const TABS = [
  "home",
  "about",
  "skills",
  "projects",
  "resumes",
  "contact",
  "messages",
] as const;

type TabId = (typeof TABS)[number];

type ProjectItem = {
  _id: string;
  title?: string;
  description?: string;
  tech?: string[];
  github?: string;
  demo?: string;
  order?: number;
};

type ContactMessageItem = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

async function fetchSection(section: string) {
  const res = await fetch(`/api/sections/${section}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to fetch");
  return json.data;
}

async function saveSection(section: string, data: unknown) {
  const res = await fetch(`/api/sections/${section}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to save");
  return json.data;
}

async function saveProject(data: { [key: string]: unknown }) {
  const res = await fetch("/api/sections/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to save");
  return json.data;
}

async function updateProject(id: string, data: { [key: string]: unknown }) {
  const res = await fetch("/api/sections/projects", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...data }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to update");
  return json.data;
}

async function deleteProject(id: string) {
  const res = await fetch(`/api/sections/projects?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to delete");
}

export function AdminPanel() {
  const params = useParams();
  const sectionFromUrl = params?.section as string | undefined;
  const activeTab: TabId = TABS.includes(sectionFromUrl as TabId)
    ? (sectionFromUrl as TabId)
    : "home";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [home, setHome] = useState<{ [key: string]: unknown }>({});
  const [about, setAbout] = useState<{ [key: string]: unknown }>({});
  const [skills, setSkills] = useState<{ [key: string]: unknown }>({});
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [projectEdits, setProjectEdits] = useState<{ [key: string]: { [key: string]: unknown } }>({});
  const [resumes, setResumes] = useState<{ [key: string]: unknown }>({});
  const [contact, setContact] = useState<{ [key: string]: unknown }>({});
  const [contactMessages, setContactMessages] = useState<ContactMessageItem[]>([]);

  const showMessage = useCallback((type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  }, []);

  const loadSection = useCallback(async (section: TabId) => {
    setLoading(true);
    try {
      if (section === "projects") {
        const data = await fetchSection("projects");
        setProjects(Array.isArray(data) ? (data as ProjectItem[]) : []);
        setProjectEdits({});
      } else if (section === "messages") {
        const res = await fetch("/api/admin/contact-messages");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setContactMessages(json.data);
        } else {
          setContactMessages([]);
        }
      } else {
        const data = await fetchSection(section);
        const setter = {
          home: setHome,
          about: setAbout,
          skills: setSkills,
          resumes: setResumes,
          contact: setContact,
        }[section];
        if (setter) setter(data || {});
      }
    } catch (e) {
      showMessage("error", e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [showMessage]);

  useEffect(() => {
    loadSection(activeTab);
  }, [activeTab, loadSection]);

  const handleSaveHome = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSection("home", home);
      showMessage("success", "Home saved.");
    } catch (e) {
      showMessage("error", e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSection("about", about);
      showMessage("success", "About saved.");
    } catch (e) {
      showMessage("error", e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSkills = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSection("skills", skills);
      showMessage("success", "Skills saved.");
    } catch (e) {
      showMessage("error", e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveResumes = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSection("resumes", resumes);
      showMessage("success", "Resumes saved.");
    } catch (e) {
      showMessage("error", e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSection("contact", contact);
      showMessage("success", "Contact saved.");
    } catch (e) {
      showMessage("error", e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const addProject = async () => {
    try {
      const newProject = await saveProject({
        title: "New Project",
        description: "",
        tech: [],
        github: "",
        demo: "",
        order: projects.length,
      });
      setProjects((prev) => [...prev, newProject]);
      showMessage("success", "Project added.");
    } catch (e) {
      showMessage("error", e instanceof Error ? e.message : "Failed to add");
    }
  };

  const updateProjectItem = async (id: string, data: { [key: string]: unknown }) => {
    try {
      const updated = await updateProject(id, data);
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? (updated as ProjectItem) : p))
      );
      setProjectEdits((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      showMessage("success", "Project updated.");
    } catch (e) {
      showMessage("error", e instanceof Error ? e.message : "Failed to update");
    }
  };

  const setProjectEdit = (id: string, field: string, value: unknown) => {
    setProjectEdits((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const getProjectDisplay = (project: ProjectItem) => {
    const id = project._id as string;
    const edits = projectEdits[id];
    return edits ? ({ ...project, ...edits } as ProjectItem) : project;
  };

  const removeProject = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      showMessage("success", "Project removed.");
    } catch (e) {
      showMessage("error", e instanceof Error ? e.message : "Failed to delete");
    }
  };

  const setHomeField = (key: string, value: unknown) =>
    setHome((prev) => ({ ...prev, [key]: value }));
  const setAboutField = (key: string, value: unknown) =>
    setAbout((prev) => ({ ...prev, [key]: value }));
  const setSkillsField = (key: string, value: unknown) =>
    setSkills((prev) => ({ ...prev, [key]: value }));
  const setResumesField = (key: string, value: unknown) =>
    setResumes((prev) => ({ ...prev, [key]: value }));
  const setContactField = (key: string, value: unknown) =>
    setContact((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      {message && (
        <p
          className={`mb-4 text-sm ${
            message.type === "success" ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {message.text}
        </p>
      )}
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <>
          {activeTab === "home" && (
            <form onSubmit={handleSaveHome} className="max-w-2xl space-y-6">
              <h2 className="section-title">Home</h2>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Greeting</label>
                <input
                  className="input"
                  value={(home.greeting as string) ?? ""}
                  onChange={(e) => setHomeField("greeting", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Short intro</label>
                <input
                  className="input"
                  value={(home.s_intro as string) ?? ""}
                  onChange={(e) => setHomeField("s_intro", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Intro</label>
                <input
                  className="input"
                  value={(home.intro as string) ?? ""}
                  onChange={(e) => setHomeField("intro", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Message</label>
                <input
                  className="input"
                  value={(home.message as string) ?? ""}
                  onChange={(e) => setHomeField("message", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Title *</label>
                <input
                  className="input"
                  value={(home.title as string) ?? ""}
                  onChange={(e) => setHomeField("title", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Describe</label>
                <textarea
                  className="textarea"
                  value={(home.describe as string) ?? ""}
                  onChange={(e) => setHomeField("describe", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Tags (comma-separated)</label>
                <input
                  className="input"
                  value={Array.isArray(home.tag) ? (home.tag as string[]).join(", ") : ""}
                  onChange={(e) =>
                    setHomeField(
                      "tag",
                      e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    )
                  }
                />
              </div>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Saving…" : "Save Home"}
              </button>
            </form>
          )}

          {activeTab === "about" && (
            <form onSubmit={handleSaveAbout} className="max-w-2xl space-y-6">
              <h2 className="section-title">About</h2>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Section title</label>
                <input
                  className="input"
                  value={(about.title as string) ?? ""}
                  onChange={(e) => setAboutField("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Describe</label>
                <textarea
                  className="textarea"
                  value={(about.describe as string) ?? ""}
                  onChange={(e) => setAboutField("describe", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Paragraphs (one per line)</label>
                <textarea
                  className="textarea min-h-[140px]"
                  value={
                    Array.isArray(about.paragraphs) ? (about.paragraphs as string[]).join("\n") : ""
                  }
                  onChange={(e) =>
                    setAboutField("paragraphs", e.target.value.split("\n").filter(Boolean))
                  }
                />
              </div>
              <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Timeline (JSON array)</h3>
                <textarea
                  className="textarea font-mono text-xs min-h-[200px]"
                  value={about.timeline ? JSON.stringify(about.timeline as unknown[], null, 2) : "[]"}
                  onChange={(e) => {
                    try {
                      setAboutField("timeline", JSON.parse(e.target.value || "[]"));
                    } catch {
                      // ignore
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Format: [{`{ "title", "institution", "period", "description" }`}, ...]
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Skill levels (JSON array)</h3>
                <textarea
                  className="textarea font-mono text-xs min-h-[120px]"
                  value={about.skills ? JSON.stringify(about.skills as unknown[], null, 2) : "[]"}
                  onChange={(e) => {
                    try {
                      setAboutField("skills", JSON.parse(e.target.value || "[]"));
                    } catch {
                      // ignore
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Format: [{`{ "name": "React", "level": 85 }`}, ...]
                </p>
              </div>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Saving…" : "Save About"}
              </button>
            </form>
          )}

          {activeTab === "skills" && (
            <form onSubmit={handleSaveSkills} className="max-w-2xl space-y-6">
              <h2 className="section-title">Skills</h2>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Description</label>
                <textarea
                  className="textarea"
                  value={(skills.description as string) ?? ""}
                  onChange={(e) => setSkillsField("description", e.target.value)}
                />
              </div>
              <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Categories (JSON)</h3>
                <textarea
                  className="textarea font-mono text-xs min-h-[220px]"
                  value={
                    skills.categories
                      ? JSON.stringify(skills.categories as unknown[], null, 2)
                      : '[\n  { "title": "Frontend", "skills": ["React", "Next.js"] }\n]'
                  }
                  onChange={(e) => {
                    try {
                      setSkillsField("categories", JSON.parse(e.target.value || "[]"));
                    } catch {
                      // ignore
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Format: [{`{ "title": "Category", "skills": ["Skill1", "Skill2"] }`}, ...]
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Tech stack (JSON)</h3>
                <textarea
                  className="textarea font-mono text-xs min-h-[100px]"
                  value={
                    skills.techStack ? JSON.stringify(skills.techStack as unknown[], null, 2) : "[]"
                  }
                  onChange={(e) => {
                    try {
                      setSkillsField("techStack", JSON.parse(e.target.value || "[]"));
                    } catch {
                      // ignore
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Format: [{`{ "name": "React", "icon": "SiReact", "color": "text-sky-400" }`}, ...]
                </p>
              </div>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Saving…" : "Save Skills"}
              </button>
            </form>
          )}

          {activeTab === "projects" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="section-title">Projects</h2>
                <button type="button" onClick={addProject} className="btn-primary">
                  Add project
                </button>
              </div>
              <div className="space-y-6">
                {projects.map((project) => {
                  const p = getProjectDisplay(project);
                  return (
                    <div key={project._id} className="card space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{p.title || "Untitled"}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateProjectItem(project._id, {
                                title: p.title,
                                description: p.description,
                                tech: p.tech,
                                github: p.github,
                                demo: p.demo,
                              })
                            }
                            className="btn-primary text-xs py-1.5 px-3"
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            onClick={() => removeProject(project._id)}
                            className="text-xs text-rose-400 hover:text-rose-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs text-muted-foreground">Title</label>
                          <input
                            className="input"
                            value={p.title ?? ""}
                            onChange={(e) => setProjectEdit(project._id, "title", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs text-muted-foreground">GitHub URL</label>
                          <input
                            className="input"
                            value={p.github ?? ""}
                            onChange={(e) => setProjectEdit(project._id, "github", e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-muted-foreground">Description</label>
                        <textarea
                          className="textarea min-h-[80px]"
                          value={p.description ?? ""}
                          onChange={(e) =>
                            setProjectEdit(project._id, "description", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-muted-foreground">Demo URL</label>
                        <input
                          className="input"
                          value={p.demo ?? ""}
                          onChange={(e) => setProjectEdit(project._id, "demo", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-muted-foreground">Tech (comma-separated)</label>
                        <input
                          className="input"
                          value={Array.isArray(p.tech) ? p.tech.join(", ") : ""}
                          onChange={(e) =>
                            setProjectEdit(
                              project._id,
                              "tech",
                              e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                            )
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {projects.length === 0 && !loading && (
                <p className="text-muted-foreground">
                  No projects yet. Click &quot;Add project&quot; to create one.
                </p>
              )}
            </div>
          )}

          {activeTab === "resumes" && (
            <form onSubmit={handleSaveResumes} className="max-w-2xl space-y-6">
              <h2 className="section-title">Resumes</h2>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">CV download URL</label>
                <input
                  className="input"
                  value={(resumes.cvUrl as string) ?? ""}
                  onChange={(e) => setResumesField("cvUrl", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Download button text</label>
                <input
                  className="input"
                  value={(resumes.downloadText as string) ?? ""}
                  onChange={(e) => setResumesField("downloadText", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Description</label>
                <textarea
                  className="textarea"
                  value={(resumes.description as string) ?? ""}
                  onChange={(e) => setResumesField("description", e.target.value)}
                />
              </div>
              <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Sections (JSON)</h3>
                <textarea
                  className="textarea font-mono text-xs min-h-[280px]"
                  value={
                    resumes.sections
                      ? JSON.stringify(resumes.sections as unknown[], null, 2)
                      : '[\n  { "type": "Education", "items": [{ "title": "", "org": "", "period": "", "description": "" }] }\n]'
                  }
                  onChange={(e) => {
                    try {
                      setResumesField("sections", JSON.parse(e.target.value || "[]"));
                    } catch {
                      // ignore
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Format: [{`{ "type": "Education"|"Experience", "items": [{ "title", "org", "period", "description" }] }`}, ...]
                </p>
              </div>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Saving…" : "Save Resumes"}
              </button>
            </form>
          )}

          {activeTab === "contact" && (
            <form onSubmit={handleSaveContact} className="max-w-2xl space-y-6">
              <h2 className="section-title">Contact</h2>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Email</label>
                <input
                  type="email"
                  className="input"
                  value={(contact.email as string) ?? ""}
                  onChange={(e) => setContactField("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Location</label>
                <input
                  className="input"
                  value={(contact.location as string) ?? ""}
                  onChange={(e) => setContactField("location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Contact description</label>
                <textarea
                  className="textarea"
                  value={(contact.contactText as string) ?? ""}
                  onChange={(e) => setContactField("contactText", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Availability</label>
                <input
                  className="input"
                  value={(contact.availability as string) ?? ""}
                  onChange={(e) => setContactField("availability", e.target.value)}
                />
              </div>
              <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Social links</h3>
                <div className="space-y-2">
                  <input
                    className="input"
                    placeholder="GitHub URL"
                    value={(contact.socialLinks as { github?: string })?.github ?? ""}
                    onChange={(e) =>
                      setContactField("socialLinks", {
                        ...(contact.socialLinks as object),
                        github: e.target.value,
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="LinkedIn URL"
                    value={(contact.socialLinks as { linkedin?: string })?.linkedin ?? ""}
                    onChange={(e) =>
                      setContactField("socialLinks", {
                        ...(contact.socialLinks as object),
                        linkedin: e.target.value,
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Twitter / X URL"
                    value={(contact.socialLinks as { twitter?: string })?.twitter ?? ""}
                    onChange={(e) =>
                      setContactField("socialLinks", {
                        ...(contact.socialLinks as object),
                        twitter: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Saving…" : "Save Contact"}
              </button>
            </form>
          )}

          {activeTab === "messages" && (
            <div className="space-y-6">
              <h2 className="section-title">Contact form messages</h2>
              <p className="text-sm text-muted-foreground">
                Messages sent from the contact form on your site.
              </p>
              {contactMessages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No messages yet.</p>
              ) : (
                <div className="space-y-4">
                  {contactMessages.map((msg) => (
                    <div
                      key={msg._id}
                      className="rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/30"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 mb-3">
                        <p className="font-semibold text-foreground">{msg.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {msg.createdAt
                            ? new Date(msg.createdAt).toLocaleString()
                            : ""}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        <a href={`mailto:${msg.email}`} className="text-sky-500 hover:underline">
                          {msg.email}
                        </a>
                      </p>
                      <p className="text-sm text-foreground whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
