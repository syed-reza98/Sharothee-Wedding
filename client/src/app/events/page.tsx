import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Holud",
      date: "2025-12-16",
      venue: "Fourtis Platinum Ground",
      location: "Dhaka, Bangladesh",
      description: "",
      dressCode: "",
      type: "holud"
    },
    {
      id: 2,
      title: "Akdh",
      date: "2025-12-17",
      venue: "Seraton Hotel",
      location: "Dhaka, Bangladesh",
      description: "",
      dressCode: "",
      type: "akdh"
    },
    {
      id: 3,
      title: "Reception",
      date: "2025-12-18",
      venue: "BCFCC",
      location: "Dhaka, Bangladesh",
      description: "",
      dressCode: "",
      type: "reception"
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'holud': return '🌼';
      case 'akdh': return '💍';
      case 'reception': return '🥂';
      case 'after_party': return '🏖️';
      default: return '🎉';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-wedding">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-secondary mb-4 sm:mb-6">
            Wedding Events
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Join us for a series of beautiful celebrations as we begin our journey together as husband and wife.
          </p>
        </div>
      </section>


      {/* Events Timeline */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 sm:space-y-12">
            {events.map((event, index) => (
              <div key={event.id} className="relative" data-testid="event-timeline-item">
                {/* Timeline Line */}
                {index < events.length - 1 && (
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-0.5 top-32 w-0.5 h-24 bg-primary/30"></div>
                )}
                
                <div className={`grid lg:grid-cols-2 gap-6 lg:gap-8 items-center ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                }`}>
                  {/* Event Details */}
                  <div className={`${index % 2 === 0 ? '' : 'lg:col-start-2'}`}>
                    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1" data-testid="event-card">
                      <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6">
                        <span className="text-3xl sm:text-4xl mr-0 sm:mr-4 mb-2 sm:mb-0" data-testid="event-icon">{getEventIcon(event.type)}</span>
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-secondary mb-2">
                            {event.title}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center text-muted space-y-1 sm:space-y-0 sm:space-x-4 text-sm sm:text-base">
                            <span className="flex items-center">
                              📅 {new Date(event.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                        <div className="flex items-start">
                          <span className="text-primary mr-3 text-lg flex-shrink-0">📍</span>
                          <div>
                            <p className="font-bold text-gray-900 text-base sm:text-lg">{event.venue}</p>
                            <p className="text-gray-900 text-sm sm:text-base">{event.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          {/* Dress code removed as requested */}
                        </div>
                      </div>
                      
                      <p className="text-muted leading-relaxed mb-6 text-sm sm:text-base">
                        {/* Description removed as requested */}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button className="bg-primary hover:bg-primary-dark text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                          View Details
                        </button>
                        <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200">
                          Add to Calendar
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Event Image Placeholder */}
                  <div className={`${index % 2 === 0 ? '' : 'lg:col-start-1'} order-first lg:order-none`}>
                    <div className="bg-gradient-to-br from-accent to-cream-200 rounded-xl h-48 sm:h-56 lg:h-64 flex items-center justify-center shadow-lg">
                      <div className="text-center">
                        <span className="text-4xl sm:text-5xl mb-2 sm:mb-4 block">{getEventIcon(event.type)}</span>
                        <p className="text-muted font-medium text-sm sm:text-base">{event.title} Photo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Streaming Info */}
      <section className="py-12 sm:py-16 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-secondary mb-4 sm:mb-6">
            Can&apos;t Make It? Join Us Online
          </h2>
          <p className="text-muted mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We understand not everyone can travel to be with us in person. We&apos;ll be live streaming key moments 
            so you can still be part of our special day.
          </p>
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xl max-w-sm sm:max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📺</div>
            <h3 className="font-semibold text-foreground mb-2 text-lg sm:text-xl">Live Stream Available</h3>
            <p className="text-xs sm:text-sm text-muted mb-4 sm:mb-6">Wedding ceremony and reception will be broadcast live</p>
            <button className="bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Stream Link
            </button>
          </div>
        </div>
      </section>

      {/* RSVP CTA */}
      <section className="py-12 sm:py-16 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-secondary mb-4 sm:mb-6">
            Ready to Celebrate With Us?
          </h2>
          <p className="text-muted mb-6 sm:mb-8 text-sm sm:text-base">
            Let us know which events you&apos;ll be attending so we can plan accordingly.
          </p>
          <Link 
            href="/rsvp"
            className="bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block text-sm sm:text-base"
          >
            RSVP Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}