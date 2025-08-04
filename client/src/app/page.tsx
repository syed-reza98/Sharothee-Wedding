import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-serif font-semibold text-secondary">
                I & A
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="#home" className="text-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="#story" className="text-muted hover:text-primary transition-colors">
                  Our Story
                </Link>
                <Link href="#events" className="text-muted hover:text-primary transition-colors">
                  Events
                </Link>
                <Link href="#gallery" className="text-muted hover:text-primary transition-colors">
                  Gallery
                </Link>
                <Link href="#rsvp" className="text-muted hover:text-primary transition-colors">
                  RSVP
                </Link>
                <Link href="#travel" className="text-muted hover:text-primary transition-colors">
                  Travel
                </Link>
                <Link href="#contact" className="text-muted hover:text-primary transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center gradient-hero pt-16">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fadeInUp">
            <h2 className="text-6xl md:text-8xl font-serif font-light text-secondary mb-6">
              Incia & Arvin
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-muted mb-8 max-w-2xl mx-auto">
              From childhood friends at AISD to forever partners
            </p>
            <p className="text-lg text-muted mb-12">
              Join us as we celebrate our love story across continents
            </p>
            
            {/* Wedding Date */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto mb-12 shadow-lg">
              <h3 className="text-2xl font-serif font-semibold text-secondary mb-2">
                Save the Date
              </h3>
              <p className="text-3xl font-light text-foreground mb-2">
                Coming Soon
              </p>
              <p className="text-muted">
                Dhaka, Bangladesh
              </p>
              <p className="text-sm text-muted mt-2">
                After-party in Phu Quoc, Vietnam
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#rsvp"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                RSVP Now
              </Link>
              <Link
                href="#story"
                className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-medium transition-colors"
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
            <Link href="#events" className="group">
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

            <Link href="#gallery" className="group">
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

            <Link href="#travel" className="group">
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

            <Link href="#rsvp" className="group">
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
            <Link href="#contact" className="text-cream-200 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="#admin" className="text-cream-200 hover:text-white transition-colors">
              Admin
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-cream-700/30">
            <p className="text-cream-300 text-sm">
              © 2025 Incia & Arvin&apos;s Wedding. Built with love by CodeStorm Hub.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
