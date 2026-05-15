"use client";

import { useEffect, useState } from "react";

type Exp = {
  _id?: string;
  type: "experience" | "education";
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  description?: string;
  location?: string;
  order: number;
};

export default function AdminExperience() {
  const [data, setData] = useState<Exp[]>([]);
  const [form, setForm] = useState<Exp | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/sections/resumes");
      const json = await res.json();
      console.log("DATA:", json);

      if (json.success) setData(json.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!form) return;

    const method = form._id ? "PUT" : "POST";
    const url = form._id
      ? `/api/sections/resumes?id=${form._id}`
      : `/api/sections/resumes`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm(null);
    load();
  };

  const remove = async (id?: string) => {
    if (!id) return;

    await fetch(`/api/sections/resumes?id=${id}`, {
      method: "DELETE",
    });

    load();
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold sm:text-2xl">
          Manage Education & Experience
        </h1>

        <button
          onClick={() =>
            setForm({
              type: "experience",
              title: "",
              organization: "",
              startDate: "",
              endDate: "",
              description: "",
              location: "",
              order: data.length,
            })
          }
          className="w-full rounded bg-blue-500 px-4 py-2 text-white sm:w-auto"
        >
          + Add
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <p className="text-gray-500">No data yet. Add one.</p>
      )}

      {/* LIST */}
      {data.map((item) => (
        <div
          key={item._id}
          className="p-4 border rounded flex justify-between"
        >
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">
              {item.organization}
            </p>
          </div>

          <div className="flex gap-2">
            <button className="px-6 py-2 rounded-xl bg-green-400 text-white font-bold" onClick={() => setForm(item)}>Edit</button>
            <button className="px-6 py-2 rounded-xl bg-red-400 text-white font-bold"  onClick={() => remove(item._id)}>Delete</button>
          </div>
        </div>
      ))}

      {/* FORM MODAL */}
      {form && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className=" p-6 bg-gray-700 text-white rounded w-full max-w-md space-y-3">

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full border p-2"
            />

            <input
              placeholder="Organization"
              value={form.organization}
              onChange={(e) =>
                setForm({ ...form, organization: e.target.value })
              }
              className="w-full border p-2"
            />

            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as any })
              }
              className="w-full text-white bg-black border p-2"
            >
              <option value="experience">Experience</option>
              <option value="education">Education</option>
            </select>

            <input
              placeholder="Start Date"
              value={form.startDate}
              onChange={(e) =>
                setForm({ ...form, startDate: e.target.value })
              }
              className="w-full border p-2"
            />

            <input
              placeholder="End Date"
              value={form.endDate}
              onChange={(e) =>
                setForm({ ...form, endDate: e.target.value })
              }
              className="w-full border p-2"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border p-2"
            />

            <div className="flex gap-2">
              <button onClick={save} className="flex-1 bg-green-500 text-white py-2">
                Save
              </button>

              <button
                onClick={() => setForm(null)}
                className="flex-1 bg-gray-500 text-white py-2"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}