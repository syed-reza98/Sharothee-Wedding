'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Live Stream', href: '/live' },
    { name: 'RSVP', href: '/rsvp' },
    { name: 'Travel', href: '/travel' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-cream-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-start">
            <h1 className="text-lg sm:text-xl font-serif font-semibold text-secondary">
              I & A
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6 xl:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-primary'
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  {item.name}
                  <span
                    className={`pointer-events-none absolute left-3 right-3 -bottom-0.5 h-0.5 rounded bg-primary transition-all duration-200 origin-left ${
                      isActive(item.href) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted hover:text-primary p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
    {isOpen && (
          <div className="lg:hidden border-t border-cream-200" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg z-[100]">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
          className={`block px-4 py-3 text-base font-medium rounded-md transition-colors duration-200 ${
                    isActive(item.href)
            ? 'text-primary bg-primary/10 border-l-4 border-primary'
            : 'text-muted hover:text-primary hover:bg-cream-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}