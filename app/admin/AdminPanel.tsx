"use client";
import React, { useCallback, useEffect, useState } from "react";
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

// TagManager component for robust tag add/delete UX
function TagManager({ tags, onAdd, onDelete }: { tags: string[]; onAdd: (tag: string) => void | Promise<void>; onDelete: (tag: string) => void | Promise<void>; }) {
  const [input, setInput] = useState("");
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span key={tag} className="inline-flex items-center px-2 py-1 bg-muted rounded text-xs">
            {tag}
            <button
              type="button"
              className="ml-1 text-rose-500 hover:text-rose-700"
              onClick={() => onDelete(tag)}
              aria-label="Remove tag"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="input flex-1"
          type="text"
          placeholder="Add tag"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={async e => {
            if (e.key === "Enter" && input.trim()) {
              e.preventDefault();
              await onAdd(input.trim());
              setInput("");
            }
          }}
        />
        <button
          type="button"
          className="btn-primary px-3 py-1 text-xs"
          onClick={async () => {
            if (input.trim()) {
              await onAdd(input.trim());
              setInput("");
            }
          }}
        >
          Add
        </button>
      </div>
    </>
  );
}

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
  const [home, setHome] = useState<{ [key: string]: unknown }>({ tag: [] });
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

  // ...other handlers and logic remain unchanged...

  const setHomeField = (key: string, value: unknown) =>
    setHome((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      {message && (
        <p className={`mb-4 text-sm ${message.type === "success" ? "text-emerald-400" : "text-rose-400"}`}>{message.text}</p>
      )}
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <>
          {activeTab === "home" && (
            <form onSubmit={handleSaveHome} className="max-w-2xl space-y-6">
              <h2 className="section-title">Home</h2>
              {/* ...other fields... */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-foreground">Tags</label>
                <TagManager
                  tags={Array.isArray(home.tag) ? (home.tag as string[]) : []}
                  onAdd={async (newTag) => {
                    if (!newTag.trim()) return;
                    const tags = Array.isArray(home.tag) ? [...(home.tag as string[])] : [];
                    if (tags.includes(newTag)) return;
                    setHomeField("tag", [...tags, newTag]);
                    await fetch("/api/sections/home", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ ...home, tag: [...tags, newTag] })
                    });
                  }}
                  onDelete={async (tagToDelete) => {
                    const tags = Array.isArray(home.tag) ? [...(home.tag as string[])] : [];
                    const filtered = tags.filter((t) => t !== tagToDelete);
                    setHomeField("tag", filtered);
                    await fetch("/api/sections/home/tag?value=" + encodeURIComponent(tagToDelete), {
                      method: "DELETE"
                    });
                  }}
                />
              </div>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Saving…" : "Save Home"}
              </button>
            </form>
          )}
        </>
      )}
    </>
  );
}
