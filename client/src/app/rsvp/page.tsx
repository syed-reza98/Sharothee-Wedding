"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { HandRaisedIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function RSVPPage() {
  // Always show the simplified RSVP form per spec
  const [step, setStep] = useState<1 | 2 | 3>(2);
  // Types for clarity and safety
  type GuestInfo = { id: string; name: string; email: string; country: string };
  // Demo guest name for a friendly greeting
  const [guestInfo] = useState<GuestInfo>({ id: "demo", name: "Guest", email: "", country: "" });
  const [loading, setLoading] = useState(false);
  // Form state based on RSVP_FORM_QUESTIONS.md
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        guestName: guestInfo?.name || "",
        willAttendDhaka,
        familySide,
        guestCountOption,
        guestCountOther: guestCountOther || undefined,
        additionalInfo,
        contact: {
          preferred: { number: contactPreferred, whatsapp: contactPreferredWhatsApp, botim: contactPreferredBotim },
          secondary: { number: contactSecondary, whatsapp: contactSecondaryWhatsApp, botim: contactSecondaryBotim },
          emergency: { name: emergencyName, phone: emergencyPhone, email: emergencyEmail },
          email: emailAddress,
        },
      };
      const res = await fetch('/api/rsvp/form', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit RSVP form');
      }
      setStep(3);
    } catch (err) {
      console.error('RSVP form submit error:', err);
      alert('Sorry, we could not submit your RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
  }

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
          {step === 2 && (
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg">
              <div className="text-center mb-6 sm:mb-8">
                <div className="mb-4 flex justify-center">
                  <HandRaisedIcon className="h-10 w-10 text-primary" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-serif font-semibold text-secondary mb-2">Welcome, {guestInfo?.name}!</h2>
                <p className="text-gray-700">Please answer the questions below to complete your RSVP.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-white">
                  <div className="space-y-6">
                    {/* Q1 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Will you be able to grace us with your presence in Dhaka?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {([
                          { key: 'yes', label: 'Yes, I will attend' },
                          { key: 'no', label: 'No, I will not attend' },
                          { key: 'maybe', label: 'Maybe' },
                        ] as { key: AttendDhaka; label: string }[]).map((opt) => (
                          <label key={opt.key} className="flex items-center gap-2 border-2 border-gray-200 rounded-lg p-3 cursor-pointer hover:border-primary/60">
                            <input type="radio" name="attendDhaka" className="h-4 w-4" checked={willAttendDhaka === opt.key} onChange={() => setWillAttendDhaka(opt.key)} />
                            <span className="text-sm font-medium text-gray-900">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Q2 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Are you from The Bride&apos;s Family or The Groom&apos;s Family?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {([
                          { key: 'bride', label: "The Bride's Family" },
                          { key: 'groom', label: "The Groom's Family" },
                          { key: 'both', label: 'Both Families' },
                        ] as { key: FamilySide; label: string }[]).map((opt) => (
                          <label key={opt.key} className="flex items-center gap-2 border-2 border-gray-200 rounded-lg p-3 cursor-pointer hover:border-primary/60">
                            <input type="radio" name="familySide" className="h-4 w-4" checked={familySide === opt.key} onChange={() => setFamilySide(opt.key)} />
                            <span className="text-sm font-medium text-gray-900">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Q3 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">How many guests will be present?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                        {(['1','2','3','4','other'] as GuestCount[]).map((opt) => (
                          <label key={opt} className="flex items-center gap-2 border-2 border-gray-200 rounded-lg p-3 cursor-pointer hover:border-primary/60">
                            <input type="radio" name="guestCount" className="h-4 w-4" checked={guestCountOption === opt} onChange={() => setGuestCountOption(opt)} />
                            <span className="text-sm font-medium text-gray-900">{opt==='other' ? 'Other' : `${opt} ${opt==='1'?'person':'people'}`}</span>
                          </label>
                        ))}
                      </div>
                      {guestCountOption==='other' && (
                        <div className="mt-3">
                          <input type="number" min={1} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg" placeholder="Please specify number of people" value={guestCountOther} onChange={e=>setGuestCountOther(e.target.value)} />
                        </div>
                      )}
                    </div>

                    {/* Q4 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Is there any additional information you’d like to share with us (food allergies, accommodation needs, medical conditions)?</label>
                      <textarea rows={3} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg" placeholder="Your notes…" value={additionalInfo} onChange={e=>setAdditionalInfo(e.target.value)} />
                    </div>

                    {/* Q5 */}
                    <div className="space-y-4">
                      <h4 className="text-md font-semibold text-gray-900">Contact Details</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">Preferred Number</label>
                          <div className="flex gap-3">
                            <input type="tel" className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg" placeholder="Phone number" value={contactPreferred} onChange={e=>setContactPreferred(e.target.value)} />
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
                          <label className="block text-sm font-semibold text-gray-900 mb-2">Secondary Number</label>
                          <input type="tel" className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg" placeholder="Secondary phone" value={contactSecondary} onChange={e=>setContactSecondary(e.target.value)} />
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
                          <label htmlFor="emergency_name" className="block text-sm font-semibold text-gray-900 mb-2">Emergency Contact Name</label>
                          <input id="emergency_name" className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg" placeholder="Full name" value={emergencyName} onChange={e=>setEmergencyName(e.target.value)} />
                        </div>
                        <div>
                          <label htmlFor="emergency_phone" className="block text-sm font-semibold text-gray-900 mb-2">Emergency Contact Phone</label>
                          <input id="emergency_phone" type="tel" className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg" placeholder="Phone number" value={emergencyPhone} onChange={e=>setEmergencyPhone(e.target.value)} />
                        </div>
                        <div>
                          <label htmlFor="emergency_email" className="block text-sm font-semibold text-gray-900 mb-2">Emergency Contact Email</label>
                          <input id="emergency_email" type="email" className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg" placeholder="name@example.com" value={emergencyEmail} onChange={e=>setEmergencyEmail(e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                        <input type="email" required className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg" placeholder="you@example.com" value={emailAddress} onChange={e=>setEmailAddress(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors">
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