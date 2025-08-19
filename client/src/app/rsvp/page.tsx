"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { HandRaisedIcon, CheckCircleIcon, XMarkIcon, QuestionMarkCircleIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function RSVPPage() {
  // Always start at RSVP form (step 2)
  const [step, setStep] = useState(2);
  // Token field (for Step 1 flow)
  const [token, setToken] = useState<string>("");

  // Types for clarity and safety
  type RSVPEvent = { id: string; title: string; date: string; time?: string };
  type GuestInfo = { id: string; name: string; email: string; country: string };
  type RSVPResponseFields = {
    response?: "attending" | "not_attending" | "maybe";
    num_attendees?: number;
    dietary_preferences?: string;
    comments?: string;
  };

  // TODO: Replace demo guest info and events with real fetch in production
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    id: "demo",
    name: "Guest",
    email: "",
    country: "",
  });
  const [events, setEvents] = useState<RSVPEvent[]>([
    { id: "1", title: "Holud", date: "2025-12-16" },
    { id: "2", title: "Akdh", date: "2025-12-17" },
    { id: "3", title: "Reception", date: "2025-12-18" },
  ]);
  const [responses, setResponses] = useState<Record<string, RSVPResponseFields>>({});
  const [loading, setLoading] = useState(false);
  // General RSVP questions state
  type AttendDhaka = "yes" | "no" | "maybe";
  type FamilySide = "bride" | "groom" | "both";
  type GuestCount = "1" | "2" | "3" | "4" | "other";

  const [willAttendDhaka, setWillAttendDhaka] = useState<AttendDhaka | "">("");
  const [familySide, setFamilySide] = useState<FamilySide | "">("");
  const [guestCountOption, setGuestCountOption] = useState<GuestCount | "">("");
  const [guestCountOther, setGuestCountOther] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [contactPreferred, setContactPreferred] = useState<string>("");
  const [contactPreferredWhatsApp, setContactPreferredWhatsApp] = useState<boolean>(false);
  const [contactPreferredBotim, setContactPreferredBotim] = useState<boolean>(false);
  const [contactSecondary, setContactSecondary] = useState<string>("");
  const [contactSecondaryWhatsApp, setContactSecondaryWhatsApp] = useState<boolean>(false);
  const [contactSecondaryBotim, setContactSecondaryBotim] = useState<boolean>(false);
  const [emergencyName, setEmergencyName] = useState<string>("");
  const [emergencyPhone, setEmergencyPhone] = useState<string>("");
  const [emergencyEmail, setEmergencyEmail] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");

  const handleResponseChange = (eventId: string, field: string, value: string | number) => {
    setResponses((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submit; replace with real API call in production
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 700);
  };

  const handleTokenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/rsvp/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data: { guest: GuestInfo; events: Array<{ id: string; title: string; date: string; time?: string }> } = await response.json();
        setGuestInfo(data.guest);
        setEvents(
          data.events.map((event) => ({
            id: event.id,
            title: event.title,
            date: event.date.includes('T') ? event.date.split('T')[0] : event.date,
            time: event.time,
          }))
        );
        setStep(2);
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.error || 'Invalid RSVP token');
      }
    } catch (err) {
      console.error('Token validation error:', err);
      alert('Failed to validate token. Please try again.');
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
                <div className="mb-4 flex justify-center">
                  <HandRaisedIcon className="h-10 w-10 text-primary" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-serif font-semibold text-secondary mb-2">
                  Welcome, {guestInfo?.name}!
                </h2>
                <p className="text-gray-900 font-semibold">Please let us know which events you&apos;ll be attending.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* General RSVP questions */}
                <div className="border border-gray-300 rounded-lg p-6 bg-white">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">General RSVP Questions</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Will you be able to grace us with your presence in Dhaka?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {([
                          { key: 'yes', label: 'Yes, I will attend' },
                          { key: 'no', label: 'No, I will not attend' },
                          { key: 'maybe', label: 'Maybe' },
                        ] as { key: AttendDhaka; label: string }[]).map((opt) => (
                          <label key={opt.key} className="flex items-center gap-2 border-2 border-gray-300 rounded-lg p-3 cursor-pointer hover:border-primary/60">
                            <input type="radio" name="attendDhaka" className="h-4 w-4" checked={willAttendDhaka === opt.key} onChange={() => setWillAttendDhaka(opt.key)} />
                            <span className="text-sm font-medium text-gray-900">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Are you from The Bride&apos;s Family or The Groom&apos;s Family?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {([
                          { key: 'bride', label: "The Bride's Family" },
                          { key: 'groom', label: "The Groom's Family" },
                          { key: 'both', label: 'Both Families' },
                        ] as { key: FamilySide; label: string }[]).map((opt) => (
                          <label key={opt.key} className="flex items-center gap-2 border-2 border-gray-300 rounded-lg p-3 cursor-pointer hover:border-primary/60">
                            <input type="radio" name="familySide" className="h-4 w-4" checked={familySide === opt.key} onChange={() => setFamilySide(opt.key)} />
                            <span className="text-sm font-medium text-gray-900">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">How many guests will be present?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                        {(['1','2','3','4','other'] as GuestCount[]).map((opt) => (
                          <label key={opt} className="flex items-center gap-2 border-2 border-gray-300 rounded-lg p-3 cursor-pointer hover:border-primary/60">
                            <input type="radio" name="guestCount" className="h-4 w-4" checked={guestCountOption === opt} onChange={() => setGuestCountOption(opt)} />
                            <span className="text-sm font-medium text-gray-900">{opt==='other' ? 'Other' : `${opt} ${opt==='1'?'person':'people'}`}</span>
                          </label>
                        ))}
                      </div>
                      {guestCountOption==='other' && (
                        <div className="mt-3">
                          <input type="number" min={1} className="w-full px-3 py-2 border-2 border-gray-700 rounded-lg" placeholder="Please specify number of people" value={guestCountOther} onChange={e=>setGuestCountOther(e.target.value)} />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Is there any additional information you’d like to share with us (food allergies, accommodation needs, medical conditions)?</label>
                      <textarea rows={3} className="w-full px-3 py-2 border-2 border-gray-700 rounded-lg" placeholder="Your notes…" value={additionalInfo} onChange={e=>setAdditionalInfo(e.target.value)} />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-md font-semibold text-gray-900">Contact Details</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-900 mb-2">Preferred Number</label>
                          <div className="flex gap-3">
                            <input type="tel" className="flex-1 px-3 py-2 border-2 border-gray-700 rounded-lg" placeholder="Phone number" value={contactPreferred} onChange={e=>setContactPreferred(e.target.value)} />
                          </div>
                          <div className="flex items-center gap-6 mt-2">
                            <label className="inline-flex items-center gap-2 text-sm">
                              <input type="checkbox" checked={contactPreferredWhatsApp} onChange={e=>setContactPreferredWhatsApp(e.target.checked)} /> WhatsApp
                            </label>
                            <label className="inline-flex items-center gap-2 text-sm">
                              <input type="checkbox" checked={contactPreferredBotim} onChange={e=>setContactPreferredBotim(e.target.checked)} /> Botim
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-900 mb-2">Secondary Number</label>
                          <input type="tel" className="w-full px-3 py-2 border-2 border-gray-700 rounded-lg" placeholder="Secondary phone" value={contactSecondary} onChange={e=>setContactSecondary(e.target.value)} />
                          <div className="flex items-center gap-6 mt-2">
                            <label className="inline-flex items-center gap-2 text-sm">
                              <input type="checkbox" checked={contactSecondaryWhatsApp} onChange={e=>setContactSecondaryWhatsApp(e.target.checked)} /> WhatsApp
                            </label>
                            <label className="inline-flex items-center gap-2 text-sm">
                              <input type="checkbox" checked={contactSecondaryBotim} onChange={e=>setContactSecondaryBotim(e.target.checked)} /> Botim
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="emergency_name" className="block text-sm font-bold text-gray-900 mb-2">Emergency Contact Name</label>
                          <input id="emergency_name" className="w-full px-3 py-2 border-2 border-gray-700 rounded-lg" placeholder="Full name" value={emergencyName} onChange={e=>setEmergencyName(e.target.value)} />
                        </div>
                        <div>
                          <label htmlFor="emergency_phone" className="block text-sm font-bold text-gray-900 mb-2">Emergency Contact Phone</label>
                          <input id="emergency_phone" type="tel" className="w-full px-3 py-2 border-2 border-gray-700 rounded-lg" placeholder="Phone number" value={emergencyPhone} onChange={e=>setEmergencyPhone(e.target.value)} />
                        </div>
                        <div>
                          <label htmlFor="emergency_email" className="block text-sm font-bold text-gray-900 mb-2">Emergency Contact Email</label>
                          <input id="emergency_email" type="email" className="w-full px-3 py-2 border-2 border-gray-700 rounded-lg" placeholder="name@example.com" value={emergencyEmail} onChange={e=>setEmergencyEmail(e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
                        <input type="email" className="w-full px-3 py-2 border-2 border-gray-700 rounded-lg" placeholder="you@example.com" value={emailAddress} onChange={e=>setEmailAddress(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
                {events.map((event) => (
                  <div key={event.id} className="border border-cream-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                        <p className="text-gray-900 text-sm font-semibold">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Will you be attending?</label>
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
                              <div
                                className={`p-3 text-center rounded-lg border-2 transition-colors font-semibold ${
                                  responses[event.id]?.response === response
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-gray-400 text-gray-900 bg-white hover:border-primary/50'
                                }`}
                              >
                                <div className="flex items-center justify-center mb-1">
                                  {response === 'attending' && <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />}
                                  {response === 'not_attending' && <XMarkIcon className="h-5 w-5" aria-hidden="true" />}
                                  {response === 'maybe' && <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />}
                                </div>
                                <div className="text-xs font-medium">{response === 'attending' ? 'Yes' : response === 'not_attending' ? 'No' : 'Maybe'}</div>
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
              <div className="mb-6 flex justify-center">
                <SparklesIcon className="h-12 w-12 text-primary" aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-serif font-semibold text-secondary mb-4">Thank You!</h2>
              <p className="text-muted mb-8 max-w-md mx-auto">
                Your RSVP has been submitted successfully. We&apos;ll send you a confirmation email with all the details shortly.
              </p>
              
              <div className="space-y-4">
                <Link href="/events" className="block bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg font-medium transition-colors">
                  View Event Details
                </Link>
                <Link href="/travel" className="block border border-primary text-primary hover:bg-primary hover:text-white py-3 px-6 rounded-lg font-medium transition-colors">
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