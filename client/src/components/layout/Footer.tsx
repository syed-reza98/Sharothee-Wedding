'use client';

import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'RSVP', href: '/rsvp' },
    { name: 'Travel', href: '/travel' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-serif font-light mb-4">
              Incia & Arvin
            </h3>
            <p className="text-cream-200 mb-4">
              Thank you for being part of our love story
            </p>
            <p className="text-cream-300 text-sm">
              From childhood friends to forever partners
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-cream-200 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-2 text-sm text-cream-200">
              <p>📧 hello@inciaandarvins.wedding</p>
              <p>📞 +880 1234-567890</p>
              <p>📍 Dhaka, Bangladesh</p>
            </div>
            <div className="mt-4">
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-cream-700/30 pt-8 text-center">
          <p className="text-cream-300 text-sm">
            © 2025 Incia & Arvin&apos;s Wedding. Built with love by{" "}
            <Link 
              href="https://codestormhub.com" 
              className="text-cream-200 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              CodeStorm Hub
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
