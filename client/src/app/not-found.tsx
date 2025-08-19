import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { HeartIcon, CalendarDaysIcon, EnvelopeIcon, PhotoIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-wedding">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <HeartIcon className="h-16 w-16 text-rose-500" aria-hidden="true" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-light text-secondary mb-6">
            Page Not Found
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-8">
            Oops! It looks like this page got lost on its way to our wedding celebration.
          </p>
          <p className="text-muted mb-12 max-w-2xl mx-auto">
            Don&apos;t worry though - our love story is still going strong! Let&apos;s get you back to where you need to be.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/events"
              className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              View Events
            </Link>
          </div>

          {/* Quick Navigation */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-serif font-semibold text-secondary mb-4">
              Looking for something specific?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <Link href="/events" className="text-muted hover:text-primary transition-colors inline-flex items-center gap-2">
                <CalendarDaysIcon className="h-4 w-4" />
                Wedding Events
              </Link>
              <Link href="/rsvp" className="text-muted hover:text-primary transition-colors inline-flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4" />
                RSVP
              </Link>
              <Link href="/gallery" className="text-muted hover:text-primary transition-colors inline-flex items-center gap-2">
                <PhotoIcon className="h-4 w-4" />
                Photo Gallery
              </Link>
              <Link href="/travel" className="text-muted hover:text-primary transition-colors inline-flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                Travel Info
              </Link>
              <Link href="/contact" className="text-muted hover:text-primary transition-colors inline-flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" />
                Contact Us
              </Link>
              <Link href="/#story" className="text-muted hover:text-primary transition-colors inline-flex items-center gap-2">
                <HeartIcon className="h-4 w-4" />
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
