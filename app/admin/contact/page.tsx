
'use client';

import { useState, useEffect } from 'react';

interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

interface ContactData {
  _id?: string;
  email: string;
  location: string;
  socialLinks: SocialLinks;
  contactText: string;
  availability: string;
}

export default function Contact() {
  const [data, setData] = useState<ContactData>({
    email: '',
    location: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
    },
    contactText: '',
    availability: '',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch('/api/sections/contact');
      const result = await response.json();
      if (result.success && result.data) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching contact data:', error);
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

  const handleSocialLinkChange = (platform: string, value: string) => {
    setData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/sections/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        alert('Contact section updated successfully!');
        setData(result.data);
      } else {
        alert('Error updating contact section');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error updating contact section');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Contact Section</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your location"
          />
        </div>

        {/* Contact Text */}
        <div>
          <label className="block text-sm font-medium mb-2">Contact Section Text</label>
          <textarea
            value={data.contactText}
            onChange={(e) => handleInputChange('contactText', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
            placeholder="Enter the text to display in the contact section"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium mb-2">Availability Status</label>
          <input
            type="text"
            value={data.availability}
            onChange={(e) => handleInputChange('availability', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Available for freelance work"
          />
        </div>

        {/* Social Links */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Social Links</h2>

          {/* GitHub */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">GitHub URL</label>
            <input
              type="url"
              value={data.socialLinks.github}
              onChange={(e) => handleSocialLinkChange('github', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://github.com/..."
            />
          </div>

          {/* LinkedIn */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
            <input
              type="url"
              value={data.socialLinks.linkedin}
              onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          {/* Twitter */}
          <div>
            <label className="block text-sm font-medium mb-2">Twitter/X URL</label>
            <input
              type="url"
              value={data.socialLinks.twitter}
              onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://twitter.com/..."
            />
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