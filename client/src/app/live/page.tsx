"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

interface Stream {
  id: string;
  title: string;
  description?: string;
  streamUrl: string;
  isLive: boolean;
  eventId?: string;
  startTime?: string;
  endTime?: string;
}

export default function LiveStreamPage() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    try {
      const response = await fetch('/api/streams');
      if (response.ok) {
        const data = await response.json();
        setStreams(data);
        // Auto-select the first live stream
        const liveStream = data.find((stream: Stream) => stream.isLive);
        if (liveStream) {
          setSelectedStream(liveStream);
        }
      }
    } catch (error) {
      console.error('Failed to fetch streams:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    return new Date(timeString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-wedding">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-light text-secondary mb-6">
            Live Stream
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Join us virtually for our special celebration! Watch our wedding events live from anywhere in the world.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">📺</div>
              <p className="text-muted">Loading streams...</p>
            </div>
          ) : streams.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center shadow-lg">
              <div className="text-6xl mb-6">📺</div>
              <h2 className="text-2xl font-semibold text-secondary mb-4">
                No Live Streams Available
              </h2>
              <p className="text-muted mb-8 max-w-2xl mx-auto">
                We&apos;re not currently streaming any events. Check back during our wedding ceremonies to watch live!
              </p>
              <div className="bg-cream-50 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="font-semibold text-foreground mb-2">Upcoming Streams</h3>
                <div className="space-y-2 text-sm text-muted">
                  <div className="flex justify-between">
                    <span>Mehndi Ceremony</span>
                    <span>August 15, 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wedding Ceremony</span>
                    <span>August 16, 10:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reception Dinner</span>
                    <span>August 16, 7:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Main Stream Player */}
              {selectedStream && (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="aspect-video bg-black relative">
                    {selectedStream.isLive ? (
                      <div className="w-full h-full flex items-center justify-center">
                        {/* In a real implementation, this would be an actual video player */}
                        <div className="text-center text-white">
                          <div className="animate-pulse text-red-500 text-6xl mb-4">🔴</div>
                          <h3 className="text-2xl font-semibold mb-2">LIVE</h3>
                          <p className="text-lg">{selectedStream.title}</p>
                          <p className="text-sm opacity-75 mt-2">
                            Stream URL: {selectedStream.streamUrl}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-6xl mb-4">📺</div>
                          <h3 className="text-2xl font-semibold mb-2">Stream Offline</h3>
                          <p className="text-lg">{selectedStream.title}</p>
                          {selectedStream.startTime && (
                            <p className="text-sm opacity-75 mt-2">
                              Starts: {formatTime(selectedStream.startTime)}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-secondary">
                        {selectedStream.title}
                      </h2>
                      {selectedStream.isLive && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          🔴 LIVE
                        </span>
                      )}
                    </div>
                    {selectedStream.description && (
                      <p className="text-muted mb-4">{selectedStream.description}</p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-muted">
                      {selectedStream.startTime && (
                        <span>Start: {formatTime(selectedStream.startTime)}</span>
                      )}
                      {selectedStream.endTime && (
                        <span>End: {formatTime(selectedStream.endTime)}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Stream List */}
              {streams.length > 1 && (
                <div>
                  <h2 className="text-2xl font-serif font-semibold text-secondary mb-6">
                    Available Streams
                  </h2>
                  <div className="grid gap-4">
                    {streams.map((stream) => (
                      <div
                        key={stream.id}
                        className={`bg-white rounded-lg p-6 shadow cursor-pointer transition-shadow hover:shadow-md ${
                          selectedStream?.id === stream.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedStream(stream)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-foreground">
                                {stream.title}
                              </h3>
                              {stream.isLive && (
                                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                  🔴 LIVE
                                </span>
                              )}
                            </div>
                            {stream.description && (
                              <p className="text-muted text-sm">{stream.description}</p>
                            )}
                            <div className="flex gap-4 text-xs text-muted mt-2">
                              {stream.startTime && (
                                <span>Start: {formatTime(stream.startTime)}</span>
                              )}
                              {stream.endTime && (
                                <span>End: {formatTime(stream.endTime)}</span>
                              )}
                            </div>
                          </div>
                          <div className="text-2xl">
                            {stream.isLive ? '🔴' : '📺'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stream Instructions */}
              <div className="bg-white/50 rounded-lg p-8">
                <h2 className="text-2xl font-serif font-semibold text-secondary mb-6">
                  How to Watch
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">🕐 Stream Schedule</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Mehndi Ceremony</span>
                        <span className="text-muted">Aug 15, 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wedding Ceremony</span>
                        <span className="text-muted">Aug 16, 10:00 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reception Dinner</span>
                        <span className="text-muted">Aug 16, 7:00 PM</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">💡 Tips for Best Experience</h3>
                    <ul className="space-y-1 text-sm text-muted">
                      <li>• Use a stable internet connection</li>
                      <li>• Join 10-15 minutes before start time</li>
                      <li>• Refresh the page if you encounter issues</li>
                      <li>• Use headphones for better audio quality</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
