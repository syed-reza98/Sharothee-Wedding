'use client';

import Link from "next/link";
import { useState } from "react";

export default function RSVPPage() {
  const [step, setStep] = useState(1);
  const [token, setToken] = useState('');
  const [guestInfo, setGuestInfo] = useState<{
    name: string;
    email: string;
    country: string;
  } | null>(null);
  const [responses, setResponses] = useState<Record<number, {
    attending: string;
    plusOnes: number;
    dietary: string;
    comments: string;
    response?: string;
    num_attendees?: number;
    dietary_preferences?: string;
  }>>({});

  const events = [
    { id: 1, title: "Mehndi Ceremony", date: "2025-08-15", time: "6:00 PM" },
    { id: 2, title: "Wedding Ceremony", date: "2025-08-16", time: "10:00 AM" },
    { id: 3, title: "Reception Dinner", date: "2025-08-16", time: "7:00 PM" },
    { id: 4, title: "After-Party in Vietnam", date: "2025-08-20", time: "4:00 PM" }
  ];

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate token validation
    if (token.length >= 6) {
      setGuestInfo({
        name: "John & Jane Doe",
        email: "john.doe@example.com",
        country: "United States"
      });
      setStep(2);
    }
  };

  const handleResponseChange = (eventId: number, field: string, value: string | number) => {
    setResponses(prev => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit RSVP
    alert('RSVP submitted successfully! You will receive a confirmation email shortly.');
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-wedding">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-xl font-serif font-semibold text-secondary">
                I & A
              </h1>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/" className="text-muted hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/events" className="text-muted hover:text-primary transition-colors">
                  Events
                </Link>
                <Link href="/gallery" className="text-muted hover:text-primary transition-colors">
                  Gallery
                </Link>
                <Link href="/rsvp" className="text-foreground font-medium">
                  RSVP
                </Link>
                <Link href="/travel" className="text-muted hover:text-primary transition-colors">
                  Travel
                </Link>
                <Link href="/contact" className="text-muted hover:text-primary transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-light text-secondary mb-6">
            RSVP
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            We can&apos;t wait to celebrate with you! Please let us know if you&apos;ll be joining us.
          </p>
        </div>
      </section>

      {/* RSVP Form */}
      <section className="pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {step === 1 && (
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">🎫</div>
                <h2 className="text-2xl font-serif font-semibold text-secondary mb-2">
                  Enter Your RSVP Code
                </h2>
                <p className="text-muted">
                  Please enter the RSVP code from your invitation to continue.
                </p>
              </div>

              <form onSubmit={handleTokenSubmit} className="space-y-6">
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
                    className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-lg tracking-wider"
                    required
                  />
                  <p className="text-sm text-muted mt-2">
                    Your RSVP code can be found on your invitation card or email.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Continue
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
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Submit RSVP
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

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-serif font-light mb-4">
            Incia & Arvin
          </h3>
          <p className="text-cream-200 mb-6">
            Thank you for being part of our love story
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/contact" className="text-cream-200 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/" className="text-cream-200 hover:text-white transition-colors">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}