
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

  // Fetch data on mount
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
    setCurrentProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setCurrentProject(null);
    setShowForm(false);
  };

  const handleProjectChange = (field: string, value: any) => {
    if (currentProject) {
      setCurrentProject({
        ...currentProject,
        [field]: value,
      });
    }
  };

  const handleTechChange = (index: number, value: string) => {
    if (currentProject) {
      const newTech = [...currentProject.tech];
      newTech[index] = value;
      setCurrentProject({
        ...currentProject,
        tech: newTech,
      });
    }
  };

  const addTech = () => {
    if (currentProject) {
      setCurrentProject({
        ...currentProject,
        tech: [...currentProject.tech, ''],
      });
    }
  };

  const removeTech = (index: number) => {
    if (currentProject) {
      setCurrentProject({
        ...currentProject,
        tech: currentProject.tech.filter((_, i) => i !== index),
      });
    }
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject) return;

    setSubmitting(true);
    try {
      const isEditing = currentProject._id;
      const url = '/api/sections/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentProject),
      });

      const result = await response.json();
      if (result.success) {
        alert(isEditing ? 'Project updated successfully!' : 'Project created successfully!');
        await fetchProjects();
        handleCloseForm();
      } else {
        alert('Error saving project');
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      alert('Error saving project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string | undefined) => {
    if (!id) return;

    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/sections/projects?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        alert('Project deleted successfully!');
        await fetchProjects();
      } else {
        alert('Error deleting project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Projects</h1>
        <button
          onClick={handleAddProject}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
        >
          Add New Project
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {projects.map((project) => (
          <div key={project._id} className="border p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, i) => (
                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditProject(project)}
                className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProject(project._id)}
                className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Form */}
      {showForm && currentProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6">
              {currentProject._id ? 'Edit Project' : 'Add New Project'}
            </h2>

            <form onSubmit={handleSubmitProject} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={currentProject.title}
                  onChange={(e) => handleProjectChange('title', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Project title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={currentProject.description}
                  onChange={(e) => handleProjectChange('description', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                  placeholder="Project description"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  value={currentProject.image}
                  onChange={(e) => handleProjectChange('image', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Image URL"
                />
              </div>

              {/* Technologies */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Technologies</label>
                  <button
                    type="button"
                    onClick={addTech}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Add Tech
                  </button>
                </div>
                <div className="space-y-2">
                  {currentProject.tech.map((tech, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => handleTechChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Technology name"
                      />
                      <button
                        type="button"
                        onClick={() => removeTech(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub URL */}
              <div>
                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={currentProject.github}
                  onChange={(e) => handleProjectChange('github', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/..."
                />
              </div>

              {/* Demo URL */}
              <div>
                <label className="block text-sm font-medium mb-1">Demo URL</label>
                <input
                  type="url"
                  value={currentProject.demo}
                  onChange={(e) => handleProjectChange('demo', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium mb-1">Display Order</label>
                <input
                  type="number"
                  value={currentProject.order}
                  onChange={(e) => handleProjectChange('order', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Display order"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-medium"
                >
                  {submitting ? 'Saving...' : 'Save Project'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
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