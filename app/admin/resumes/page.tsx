
'use client';

import { useState, useEffect } from 'react';

interface ResumeItem {
  title: string;
  org: string;
  period: string;
  description: string;
}

interface ResumeSection {
  type: string;
  items: ResumeItem[];
}

interface ResumeData {
  _id?: string;
  sections: ResumeSection[];
  cvUrl: string;
  downloadText: string;
  description: string;
}

export default function Resumes() {
  const [data, setData] = useState<ResumeData>({
    sections: [],
    cvUrl: '',
    downloadText: '',
    description: '',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    try {
      const response = await fetch('/api/sections/resumes');
      const result = await response.json();
      if (result.success && result.data) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching resume data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSectionTypeChange = (index: number, value: string) => {
    const newSections = [...data.sections];
    newSections[index] = {
      ...newSections[index],
      type: value,
    };
    setData((prev) => ({
      ...prev,
      sections: newSections,
    }));
  };

  const handleItemChange = (sectionIndex: number, itemIndex: number, field: string, value: string) => {
    const newSections = [...data.sections];
    const newItems = [...newSections[sectionIndex].items];
    newItems[itemIndex] = {
      ...newItems[itemIndex],
      [field]: value,
    };
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      items: newItems,
    };
    setData((prev) => ({
      ...prev,
      sections: newSections,
    }));
  };

  const addItem = (sectionIndex: number) => {
    const newSections = [...data.sections];
    newSections[sectionIndex].items.push({
      title: '',
      org: '',
      period: '',
      description: '',
    });
    setData((prev) => ({
      ...prev,
      sections: newSections,
    }));
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...data.sections];
    newSections[sectionIndex].items = newSections[sectionIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setData((prev) => ({
      ...prev,
      sections: newSections,
    }));
  };

  const addSection = () => {
    setData((prev) => ({
      ...prev,
      sections: [...prev.sections, { type: '', items: [] }],
    }));
  };

  const removeSection = (index: number) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/sections/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        alert('Resume section updated successfully!');
        setData(result.data);
      } else {
        alert('Error updating resume section');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error updating resume section');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Resume Section</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-20"
            placeholder="Resume section description"
          />
        </div>

        {/* CV URL */}
        <div>
          <label className="block text-sm font-medium mb-2">CV/Resume Download URL</label>
          <input
            type="url"
            value={data.cvUrl}
            onChange={(e) => handleInputChange('cvUrl', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
          />
        </div>

        {/* Download Text */}
        <div>
          <label className="block text-sm font-medium mb-2">Download Button Text</label>
          <input
            type="text"
            value={data.downloadText}
            onChange={(e) => handleInputChange('downloadText', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Download Resume"
          />
        </div>

        {/* Sections */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium">Resume Sections</label>
            <button
              type="button"
              onClick={addSection}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Section
            </button>
          </div>
          <div className="space-y-6">
            {data.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border p-4 rounded-lg space-y-4">
                {/* Section Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Section Type</label>
                  <input
                    type="text"
                    value={section.type}
                    onChange={(e) => handleSectionTypeChange(sectionIndex, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Experience, Education, Certifications"
                  />
                </div>

                {/* Items in Section */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium">Items</label>
                    <button
                      type="button"
                      onClick={() => addItem(sectionIndex)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      Add Item
                    </button>
                  </div>
                  <div className="space-y-4 bg-gray-50 p-3 rounded">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="border p-3 rounded-lg space-y-2 bg-white">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            handleItemChange(sectionIndex, itemIndex, 'title', e.target.value)
                          }
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Title"
                        />
                        <input
                          type="text"
                          value={item.org}
                          onChange={(e) =>
                            handleItemChange(sectionIndex, itemIndex, 'org', e.target.value)
                          }
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Organization"
                        />
                        <input
                          type="text"
                          value={item.period}
                          onChange={(e) =>
                            handleItemChange(sectionIndex, itemIndex, 'period', e.target.value)
                          }
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Period (e.g., 2020 - 2022)"
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(sectionIndex, itemIndex, 'description', e.target.value)
                          }
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Description"
                          rows={3}
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(sectionIndex, itemIndex)}
                          className="w-full px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                        >
                          Remove Item
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Remove Section Button */}
                <button
                  type="button"
                  onClick={() => removeSection(sectionIndex)}
                  className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove Section
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