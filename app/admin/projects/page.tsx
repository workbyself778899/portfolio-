'use client';

import { useState, useEffect } from 'react';

interface Project {
  _id?: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
  order: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/sections/projects');
      const result = await response.json();

      if (result.success) {
        setProjects(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = () => {
    setCurrentProject({
      title: '',
      description: '',
      tech: [],
      github: '',
      demo: '',
      image: '',
      order: projects.length,
    });
    setShowForm(true);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject({ ...project });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setCurrentProject(null);
    setShowForm(false);
  };

  const handleProjectChange = (field: string, value: any) => {
    if (!currentProject) return;

    setCurrentProject({
      ...currentProject,
      [field]: value,
    });
  };

  const handleTechChange = (index: number, value: string) => {
    if (!currentProject) return;

    const newTech = [...currentProject.tech];
    newTech[index] = value;

    setCurrentProject({
      ...currentProject,
      tech: newTech,
    });
  };

  const addTech = () => {
    if (!currentProject) return;

    setCurrentProject({
      ...currentProject,
      tech: [...currentProject.tech, ''],
    });
  };

  const removeTech = (index: number) => {
    if (!currentProject) return;

    setCurrentProject({
      ...currentProject,
      tech: currentProject.tech.filter((_, i) => i !== index),
    });
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject) return;

    setSubmitting(true);

    try {
      const isEditing = !!currentProject._id;

      const response = await fetch('/api/sections/projects', {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentProject),
      });

      const result = await response.json();

      if (result.success) {
        alert(isEditing ? 'Project updated!' : 'Project created!');
        await fetchProjects();
        handleCloseForm();
      } else {
        alert('Error saving project');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id?: string) => {
    if (!id) return;

    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/sections/projects?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        alert('Project deleted!');
        await fetchProjects();
      } else {
        alert('Delete failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Projects</h1>

        <button
          onClick={handleAddProject}
          className="px-5 py-2 bg-green-500 text-white rounded"
        >
          Add Project
        </button>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {projects
          .sort((a, b) => a.order - b.order)
          .map((project) => (
            <div key={project._id} className="border p-4 rounded">
              <h2 className="font-bold text-lg">{project.title}</h2>
              <p className="text-sm text-gray-600">
                {project.description}
              </p>

              {/* IMAGE */}
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="mt-2 h-32 w-full object-cover rounded"
                />
              )}

              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech?.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-100 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEditProject(project)}
                  className="flex-1 bg-blue-500 text-white py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* FORM MODAL */}
      {showForm && currentProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl p-6 rounded max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {currentProject._id ? 'Edit' : 'Add'} Project
            </h2>

            <form onSubmit={handleSubmitProject} className="space-y-3">
              {/* TITLE */}
              <input
                className="w-full border p-2"
                value={currentProject.title}
                onChange={(e) =>
                  handleProjectChange('title', e.target.value)
                }
                placeholder="Title"
                required
              />

              {/* DESCRIPTION */}
              <textarea
                className="w-full border p-2"
                value={currentProject.description}
                onChange={(e) =>
                  handleProjectChange('description', e.target.value)
                }
                placeholder="Description"
              />

              {/* IMAGE */}
              <input
                className="w-full border p-2"
                value={currentProject.image}
                onChange={(e) =>
                  handleProjectChange('image', e.target.value)
                }
                placeholder="Image URL"
              />

              {currentProject.image && (
                <img
                  src={currentProject.image}
                  className="h-32 w-full object-cover rounded"
                />
              )}

              {/* TECH */}
              <div>
                <button
                  type="button"
                  onClick={addTech}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Add Tech
                </button>

                {currentProject.tech.map((t, i) => (
                  <div key={i} className="flex gap-2 mt-2">
                    <input
                      className="flex-1 border p-2"
                      value={t}
                      onChange={(e) =>
                        handleTechChange(i, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => removeTech(i)}
                      className="bg-red-500 text-white px-2"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>

              {/* GITHUB */}
              <input
                className="w-full border p-2"
                value={currentProject.github}
                onChange={(e) =>
                  handleProjectChange('github', e.target.value)
                }
                placeholder="GitHub"
              />

              {/* DEMO */}
              <input
                className="w-full border p-2"
                value={currentProject.demo}
                onChange={(e) =>
                  handleProjectChange('demo', e.target.value)
                }
                placeholder="Demo"
              />

              {/* ORDER (FIXED NaN ISSUE) */}
              <input
                type="number"
                className="w-full border p-2"
                value={
                  isNaN(currentProject.order)
                    ? ''
                    : currentProject.order
                }
                onChange={(e) => {
                  const val = e.target.value;
                  handleProjectChange(
                    'order',
                    val === '' ? 0 : Number(val)
                  );
                }}
                placeholder="Order"
              />

              {/* BUTTONS */}
              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-green-500 text-white py-2"
                >
                  {submitting ? 'Saving...' : 'Save'}
                </button>

                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 bg-gray-500 text-white py-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}