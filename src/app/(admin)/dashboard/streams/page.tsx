"use client";

import { useState, useEffect } from "react";

interface Stream {
  id: string;
  title: string;
  description?: string;
  streamUrl: string;
  isLive: boolean;
  eventId?: string;
  startTime?: string;
  endTime?: string;
  createdAt: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
}

export default function AdminStreamsPage() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [streamForm, setStreamForm] = useState({
    title: '',
    description: '',
    streamUrl: '',
    eventId: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    fetchStreams();
    fetchEvents();
  }, []);

  const fetchStreams = async () => {
    try {
      const response = await fetch('/api/streams');
      if (response.ok) {
        const data = await response.json();
        setStreams(data);
      }
    } catch (error) {
      console.error('Failed to fetch streams:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const handleCreateStream = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const response = await fetch('/api/streams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: streamForm.title,
          description: streamForm.description,
          streamUrl: streamForm.streamUrl,
          eventId: streamForm.eventId || null,
          startTime: streamForm.startTime ? new Date(streamForm.startTime).toISOString() : null,
          endTime: streamForm.endTime ? new Date(streamForm.endTime).toISOString() : null,
        }),
      });

      if (response.ok) {
        await fetchStreams();
        setStreamForm({
          title: '',
          description: '',
          streamUrl: '',
          eventId: '',
          startTime: '',
          endTime: '',
        });
        setShowForm(false);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to create stream');
      }
    } catch (error) {
      console.error('Stream creation error:', error);
      alert('Failed to create stream');
    } finally {
      setCreating(false);
    }
  };

  const toggleStreamStatus = async (id: string, isLive: boolean) => {
    try {
      const response = await fetch(`/api/streams/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isLive: !isLive }),
      });

      if (response.ok) {
        await fetchStreams();
      } else {
        alert('Failed to update stream status');
      }
    } catch (error) {
      console.error('Stream update error:', error);
      alert('Failed to update stream status');
    }
  };

  const deleteStream = async (id: string) => {
    if (!confirm('Are you sure you want to delete this stream?')) return;

    try {
      const response = await fetch(`/api/streams/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchStreams();
      } else {
        alert('Failed to delete stream');
      }
    } catch (error) {
      console.error('Stream deletion error:', error);
      alert('Failed to delete stream');
    }
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Streams</h1>
          <p className="text-gray-600 mt-2">Manage live streaming for wedding events.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          Create Stream
        </button>
      </div>

      {/* Create Stream Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Stream</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStream} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={streamForm.title}
                  onChange={(e) => setStreamForm({ ...streamForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stream URL *
                </label>
                <input
                  type="url"
                  value={streamForm.streamUrl}
                  onChange={(e) => setStreamForm({ ...streamForm, streamUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={streamForm.description}
                  onChange={(e) => setStreamForm({ ...streamForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Associated Event
                </label>
                <select
                  value={streamForm.eventId}
                  onChange={(e) => setStreamForm({ ...streamForm, eventId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                >
                  <option value="">None</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title} - {event.date} {event.time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={streamForm.startTime}
                    onChange={(e) => setStreamForm({ ...streamForm, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    value={streamForm.endTime}
                    onChange={(e) => setStreamForm({ ...streamForm, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  {creating ? 'Creating...' : 'Create Stream'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Streams List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Streams ({streams.length})</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading streams...</p>
            </div>
          ) : streams.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No streams created yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {streams.map((stream) => (
                <div key={stream.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{stream.title}</h3>
                        {stream.isLive && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            🔴 LIVE
                          </span>
                        )}
                      </div>
                      {stream.description && (
                        <p className="text-gray-600 text-sm mb-2">{stream.description}</p>
                      )}
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>URL: {stream.streamUrl}</div>
                        {stream.startTime && (
                          <div>Start: {formatDateTime(stream.startTime)}</div>
                        )}
                        {stream.endTime && (
                          <div>End: {formatDateTime(stream.endTime)}</div>
                        )}
                        <div>Created: {formatDateTime(stream.createdAt)}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => toggleStreamStatus(stream.id, stream.isLive)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          stream.isLive
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {stream.isLive ? 'Stop' : 'Start'}
                      </button>
                      <button
                        onClick={() => deleteStream(stream.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded text-sm font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
