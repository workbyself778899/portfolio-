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

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch('/api/sections/contact');
      const result = await response.json();

      if (result.success && result.data) {
        // ✅ Normalize data safely
        const normalizedData: ContactData = {
          _id: result.data._id,
          email: result.data.email || '',
          location: result.data.location || '',
          contactText: result.data.contactText || '',
          availability: result.data.availability || '',
          socialLinks: {
            github: result.data.socialLinks?.github || '',
            linkedin: result.data.socialLinks?.linkedin || '',
            twitter: result.data.socialLinks?.twitter || '',
          },
        };

        setData(normalizedData);
      }
    } catch (error) {
      console.error('Error fetching contact data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ContactData, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialLinkChange = (platform: keyof SocialLinks, value: string) => {
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

        // ✅ Normalize again after save
        setData({
          _id: result.data._id,
          email: result.data.email || '',
          location: result.data.location || '',
          contactText: result.data.contactText || '',
          availability: result.data.availability || '',
          socialLinks: {
            github: result.data.socialLinks?.github || '',
            linkedin: result.data.socialLinks?.linkedin || '',
            twitter: result.data.socialLinks?.twitter || '',
          },
        });
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
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Contact Text */}
        <div>
          <label className="block text-sm font-medium mb-2">Contact Section Text</label>
          <textarea
            value={data.contactText}
            onChange={(e) => handleInputChange('contactText', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg min-h-32"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium mb-2">Availability</label>
          <input
            type="text"
            value={data.availability}
            onChange={(e) => handleInputChange('availability', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Social Links */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Social Links</h2>

          <input
            type="url"
            value={data.socialLinks?.github || ''}
            onChange={(e) => handleSocialLinkChange('github', e.target.value)}
            placeholder="GitHub URL"
            className="w-full mb-3 px-4 py-2 border rounded-lg"
          />

          <input
            type="url"
            value={data.socialLinks?.linkedin || ''}
            onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
            placeholder="LinkedIn URL"
            className="w-full mb-3 px-4 py-2 border rounded-lg"
          />

          <input
            type="url"
            value={data.socialLinks?.twitter || ''}
            onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
            placeholder="Twitter URL"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}