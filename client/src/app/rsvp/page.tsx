
'use client';

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

export default function RSVPPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };
  // Start directly at RSVP form (step 2), no code required
  // Use environment variable to control whether to skip RSVP code step (demo vs production)
  const [step, setStep] = useState(
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_SKIP_RSVP_CODE === "true" ? 2 : 1
  );
  // Demo guest info and events for visibility (replace with real fetch in production)
  const [guestInfo] = useState({
    id: 'demo',
    name: 'Guest',
    email: '',
    country: ''
  });
  const [events] = useState([
    { id: '1', title: 'Holud', date: '2025-12-16' },
    { id: '2', title: 'Akdh', date: '2025-12-17' },
    { id: '3', title: 'Reception', date: '2025-12-18' }
  ]);
  const [responses, setResponses] = useState<Record<string, {
    response?: string;
    num_attendees?: number;
    dietary_preferences?: string;
    comments?: string;
  }>>({});
  const [loading, setLoading] = useState(false);

  const handleResponseChange = (eventId: string, field: string, value: string | number) => {
    setResponses(prev => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-wedding">
      <Navigation />
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-secondary mb-4 sm:mb-6">
            RSVP
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            We can&apos;t wait to celebrate with you! Please let us know if you&apos;ll be joining us.
          </p>
        </div>
      </section>
      {/* RSVP Form (no code required) */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {step === 2 && (
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">👋</div>
                <h2 className="text-2xl font-serif font-semibold text-secondary mb-2">
                  Welcome, {guestInfo?.name}!
                </h2>
                <p className="text-gray-900 font-semibold">
                  Please let us know which events you&apos;ll be attending.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                {events.map((event) => (
                  <div key={event.id} className="border border-gray-400 rounded-lg p-6 bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                        <p className="text-gray-900 text-sm font-semibold">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          Will you be attending?
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {['attending', 'not_attending', 'maybe'].map((response) => (
                            <label key={response} className="cursor-pointer">
                              <input
                                type="radio"
                                name={`response_${event.id}`}
                                value={response}
                                onChange={(e) => handleResponseChange(event.id, 'response', e.target.value)}
                                className="sr-only"
                              />
                              <div className={`p-3 text-center rounded-lg border-2 transition-colors font-semibold ${
                                responses[event.id]?.response === response
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-gray-400 text-gray-900 bg-white hover:border-primary/50'
                              }`}>
                                <div className="text-lg mb-1">
                                  {response === 'attending' ? '✅' : response === 'not_attending' ? '❌' : '🤔'}
                                </div>
                                <div className="text-xs font-medium">
                                  {response === 'attending' ? 'Yes' : response === 'not_attending' ? 'No' : 'Maybe'}
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      {responses[event.id]?.response === 'attending' && (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor={`attendees_${event.id}`} className="block text-sm font-bold text-gray-900 mb-2">
                              Number of attendees
                            </label>
                            <select
                              id={`attendees_${event.id}`}
                              onChange={(e) => handleResponseChange(event.id, 'num_attendees', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 font-bold"
                            >
                              <option value="1">1 person</option>
                              <option value="2">2 people</option>
                              <option value="3">3 people</option>
                              <option value="4">4 people</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor={`dietary_${event.id}`} className="block text-sm font-bold text-gray-900 mb-2">
                              Dietary preferences
                            </label>
                            <select
                              id={`dietary_${event.id}`}
                              onChange={(e) => handleResponseChange(event.id, 'dietary_preferences', e.target.value)}
                              className="w-full px-3 py-2 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 font-bold"
                            >
                              <option value="">No preferences</option>
                              <option value="vegetarian">Vegetarian</option>
                              <option value="vegan">Vegan</option>
                              <option value="halal">Halal</option>
                              <option value="kosher">Kosher</option>
                              <option value="gluten_free">Gluten Free</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div>
                  <label htmlFor="special_requests" className="block text-sm font-bold text-gray-900 mb-2">
                    Special requests or message
                  </label>
                  <textarea
                    id="special_requests"
                    rows={4}
                    placeholder="Any special requests, accessibility needs, or a message for the couple..."
                    className="w-full px-4 py-3 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 font-bold"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {loading ? 'Submitting RSVP...' : 'Submit RSVP'}
                </button>
              </form>
            </div>
          )}
          {step === 3 && (
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-serif font-semibold text-secondary mb-4">
                Thank You!
              </h2>
              <p className="text-muted mb-8 max-w-md mx-auto">
                Your RSVP has been submitted successfully. We&apos;ll send you a confirmation email 
                with all the details shortly.
              </p>
              <div className="space-y-4">
                <Link 
                  href="/events"
                  className="block bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  View Event Details
                </Link>
                <Link 
                  href="/travel"
                  className="block border border-primary text-primary hover:bg-primary hover:text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Travel Information
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );

}