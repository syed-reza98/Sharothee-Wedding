'use client';

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        console.error('Contact form error:', errorData);
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  return (
    <div className="min-h-screen bg-gradient-wedding">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-secondary mb-4 sm:mb-6">
            Contact Us
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Have questions about our wedding? We&apos;d love to hear from you!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="mb-4 flex justify-center">
                    <EnvelopeOpenIcon className="h-16 w-16 sm:h-20 sm:w-20 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-secondary mb-4">
                    Message Sent!
                  </h2>
                  <p className="text-muted mb-6 text-sm sm:text-base">
                    Thank you for reaching out! We&apos;ll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-secondary mb-6">
                    Send us a message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 text-gray-900 bg-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-medium placeholder-gray-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 text-gray-900 bg-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-medium placeholder-gray-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 text-gray-900 bg-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-medium placeholder-gray-500 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-bold text-gray-900 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 text-gray-900 bg-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-medium transition-all"
                        required
                      >
                        <option value="">Please select a subject</option>
                        <option value="RSVP">RSVP Questions</option>
                        <option value="TRAVEL">Travel & Accommodation</option>
                        <option value="EVENTS">Event Details</option>
                        <option value="DIETARY">Dietary Requirements</option>
                        <option value="ACCESSIBILITY">Accessibility Needs</option>
                        <option value="GENERAL">General Questions</option>
                        <option value="EMERGENCY">Emergency</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border-2 border-gray-300 text-gray-900 bg-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-medium placeholder-gray-500 transition-all resize-vertical"
                        placeholder="Tell us how we can help you..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">

              {/* Wedding Team Contacts */}
              {/* Emergency Contacts Only */}
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xl border-2 border-primary">
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-primary mb-4 sm:mb-6 text-center">Emergency Contacts</h3>
                <div className="flex flex-col gap-4 items-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                    <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4">
                      <span className="font-bold text-gray-900 text-lg">Rana</span>
                      <a href="tel:+8801793403767" className="text-primary hover:underline font-semibold text-base">+880 17 9340 3767</a>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4">
                      <span className="font-bold text-gray-900 text-lg">Tahamina</span>
                      <a href="tel:+8801799997024" className="text-primary hover:underline font-semibold text-base">+880 17 9999 7024</a>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4">
                      <span className="font-bold text-gray-900 text-lg">Fazlu</span>
                      <a href="tel:+8801713302987" className="text-primary hover:underline font-semibold text-base">+880 17 1330 2987</a>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4">
                      <span className="font-bold text-gray-900 text-lg">Lalin</span>
                      <a href="tel:+8801730012090" className="text-primary hover:underline font-semibold text-base">+880 17 3001 2090</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}

      {/* CTA Section */}
      <section className="py-16 sm:py-20 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-secondary mb-4 sm:mb-6">
            Ready to Celebrate with Us?
          </h2>
          <p className="text-muted mb-8 text-sm sm:text-base">
            Don&apos;t forget to RSVP and check out all the wedding details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Link 
              href="/rsvp"
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              RSVP Now
            </Link>
            <Link 
              href="/events"
              className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300"
            >
              View Events
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}