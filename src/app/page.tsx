import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center gradient-hero pt-16">
        <div className="text-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-secondary mb-4 sm:mb-6 leading-tight">
              Incia & Arvin
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
            <p className="text-lg sm:text-xl md:text-2xl text-muted mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              From childhood friends at AISD to forever partners
            </p>
            <p className="text-base sm:text-lg text-muted mb-8 sm:mb-12">
              Join us as we celebrate our love story across continents
            </p>
            
            {/* Wedding Date */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 max-w-sm sm:max-w-md mx-auto mb-8 sm:mb-12 shadow-xl border border-white/20">
              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-secondary mb-2">
                Save the Date
              </h3>
              <p className="text-2xl sm:text-3xl font-light text-foreground mb-2">
                Coming Soon
              </p>
              <p className="text-muted font-medium">
                Dhaka, Bangladesh
              </p>
              <p className="text-sm text-muted mt-2">
                After-party in Phu Quoc, Vietnam
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md mx-auto">
              <Link
                href="/rsvp"
                className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                RSVP Now
              </Link>
              <Link
                href="#story"
                className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-secondary mb-6">
              Our Love Story
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-serif font-semibold text-secondary mb-4">
                  Where It All Began
                </h3>
                <p className="text-muted leading-relaxed">
                  In the hallways of the American International School of Dhaka (AISD), 
                  what started as innocent friendship in middle school blossomed into 
                  something truly magical. From sharing lunch to navigating teenage years 
                  together, we were inseparable.
                </p>
              </div>
              <div className="bg-accent rounded-lg h-64 flex items-center justify-center">
                <p className="text-muted text-center">AISD Memories Photo</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-accent rounded-lg h-64 flex items-center justify-center">
                <p className="text-muted text-center">University Years Photo</p>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-serif font-semibold text-secondary mb-4">
                  Love Across Continents
                </h3>
                <p className="text-muted leading-relaxed">
                  Life took us to different corners of the world—Arvin to UCLA and 
                  Incia to the University of Toronto—but distance only made our bond 
                  stronger. Through late-night calls, surprise visits, and unwavering 
                  support, we proved that love knows no borders.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-serif font-semibold text-secondary mb-4">
                  The Proposal in Tuscany
                </h3>
                <p className="text-muted leading-relaxed">
                  In 2024, Arvin planned the most beautiful surprise in Tuscany, where 
                  he got down on one knee surrounded by the breathtaking Italian landscape—
                  and even more special, with both families secretly flown in to witness 
                  the moment that changed everything.
                </p>
              </div>
              <div className="bg-accent rounded-lg h-64 flex items-center justify-center">
                <p className="text-muted text-center">Tuscany Proposal Photo</p>
              </div>
            </div>

            <div className="text-center bg-cream-50 rounded-lg p-8">
              <h3 className="text-2xl font-serif font-semibold text-secondary mb-4">
                Our Celebration Journey
              </h3>
              <p className="text-muted leading-relaxed max-w-2xl mx-auto">
                From an elegant engagement celebration in Dubai to our wedding in 
                our hometown of Dhaka, and finally an unforgettable after-party on 
                a stunning island in Phu Quoc, Vietnam—we&apos;re celebrating our love 
                with those who matter most across the places that shaped our story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 gradient-wedding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-secondary mb-6">
              Wedding Information
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/events" className="group">
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-secondary mb-2">
                  Events
                </h3>
                <p className="text-muted">
                  Complete schedule and venue details
                </p>
              </div>
            </Link>

            <Link href="/gallery" className="group">
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">📸</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-secondary mb-2">
                  Gallery
                </h3>
                <p className="text-muted">
                  Photos from our journey together
                </p>
              </div>
            </Link>

            <Link href="/travel" className="group">
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">✈️</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-secondary mb-2">
                  Travel
                </h3>
                <p className="text-muted">
                  Hotels and transportation info
                </p>
              </div>
            </Link>

            <Link href="/rsvp" className="group">
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">💌</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-secondary mb-2">
                  RSVP
                </h3>
                <p className="text-muted">
                  Let us know you&apos;ll be there
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
