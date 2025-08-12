'use client';

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

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

  const contacts = [
    {
      title: "Wedding Coordinators",
      people: [
        { name: "Sarah Johnson", role: "Lead Coordinator", phone: "+880 1234-567890", email: "sarah@weddingplanner.com" },
        { name: "Michael Chen", role: "Assistant Coordinator", phone: "+880 1234-567891", email: "michael@weddingplanner.com" }
      ]
    },
    {
      title: "Emergency Contacts",
      people: [
        { name: "Emergency Hotline", role: "24/7 Support", phone: "+880 1234-911911", email: "emergency@inciaandarvins.wedding" },
        { name: "Hotel Concierge", role: "Guest Services", phone: "+880 1234-567892", email: "concierge@dhakaregency.com" }
      ]
    }
  ];

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
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-foreground/90 tracking-[0.015em]">
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
                  <div className="text-5xl sm:text-6xl mb-4">✉️</div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-secondary mb-4">
                    Message Sent!
                  </h2>
                  <p className="text-foreground/80 mb-6 text-sm sm:text-base leading-relaxed">
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
                  <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-secondary mb-6 tracking-tight">
                    Send us a message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 tracking-wide">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2 tracking-wide">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2 tracking-wide">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2 tracking-wide">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
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
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2 tracking-wide">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border-2 border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-vertical"
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
              {/* Quick Contact */}
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-secondary mb-4 sm:mb-6">
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary">📧</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-foreground/85 text-sm font-light">contact@inciaandarvins.wedding</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary">📱</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">WhatsApp</p>
                      <p className="text-foreground/85 text-sm font-light">+880 1234-567890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary">📍</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Wedding Location</p>
                      <p className="text-foreground/85 text-sm font-light">Dhaka, Bangladesh</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wedding Team Contacts */}
              {contacts.map((contactGroup, groupIndex) => (
                <div key={groupIndex} className="bg-white rounded-xl p-6 sm:p-8 shadow-xl">
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold text-secondary mb-4 sm:mb-6">
                    {contactGroup.title}
                  </h3>
                  <div className="space-y-4">
                    {contactGroup.people.map((person, personIndex) => (
                      <div key={personIndex} className="border-b border-cream-100 pb-4 last:border-b-0 last:pb-0">
                        <p className="font-medium text-foreground">{person.name}</p>
                        <p className="text-sm text-foreground/80 mb-2 font-light tracking-wide">{person.role}</p>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 sm:space-y-0 text-sm">
                          <a 
                            href={`tel:${person.phone}`}
                            className="text-primary hover:underline"
                          >
                            {person.phone}
                          </a>
                          <a 
                            href={`mailto:${person.email}`}
                            className="text-primary hover:underline"
                          >
                            {person.email}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-secondary mb-4 sm:mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-foreground/80 text-sm sm:text-base leading-relaxed tracking-[0.01em]">
              Here are some common questions we receive. Don&apos;t see your question? Feel free to contact us!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-foreground mb-3">When should I RSVP?</h3>
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                Please RSVP as soon as possible, but no later than July 15, 2025. 
                This helps us finalize catering and seating arrangements.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-foreground mb-3">What&apos;s the dress code?</h3>
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                We&apos;ll have different dress codes for each event. Detailed information 
                will be sent with your invitation and is available on our Events page.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-foreground mb-3">Can I bring a plus-one?</h3>
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                Plus-one information is specified on your invitation. If you have 
                questions about your invitation, please contact us directly.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-foreground mb-3">Will there be vegetarian/vegan options?</h3>
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                Yes! We&apos;ll have various dietary options available. Please let us know 
                about any specific dietary requirements when you RSVP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-secondary mb-4 sm:mb-6">
            Ready to Celebrate with Us?
          </h2>
          <p className="text-foreground/85 mb-8 text-sm sm:text-base leading-relaxed">
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