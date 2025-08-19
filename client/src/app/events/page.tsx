import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function EventsPage() {
  // Helpers: build address string, maps URL, and ICS calendar content safely on the server
  const events = [
    {
      id: 1,
      title: "Mehndi Ceremony",
      date: "2025-08-15",
      time: "6:00 PM",
      venue: "Private Residence",
      location: "Dhaka, Bangladesh",
      description: "Traditional mehndi ceremony with family and close friends. Join us for an evening of music, dance, and beautiful henna designs.",
      dressCode: "Colorful traditional attire",
      type: "mehndi"
      address: [
        "NEAR TO ADAMJEE CANTONMENT PUBLIC SCHOOL & COLLEGE",
        "JOLSHIRI, PURBACHAL, DHAKA-1216"
      ],
      description: "",
      dressCode: "",
      type: "holud"
    },
    {
      id: 2,
      title: "Wedding Ceremony",
      date: "2025-08-16",
      time: "10:00 AM",
      venue: "Dhaka Regency Hotel",
      location: "Dhaka, Bangladesh",
      description: "The main wedding ceremony where Incia and Arvin will exchange vows surrounded by family and friends.",
      dressCode: "Formal traditional or western attire",
      type: "wedding"
      venue: "SHERATON DHAKA — Sheraton Grand Ballroom (Level 12)",
      address: [
        "44 KEMAL ATATURK AVENUE, BANANI",
    },
    {
      id: 3,
      title: "Reception Dinner",
      date: "2025-08-16",
      time: "7:00 PM",
      venue: "Dhaka Regency Hotel",
      location: "Dhaka, Bangladesh",
      description: "Evening reception with dinner, speeches, and dancing to celebrate the newlyweds.",
      dressCode: "Formal attire",
        "AGARGAON, SHER-E-BANGLA NAGAR",
        "DHAKA-1209"
      ],
      type: "reception"
    },
      description: "Extended celebration on the beautiful beaches of Phu Quoc with intimate friends and family.",
      dressCode: "Beach formal / Resort wear",
    }
  ];

  const getEventIcon = (type: string): React.ElementType => {
    switch (type) {
      case 'after_party': return '🏖️';
      default: return '🎉';
      case 'holud': return SparklesIcon;
      case 'akdh': return HeartIcon;
      case 'reception': return GiftTopIcon;
      default: return SparklesIcon;
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
                                  })}
                                </time>
                                {event.time ? (
                                  <>
                                    {' '}·{' '}
                                    <time dateTime={(() => { const m = event.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i); if(!m) return ''; const hh = parseInt(m[1],10) % 12 + (m[3].toUpperCase()==='PM'?12:0); return `${String(hh).padStart(2,'0')}:${m[2]}`; })()}>{event.time}</time>
                                  </>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                        <div className="flex items-start">
                          <span className="text-primary mr-3 flex-shrink-0" aria-hidden>
                            <MapPinIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <div>
                            <p className="font-semibold text-secondary tracking-wide uppercase text-base sm:text-lg leading-snug">{event.venue}</p>
                            <address className="not-italic space-y-0.5 mt-0.5">
                              {Array.isArray((event as any).address) ? (
                                (event as any).address.map((line: string, i: number) => (
                                  <p key={i} className="text-gray-700 text-sm sm:text-base leading-relaxed">{toTitleCase(line)}</p>
                                ))
                              ) : (
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{toTitleCase((event as any).location as string)}</p>
                              )}
                            </address>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressString(event.venue, (event as any).address))}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${event.venue} in Google Maps`}
                                className="inline-flex items-center gap-1.5 text-primary text-xs sm:text-sm font-medium rounded-full border border-primary/30 px-3 py-1.5 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
                              >
                                <MapPinIcon className="h-4 w-4" aria-hidden="true" /> Get Directions <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                              </a>
                              <a
                                href={buildIcsDataUri(event.title, event.date, (event as any).time, event.venue, (event as any).address)}
                                download={`${event.title.replace(/\s+/g,'-')}-${event.date}.ics`}
                                aria-label={`Add ${event.title} on ${new Date(event.date).toLocaleDateString('en-US')} to your calendar`}
                                className="inline-flex items-center gap-1.5 text-primary text-xs sm:text-sm font-medium rounded-full border border-primary/30 px-3 py-1.5 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
                              >
                                <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" /> Add to Calendar (.ics)
                              </a>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          {/* Dress code removed as requested */}
                        </div>
                      </div>
                      
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
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
                          <div className="text-center text-primary">
                            {(() => { const Icon = getEventIcon(event.type); return <Icon className="h-10 w-10 sm:h-12 sm:w-12 inline-block mb-2 sm:mb-4" aria-hidden="true" />; })()}
                            <p className="text-muted font-medium text-sm sm:text-base">{event.title} Photo</p>
                          </div>
                        </div>
                      );
                    })()}
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