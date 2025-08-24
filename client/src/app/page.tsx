import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Countdown from "@/components/Countdown";
import HeartCollage from "@/components/HeartCollage";
import { ArrowRightIcon, HeartIcon, CalendarDaysIcon, PhotoIcon, MapPinIcon, EnvelopeIcon, GlobeAmericasIcon, TrophyIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />

      {/* Main content wrapper for skip link target */}
      <main id="main-content">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center gradient-hero pt-16" role="banner">
          <div className="container text-center max-w-7xl">
            <div className="animate-fadeInUp">
              <h1 className="pt-2 sm:pt-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-secondary mb-4 sm:mb-6 leading-tight tracking-tight">
                Incia & Arvin
              </h1>
              <div className="w-16 sm:w-20 md:w-24 lg:w-32 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-700 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
                From childhood friends at AISD to forever partners
              </p>
              
              {/* Heart Collage Component with enhanced presentation */}
              <div className="my-8 sm:my-12 relative overflow-hidden">
                {/* Subtle background glow for the collage - no scaling to prevent overflow */}
                <div className="absolute inset-0 bg-gradient-radial from-primary/8 via-primary/3 to-transparent rounded-full blur-xl opacity-50" aria-hidden="true"></div>
                <HeartCollage />
              </div>
              
              <p className="text-base sm:text-lg text-neutral-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                Join us as we celebrate our love story across continents
              </p>
              
              {/* Wedding Date */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md mx-auto mb-8 sm:mb-12 shadow-lg border border-cream-200">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <CalendarDaysIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h2 className="text-xl sm:text-2xl font-serif font-semibold text-secondary">
                    Save the Date
                  </h2>
                </div>
                <p className="text-2xl sm:text-3xl font-light text-secondary mb-3">
                  December 16, 2025
                </p>
                <p className="text-sm text-neutral-600 mb-4">Tuesday • Starts at 6:00 PM</p>
                {/* Countdown Timer */}
                <Countdown 
                  targetDate="2025-12-16T00:00:00+06:00" 
                  className="mb-4"
                />
                <address className="text-neutral-700 font-medium not-italic">
                  Dhaka, Bangladesh
                </address>
                <p className="text-sm text-neutral-600 mt-1">
                  After-party in Phu Quoc, Vietnam
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-12 sm:mb-16">
                <Link
                  href="/rsvp"
                  className="btn-primary w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                  aria-describedby="rsvp-description"
                >
                  RSVP Now
                </Link>
                <span id="rsvp-description" className="sr-only">Confirm your attendance at our wedding celebration</span>
                
                <Link
                  href="#story"
                  className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-describedby="story-description"
                >
                  Our Story
                </Link>
                <span id="story-description" className="sr-only">Read about our journey from childhood friends to partners</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section id="story" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/50 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container max-w-7xl relative">
            <header className="text-center mb-16 lg:mb-20">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="w-12 h-px bg-primary/60"></div>
                <HeartIcon className="h-4 w-4 text-primary mx-3" aria-hidden="true" />
                <span className="mx-1 text-sm font-medium text-primary tracking-wider uppercase">Our Journey</span>
                <HeartIcon className="h-4 w-4 text-primary mx-3" aria-hidden="true" />
                <div className="w-12 h-px bg-primary/60"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-secondary mb-6 tracking-tight">
                Our Love Story
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                A journey that began in the hallways of school and blossomed across continents
              </p>
            </header>

            <div className="space-y-20 lg:space-y-24">
              {/* Where It All Began - Redesigned Layout with Warm Tone */}
              <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center">
                    <div className="w-8 h-px bg-primary/40"></div>
                    <span className="mx-3 text-xs font-medium text-primary tracking-wider uppercase">Chapter 1</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-secondary mb-6 leading-tight">
                    Where It All Began
                  </h3>
                  <p className="text-neutral-700 leading-relaxed text-lg mb-6">
                    In the vibrant hallways of the American International School of Dhaka (AISD), 
                    what started as innocent friendship in middle school blossomed into 
                    something truly magical. From sharing lunch to navigating teenage years 
                    together, we were inseparable—building memories that would last a lifetime.
                  </p>
                  <div className="inline-flex items-center text-primary text-sm font-medium">
                    <time dateTime="2010/2015">2010 - 2015</time>
                    <span className="mx-2">•</span>
                    <span>AISD Years</span>
                    <div className="ml-3 w-6 h-px bg-primary/40"></div>
                  </div>
                </div>
                
                <div className="lg:col-span-7">
                  <div className="relative">
                    {/* Main central photo with warm overlay */}
                    <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl mb-6">
                      <Image
                        src="/images/story/Where It All Began 1.jpeg"
                        alt="Incia and Arvin during their AISD school years, where their friendship began"
                        fill
                        className="object-cover object-[50%_24%] sm:object-[50%_28%] lg:object-[50%_32%] scale-[1.06] hover:scale-[1.1] transition-transform duration-700 brightness-110 contrast-105 saturate-105 motion-reduce:transform-none motion-reduce:transition-none"
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                        <span className="text-xs font-semibold text-secondary">School Days Magic</span>
                      </div>
                    </div>
                    
                    {/* Two side photos in a creative layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      <div className="relative h-40 sm:h-36 lg:h-40 rounded-xl overflow-hidden shadow-lg md:transform md:-rotate-1 md:hover:rotate-0 transition-transform duration-500 motion-reduce:transform-none motion-reduce:transition-none">
                        <Image
                          src="/images/story/Where It All Began 2.jpeg"
                          alt="Incia and Arvin together during their AISD school days"
                          fill
                          className="object-cover scale-[1.1] hover:scale-[1.15] transition-transform duration-700 brightness-125 contrast-110 saturate-110 motion-reduce:transform-none motion-reduce:transition-none"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 29vw"
                          style={{ objectPosition: '48% 32%' }}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent"></div>
                      </div>
                      <div className="relative h-40 sm:h-36 lg:h-40 rounded-xl overflow-hidden shadow-lg md:transform md:rotate-1 md:hover:rotate-0 transition-transform duration-500 motion-reduce:transform-none motion-reduce:transition-none">
                        <Image
                          src="/images/story/Where It All Began 3.jpeg"
                          alt="Early friendship moments between Incia and Arvin"
                          fill
                          className="object-cover scale-[1.1] hover:scale-[1.15] transition-transform duration-700 brightness-105 saturate-105 motion-reduce:transform-none motion-reduce:transition-none"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 29vw"
                          style={{ objectPosition: '50% 28%' }}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-accent/50 rounded-full animate-pulse" aria-hidden="true"></div>
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary/40 rounded-full animate-pulse delay-300" aria-hidden="true"></div>
                  </div>
                </div>
              </article>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-16 h-px bg-primary/30"></div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div className="w-16 h-px bg-primary/30"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>

            {/* Love Across Continents - Dual Photo Layout */}
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shopping/Casual photo */}
                  <div className="relative h-72 lg:h-80 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/story/Love Across Continents 1.jpeg"
                      alt="Casual moments together across continents"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 motion-reduce:transform-none motion-reduce:transition-none"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <span className="text-xs font-medium text-secondary">Adventures Together</span>
                    </div>
                    {/* Floating decorative element */}
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shadow-lg" aria-hidden="true">
                      <GlobeAmericasIcon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  
                  {/* Marathon/Race photo */}
                  <div className="relative h-72 lg:h-80 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/story/Love Across Continents 2.jpeg"
                      alt="Supporting each other through challenges"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 motion-reduce:transform-none motion-reduce:transition-none"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <span className="text-xs font-medium text-secondary">Achieving Goals</span>
                    </div>
                    {/* Floating decorative element */}
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shadow-lg" aria-hidden="true">
                      <TrophyIcon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center">
                  <div className="w-8 h-px bg-primary/50"></div>
                  <span className="mx-3 text-xs font-medium text-primary tracking-wider uppercase">Chapter 2</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-semibold text-secondary mb-6">
                  Love Across Continents
                </h3>
                <p className="text-muted leading-relaxed text-lg mb-6">
                  Life took us to different corners of the world—Arvin to UCLA and 
                  Incia to the University of Toronto—but distance only made our bond 
                  stronger. Through late-night calls, surprise visits, shared adventures,
                  and supporting each other&apos;s dreams, we proved that love knows no borders.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted">
                    <span className="w-20 text-primary font-medium">UCLA</span>
                    <span>Los Angeles, California</span>
                  </div>
                  <div className="flex items-center text-sm text-muted">
                    <span className="w-20 text-primary font-medium">UofT</span>
                    <span>Toronto, Ontario</span>
                  </div>
                  <div className="flex items-center text-sm text-muted">
                    <span className="w-20 text-primary font-medium">Together</span>
                    <span>Adventures & Achievements</span>
                  </div>
                </div>
                <div className="inline-flex items-center text-primary text-sm font-medium">
                  <span>2015 - 2019 • Long Distance Love</span>
                  <div className="ml-3 w-6 h-px bg-primary"></div>
                </div>
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-16 h-px bg-primary/30"></div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div className="w-16 h-px bg-primary/30"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>

            {/* The Proposal in Tuscany - Dual Photo Layout */}
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-2 space-y-6">
                <div className="inline-flex items-center">
                  <div className="w-8 h-px bg-primary/50"></div>
                  <span className="mx-3 text-xs font-medium text-primary tracking-wider uppercase">Chapter 3</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-semibold text-secondary mb-6">
                  The Proposal in Tuscany
                </h3>
                <p className="text-muted leading-relaxed text-lg mb-6">
                  In 2024, Arvin planned the most beautiful surprise in Tuscany, where 
                  he got down on one knee surrounded by the breathtaking Italian landscape—
                  and even more special, with both families secretly flown in to witness 
                  the moment that changed everything.
                </p>
                <div className="inline-flex items-center text-primary text-sm font-medium">
                  <span>May 2024 • Tuscany, Italy</span>
                  <div className="ml-3 w-6 h-px bg-primary"></div>
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/story/tuscany-proposal 1.jpg"
                      alt="The magical Tuscany proposal moment"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 motion-reduce:transform-none motion-reduce:transition-none"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <span className="text-xs font-medium text-secondary">The Moment</span>
                    </div>
                  </div>
                  <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/story/tuscany-proposal 2.jpg"
                      alt="Celebration with families in Tuscany"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 motion-reduce:transform-none motion-reduce:transition-none"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <span className="text-xs font-medium text-secondary">Family Joy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-16 h-px bg-primary/30"></div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div className="w-16 h-px bg-primary/30"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>

            {/* Building Our Future Together - Side by Side Photos */}
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/story/Building Our Future Together 1.jpeg"
                      alt="Planning our future together"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 motion-reduce:transform-none motion-reduce:transition-none"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
                  </div>
                  <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/story/recent-together.jpg"
                      alt="Recent moments together"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 motion-reduce:transform-none motion-reduce:transition-none"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center">
                  <div className="w-8 h-px bg-primary/50"></div>
                  <span className="mx-3 text-xs font-medium text-primary tracking-wider uppercase">Chapter 4</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-semibold text-secondary mb-6">
                  Building Our Future Together
                </h3>
                <p className="text-muted leading-relaxed text-lg mb-6">
                  Since that magical moment in Tuscany, we&apos;ve been planning not 
                  just our wedding, but our life together. From selecting venues to 
                  dreaming about our future home, every step has brought us closer 
                  and made us more excited for this next chapter.
                </p>
                <div className="inline-flex items-center text-primary text-sm font-medium">
                  <span>2024 - Present</span>
                  <div className="ml-3 w-6 h-px bg-primary"></div>
                </div>
              </div>
            </div>

            {/* Final Celebration Journey Card moved below before footer */}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-cream-50">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-secondary mb-6">
              Our Memories
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              A glimpse into our journey together—from sweet moments to special celebrations
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/gallery/gallery-1.jpg"
                alt="Our memories together"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/gallery/gallery-2.jpg"
                alt="Our memories together"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/gallery/gallery-3.jpg"
                alt="Our memories together"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/gallery/gallery-4.jpg"
                alt="Our memories together"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/gallery/gallery-5.jpg"
                alt="Our memories together"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/gallery/gallery-6.jpg"
                alt="Our memories together"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/gallery/gallery-7.jpg"
                alt="Our memories together"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/gallery/gallery-8.jpg"
                alt="Our memories together"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>

          {/* View More Button */}
          <div className="text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Full Gallery
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 sm:py-20 lg:py-24 gradient-wedding">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-secondary mb-6">
              Wedding Information
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/events" className="group">
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-cream-200">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <CalendarDaysIcon className="h-7 w-7 text-primary" />
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
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-cream-200">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <PhotoIcon className="h-7 w-7 text-primary" />
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
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-cream-200">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <MapPinIcon className="h-7 w-7 text-primary" />
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
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-cream-200">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <EnvelopeIcon className="h-7 w-7 text-primary" />
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

      {/* Celebration Journey (moved) */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="bg-gradient-to-br from-cream-50 to-accent/30 rounded-3xl p-8 md:p-12 text-center shadow-lg backdrop-blur-sm border border-cream-200">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <HeartIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-3xl md:text-4xl font-serif font-semibold text-secondary mb-6">
                  Our Celebration Journey
                </h3>
                <p className="text-muted leading-relaxed text-lg max-w-3xl mx-auto mb-8">
                  From an elegant engagement celebration in Dubai to our wedding in Dhaka, and an unforgettable after-party in Phu Quoc—celebrating with those who matter most across the places that shaped our story.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white rounded-xl p-6 border border-cream-200">
                    <div className="mb-3 flex justify-center">
                      <GlobeAmericasIcon className="h-7 w-7 text-primary" />
                    </div>
                    <h4 className="font-semibold text-secondary mb-2">Dubai</h4>
                    <p className="text-sm text-muted">Engagement Celebration</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-cream-200">
                    <div className="mb-3 flex justify-center">
                      <MapPinIcon className="h-7 w-7 text-primary" />
                    </div>
                    <h4 className="font-semibold text-secondary mb-2">Dhaka</h4>
                    <p className="text-sm text-muted">Wedding Ceremony</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-cream-200">
                    <div className="mb-3 flex justify-center">
                      <MapPinIcon className="h-7 w-7 text-primary" />
                    </div>
                    <h4 className="font-semibold text-secondary mb-2">Phu Quoc</h4>
                    <p className="text-sm text-muted">After Party</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>

      <Footer />
    </div>
  );
}
