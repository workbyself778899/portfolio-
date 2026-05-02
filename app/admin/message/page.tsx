'use client';

import { useState, useEffect } from 'react';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function Message() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      const result = await response.json();
      if (result.success) {
        setMessages(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    setDeleting(id);
    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        alert('Message deleted successfully!');
        setMessages(messages.filter((msg) => msg._id !== id));
        setSelectedMessage(null);
      } else {
        alert('Error deleting message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Error deleting message');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading)
    return <div className="p-6 text-foreground">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>

      {messages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg opacity-70">No messages yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto border rounded-lg p-4 border-foreground/20">
            {messages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-3 rounded-lg cursor-pointer transition ${
                  selectedMessage?._id === msg._id
                    ? 'bg-blue-500 text-white border-2 border-white'
                    : 'hover:border hover:border-foreground/40'
                }`}
              >
                <p className="font-bold text-sm truncate">{msg.name}</p>
                <p className="text-xs opacity-70 truncate">{msg.email}</p>
                <p className="text-xs opacity-70 truncate">
                  {msg.message.substring(0, 50)}...
                </p>
              </div>
            ))}
          </div>

          {/* Message Details */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="border rounded-lg p-6 bg-background  border-foreground/20">
                <div className="mb-4 pb-4 border-b border-foreground/20">
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedMessage.name}
                  </h2>

                  <p className="opacity-80 mb-1">
                    <span className="font-medium">Email:</span>{' '}
                    {selectedMessage.email}
                  </p>

                  <p className="text-sm opacity-60">
                    <span className="font-medium">Received:</span>{' '}
                    {formatDate(selectedMessage.createdAt)}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Message</h3>
                  <div className="p-4 rounded-lg whitespace-pre-wrap border border-foreground/20 bg-background">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedMessage.email);
                      alert('Email copied to clipboard!');
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Copy Email
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteMessage(selectedMessage._id)
                    }
                    disabled={deleting === selectedMessage._id}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400"
                  >
                    {deleting === selectedMessage._id
                      ? 'Deleting...'
                      : 'Delete Message'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center py-20">
                <p className="text-lg opacity-70">
                  Select a message to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="mt-8 pt-4 border-t border-foreground/20">
        <p className="opacity-80">
          Total Messages:{' '}
          <span className="font-bold">{messages.length}</span>
        </p>
      </div>
    </div>
  );
}