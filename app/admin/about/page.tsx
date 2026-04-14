
'use client';

import { useState, useEffect } from 'react';

interface Timeline {
  title: string;
  institution: string;
  period: string;
  description: string;
}

interface AboutSkill {
  name: string;
  level: number;
}

interface AboutData {
  _id?: string;
  title: string;
  describe: string;
  paragraphs: string[];
  timeline: Timeline[];
  skills: AboutSkill[];
}

export default function About() {
  const [data, setData] = useState<AboutData>({
    title: '',
    describe: '',
    paragraphs: [],
    timeline: [],
    skills: [],
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch('/api/sections/about');
      const result = await response.json();
      if (result.success && result.data) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
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

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...data.paragraphs];
    newParagraphs[index] = value;
    setData((prev) => ({
      ...prev,
      paragraphs: newParagraphs,
    }));
  };

  const addParagraph = () => {
    setData((prev) => ({
      ...prev,
      paragraphs: [...prev.paragraphs, ''],
    }));
  };

  const removeParagraph = (index: number) => {
    setData((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index),
    }));
  };

  const handleTimelineChange = (index: number, field: string, value: string) => {
    const newTimeline = [...data.timeline];
    newTimeline[index] = {
      ...newTimeline[index],
      [field]: value,
    };
    setData((prev) => ({
      ...prev,
      timeline: newTimeline,
    }));
  };

  const addTimeline = () => {
    setData((prev) => ({
      ...prev,
      timeline: [...prev.timeline, { title: '', institution: '', period: '', description: '' }],
    }));
  };

  const removeTimeline = (index: number) => {
    setData((prev) => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== index),
    }));
  };

  const handleSkillChange = (index: number, field: string, value: any) => {
    const newSkills = [...data.skills];
    newSkills[index] = {
      ...newSkills[index],
      [field]: value,
    };
    setData((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const addSkill = () => {
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: '', level: 0 }],
    }));
  };

  const removeSkill = (index: number) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/sections/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        alert('About section updated successfully!');
        setData(result.data);
      } else {
        alert('Error updating about section');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error updating about section');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit About Section</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="About title"
          />
        </div>

        {/* Describe */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={data.describe}
            onChange={(e) => handleInputChange('describe', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
            placeholder="Main description"
          />
        </div>

        {/* Paragraphs */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium">Paragraphs</label>
            <button
              type="button"
              onClick={addParagraph}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Paragraph
            </button>
          </div>
          <div className="space-y-3">
            {data.paragraphs.map((paragraph, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={paragraph}
                  onChange={(e) => handleParagraphChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Paragraph ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeParagraph(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium">Timeline</label>
            <button
              type="button"
              onClick={addTimeline}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Timeline Entry
            </button>
          </div>
          <div className="space-y-4">
            {data.timeline.map((entry, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-3">
                <input
                  type="text"
                  value={entry.title}
                  onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={entry.institution}
                  onChange={(e) => handleTimelineChange(index, 'institution', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Institution"
                />
                <input
                  type="text"
                  value={entry.period}
                  onChange={(e) => handleTimelineChange(index, 'period', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Period (e.g., 2020 - 2023)"
                />
                <textarea
                  value={entry.description}
                  onChange={(e) => handleTimelineChange(index, 'description', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description"
                />
                <button
                  type="button"
                  onClick={() => removeTimeline(index)}
                  className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove Timeline Entry
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium">Skills</label>
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Skill
            </button>
          </div>
          <div className="space-y-3">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex gap-2 items-end">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Skill name"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                  className="w-24 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Level (0-100)"
                />
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
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