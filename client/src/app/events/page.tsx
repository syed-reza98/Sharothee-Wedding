import Link from "next/link";

export default function EventsPage() {
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
      type: "reception"
    },
    {
      id: 4,
      title: "After-Party Celebration",
      date: "2025-08-20",
      time: "4:00 PM",
      venue: "Private Beach Resort",
      location: "Phu Quoc, Vietnam",
      description: "Extended celebration on the beautiful beaches of Phu Quoc with intimate friends and family.",
      dressCode: "Beach formal / Resort wear",
      type: "after_party"
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'mehndi': return '🎨';
      case 'wedding': return '💍';
      case 'reception': return '🥂';
      case 'after_party': return '🏖️';
      default: return '🎉';
    }
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
                <Link href="/events" className="text-foreground font-medium">
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
            Wedding Events
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Join us for a series of beautiful celebrations as we begin our journey together as husband and wife.
          </p>
        </div>
      </section>

      {/* Events Timeline */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {events.map((event, index) => (
              <div key={event.id} className="relative">
                {/* Timeline Line */}
                {index < events.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 top-32 w-0.5 h-24 bg-primary/30"></div>
                )}
                
                <div className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'md:grid-flow-col-dense'
                }`}>
                  {/* Event Details */}
                  <div className={`${index % 2 === 0 ? '' : 'md:col-start-2'}`}>
                    <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{getEventIcon(event.type)}</span>
                        <div>
                          <h3 className="text-2xl font-serif font-semibold text-secondary">
                            {event.title}
                          </h3>
                          <div className="flex items-center text-muted mt-1">
                            <span className="mr-4">📅 {new Date(event.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                            <span>🕐 {event.time}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start">
                          <span className="text-primary mr-2">📍</span>
                          <div>
                            <p className="font-medium text-foreground">{event.venue}</p>
                            <p className="text-muted text-sm">{event.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <span className="text-primary mr-2">👗</span>
                          <p className="text-muted text-sm">{event.dressCode}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted leading-relaxed mb-6">
                        {event.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                          View Details
                        </button>
                        <button className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                          Add to Calendar
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Event Image Placeholder */}
                  <div className={`${index % 2 === 0 ? '' : 'md:col-start-1'}`}>
                    <div className="bg-accent rounded-lg h-64 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-4xl mb-2 block">{getEventIcon(event.type)}</span>
                        <p className="text-muted">{event.title} Photo</p>
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
      <section className="py-16 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-semibold text-secondary mb-6">
            Can&apos;t Make It? Join Us Online
          </h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            We understand not everyone can travel to be with us in person. We&apos;ll be live streaming key moments 
            so you can still be part of our special day.
          </p>
          <div className="bg-white rounded-lg p-6 shadow-md max-w-md mx-auto">
            <div className="text-3xl mb-3">📺</div>
            <h3 className="font-semibold text-foreground mb-2">Live Stream Available</h3>
            <p className="text-sm text-muted mb-4">Wedding ceremony and reception will be broadcast live</p>
            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
              Get Stream Link
            </button>
          </div>
        </div>
      </section>

      {/* RSVP CTA */}
      <section className="py-16 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-semibold text-secondary mb-4">
            Ready to Celebrate With Us?
          </h2>
          <p className="text-muted mb-8">
            Let us know which events you&apos;ll be attending so we can plan accordingly.
          </p>
          <Link 
            href="/rsvp"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium transition-colors inline-block"
          >
            RSVP Now
          </Link>
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