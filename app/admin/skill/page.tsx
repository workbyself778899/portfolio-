
'use client';

import { useState, useEffect } from 'react';

interface TechStack {
  name: string;
  icon: string;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: string[];
}

interface SkillData {
  _id?: string;
  categories: SkillCategory[];
  techStack: TechStack[];
  description: string;
}

export default function Skill() {
  const [data, setData] = useState<SkillData>({
    categories: [],
    techStack: [],
    description: '',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchSkillData();
  }, []);

  const fetchSkillData = async () => {
    try {
      const response = await fetch('/api/sections/skills');
      const result = await response.json();
      if (result.success && result.data) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching skill data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Category handlers
  const handleCategoryChange = (index: number, field: string, value: any) => {
    const newCategories = [...data.categories];
    if (field === 'title') {
      newCategories[index] = {
        ...newCategories[index],
        title: value,
      };
    }
    setData((prev) => ({
      ...prev,
      categories: newCategories,
    }));
  };

  const handleSkillChange = (categoryIndex: number, skillIndex: number, value: string) => {
    const newCategories = [...data.categories];
    const newSkills = [...newCategories[categoryIndex].skills];
    newSkills[skillIndex] = value;
    newCategories[categoryIndex] = {
      ...newCategories[categoryIndex],
      skills: newSkills,
    };
    setData((prev) => ({
      ...prev,
      categories: newCategories,
    }));
  };

  const addSkillToCategory = (categoryIndex: number) => {
    const newCategories = [...data.categories];
    newCategories[categoryIndex].skills.push('');
    setData((prev) => ({
      ...prev,
      categories: newCategories,
    }));
  };

  const removeSkillFromCategory = (categoryIndex: number, skillIndex: number) => {
    const newCategories = [...data.categories];
    newCategories[categoryIndex].skills = newCategories[categoryIndex].skills.filter(
      (_, i) => i !== skillIndex
    );
    setData((prev) => ({
      ...prev,
      categories: newCategories,
    }));
  };

  const addCategory = () => {
    setData((prev) => ({
      ...prev,
      categories: [...prev.categories, { title: '', skills: [] }],
    }));
  };

  const removeCategory = (index: number) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index),
    }));
  };

  // TechStack handlers
  const handleTechStackChange = (index: number, field: string, value: string) => {
    const newTechStack = [...data.techStack];
    newTechStack[index] = {
      ...newTechStack[index],
      [field]: value,
    };
    setData((prev) => ({
      ...prev,
      techStack: newTechStack,
    }));
  };

  const addTechStack = () => {
    setData((prev) => ({
      ...prev,
      techStack: [...prev.techStack, { name: '', icon: '', color: '' }],
    }));
  };

  const removeTechStack = (index: number) => {
    setData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/sections/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        alert('Skills section updated successfully!');
        setData(result.data);
      } else {
        alert('Error updating skills section');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error updating skills section');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Skills Section</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
            placeholder="Skills section description"
          />
        </div>

        {/* Categories */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium">Skill Categories</label>
            <button
              type="button"
              onClick={addCategory}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Category
            </button>
          </div>
          <div className="space-y-4">
            {data.categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="border p-4 rounded-lg space-y-3">
                <input
                  type="text"
                  value={category.title}
                  onChange={(e) => handleCategoryChange(categoryIndex, 'title', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Category title"
                />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Skills in this category</label>
                    <button
                      type="button"
                      onClick={() => addSkillToCategory(categoryIndex)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      Add Skill
                    </button>
                  </div>
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) =>
                          handleSkillChange(categoryIndex, skillIndex, e.target.value)
                        }
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Skill name"
                      />
                      <button
                        type="button"
                        onClick={() => removeSkillFromCategory(categoryIndex, skillIndex)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => removeCategory(categoryIndex)}
                  className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove Category
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium">Tech Stack</label>
            <button
              type="button"
              onClick={addTechStack}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Tech
            </button>
          </div>
          <div className="space-y-4">
            {data.techStack.map((tech, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-3">
                <input
                  type="text"
                  value={tech.name}
                  onChange={(e) => handleTechStackChange(index, 'name', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Technology name"
                />
                <input
                  type="text"
                  value={tech.icon}
                  onChange={(e) => handleTechStackChange(index, 'icon', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Icon (URL or class name)"
                />
                <input
                  type="text"
                  value={tech.color}
                  onChange={(e) => handleTechStackChange(index, 'color', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Color (hex or color name)"
                />
                <button
                  type="button"
                  onClick={() => removeTechStack(index)}
                  className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove Tech
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-medium"
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}