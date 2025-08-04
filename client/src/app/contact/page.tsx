'use client';

import Link from "next/link";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
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
    },
    {
      title: "Travel Assistance",
      people: [
        { name: "Travel Desk", role: "Flight & Transport", phone: "+880 1234-567893", email: "travel@inciaandarvins.wedding" },
        { name: "Visa Support", role: "Documentation Help", phone: "+880 1234-567894", email: "visa@inciaandarvins.wedding" }
      ]
    }
  ];

  const faqs = [
    {
      question: "What should I wear to the wedding?",
      answer: "For the wedding ceremony, we recommend formal traditional or western attire. For the mehndi ceremony, colorful traditional wear is preferred. For the Vietnam after-party, beach formal or resort wear is appropriate."
    },
    {
      question: "Do I need a visa to travel to Bangladesh?",
      answer: "Most visitors require a visa to enter Bangladesh. Please check with the Bangladesh embassy in your country or contact our visa support team for assistance with the application process."
    },
    {
      question: "What is the weather like in Dhaka in August?",
      answer: "August is typically warm and humid in Dhaka with temperatures around 25-32°C (77-90°F). There may be occasional monsoon showers, so we recommend bringing light rain gear."
    },
    {
      question: "Are there vegetarian/vegan food options?",
      answer: "Yes! We will have extensive vegetarian and vegan options at all events. Please indicate your dietary preferences in your RSVP so we can ensure adequate arrangements."
    },
    {
      question: "What about the after-party in Vietnam?",
      answer: "The Vietnam celebration is a separate event requiring additional travel. Details about flights, accommodation, and activities will be sent to invited guests separately."
    },
    {
      question: "Can I bring a plus-one?",
      answer: "Plus-ones are included based on your invitation. If you're unsure about your guest allowance, please contact us with your RSVP code and we'll clarify."
    }
  ];

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
                <Link href="/rsvp" className="text-muted hover:text-primary transition-colors">
                  RSVP
                </Link>
                <Link href="/travel" className="text-muted hover:text-primary transition-colors">
                  Travel
                </Link>
                <Link href="/contact" className="text-foreground font-medium">
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
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Have questions about the wedding? Need assistance with travel or accommodations? We're here to help!
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-serif font-semibold text-secondary mb-6">
              Send us a message
            </h2>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="rsvp">RSVP Related</option>
                      <option value="travel">Travel & Accommodation</option>
                      <option value="events">Event Information</option>
                      <option value="dietary">Dietary Requirements</option>
                      <option value="accessibility">Accessibility Needs</option>
                      <option value="general">General Question</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    placeholder="Please provide details about your question or request..."
                    className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contacts.map((section, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-serif font-semibold text-secondary mb-4">
                  {section.title}
                </h3>
                <div className="space-y-4">
                  {section.people.map((person, personIndex) => (
                    <div key={personIndex} className="border-b border-cream-100 last:border-b-0 pb-4 last:pb-0">
                      <h4 className="font-medium text-foreground">{person.name}</h4>
                      <p className="text-sm text-muted mb-2">{person.role}</p>
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="text-primary">📞</span>
                          <a href={`tel:${person.phone}`} className="ml-2 text-muted hover:text-primary">
                            {person.phone}
                          </a>
                        </p>
                        <p className="text-sm">
                          <span className="text-primary">✉️</span>
                          <a href={`mailto:${person.email}`} className="ml-2 text-muted hover:text-primary">
                            {person.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-secondary mb-6">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            <Link href="/rsvp" className="text-cream-200 hover:text-white transition-colors">
              RSVP
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