'use client';

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

export default function RSVPPage() {
  const [step, setStep] = useState(1);
  const [token, setToken] = useState('');
  const [guestInfo, setGuestInfo] = useState<{
    id: string;
    name: string;
    email: string;
    country: string;
  } | null>(null);
  const [events, setEvents] = useState<Array<{
    id: string;
    title: string;
    date: string;
    time: string;
  }>>([]);
  const [responses, setResponses] = useState<Record<string, {
    response?: string;
    num_attendees?: number;
    dietary_preferences?: string;
    comments?: string;
  }>>({});
  const [loading, setLoading] = useState(false);

  const handleTokenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/rsvp/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        setGuestInfo(data.guest);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setEvents(data.events.map((event: any) => ({
          id: event.id,
          title: event.title,
          date: event.date.split('T')[0],
          time: event.time,
        })));
        setStep(2);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Invalid RSVP token');
      }
    } catch (error) {
      console.error('Token validation error:', error);
      alert('Failed to validate token. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResponseChange = (eventId: string, field: string, value: string | number) => {
    setResponses(prev => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const rsvpPromises = Object.entries(responses).map(([eventId, response]) => {
        if (!response.response) return null;

        return fetch('/api/rsvp/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            guestId: guestInfo!.id,
            eventId,
            response: response.response.toUpperCase(),
            attendees: response.num_attendees || 1,
            dietaryPreferences: response.dietary_preferences,
            comments: response.comments,
          }),
        });
      }).filter(Boolean);

      await Promise.all(rsvpPromises);
      setStep(3);
    } catch (error) {
      console.error('RSVP submission error:', error);
      alert('Failed to submit RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
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

      {/* RSVP Form */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {step === 1 && (
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xl">
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎫</div>
                <h2 className="text-xl sm:text-2xl font-serif font-semibold text-secondary mb-2">
                  Enter Your RSVP Code
                </h2>
                <p className="text-muted text-sm sm:text-base">
                  Please enter the RSVP code from your invitation to continue.
                </p>
              </div>

              <form onSubmit={handleTokenSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="token" className="block text-sm font-medium text-foreground mb-2">
                    RSVP Code
                  </label>
                  <input
                    type="text"
                    id="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter your RSVP code"
                    className="w-full px-4 py-3 border-2 border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-center text-lg tracking-wider transition-all"
                    required
                  />
                  <p className="text-xs sm:text-sm text-muted mt-2">
                    Your RSVP code can be found on your invitation card or email.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {loading ? 'Validating...' : 'Continue'}
                </button>
              </form>

              <div className="mt-8 p-4 bg-cream-50 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Don&apos;t have an RSVP code?</h3>
                <p className="text-sm text-muted mb-3">
                  If you can&apos;t find your RSVP code, please contact us and we&apos;ll help you out.
                </p>
                <Link 
                  href="/contact"
                  className="text-primary hover:text-primary-dark font-medium text-sm"
                >
                  Contact Us →
                </Link>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">👋</div>
                <h2 className="text-2xl font-serif font-semibold text-secondary mb-2">
                  Welcome, {guestInfo?.name}!
                </h2>
                <p className="text-muted">
                  Please let us know which events you&apos;ll be attending.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {events.map((event) => (
                  <div key={event.id} className="border border-cream-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                        <p className="text-muted text-sm">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
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
                              <div className={`p-3 text-center rounded-lg border-2 transition-colors ${
                                responses[event.id]?.response === response
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-cream-200 text-muted hover:border-primary/50'
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
                            <label htmlFor={`attendees_${event.id}`} className="block text-sm font-medium text-foreground mb-2">
                              Number of attendees
                            </label>
                            <select
                              id={`attendees_${event.id}`}
                              onChange={(e) => handleResponseChange(event.id, 'num_attendees', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                              <option value="1">1 person</option>
                              <option value="2">2 people</option>
                              <option value="3">3 people</option>
                              <option value="4">4 people</option>
                            </select>
                          </div>

                          <div>
                            <label htmlFor={`dietary_${event.id}`} className="block text-sm font-medium text-foreground mb-2">
                              Dietary preferences
                            </label>
                            <select
                              id={`dietary_${event.id}`}
                              onChange={(e) => handleResponseChange(event.id, 'dietary_preferences', e.target.value)}
                              className="w-full px-3 py-2 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                  <label htmlFor="special_requests" className="block text-sm font-medium text-foreground mb-2">
                    Special requests or message
                  </label>
                  <textarea
                    id="special_requests"
                    rows={4}
                    placeholder="Any special requests, accessibility needs, or a message for the couple..."
                    className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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