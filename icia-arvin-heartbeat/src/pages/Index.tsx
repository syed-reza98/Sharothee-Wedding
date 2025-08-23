import React from 'react';
import WeddingHeader from '@/components/WeddingHeader';
import HeartCollage from '@/components/HeartCollage';
import CountdownTimer from '@/components/CountdownTimer';
import couplePortrait from '@/assets/couple-portrait.jpg';
import weddingCake from '@/assets/wedding-cake.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <WeddingHeader />
      
      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            {/* Names */}
            <h1 className="text-5xl md:text-7xl font-serif font-light text-foreground mb-8 tracking-wide">
              Incia <span className="text-primary">&</span> Arvin
            </h1>
            
            {/* Golden line separator */}
            <div className="w-24 h-0.5 bg-gradient-gold mx-auto mb-8"></div>
            
            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-16 font-light tracking-wide leading-relaxed">
              From childhood friends at AISD to forever partners
            </p>
            
            {/* Heart Collage - This replaces the marked section */}
            <div className="mb-16">
              <HeartCollage 
                coupleImage={couplePortrait}
                cakeImage={weddingCake}
              />
            </div>
            
            {/* Love Story Tagline */}
            <p className="text-xl md:text-2xl text-foreground mb-12 font-light tracking-wide leading-relaxed">
              Join us as we celebrate our love story across continents
            </p>
            
            {/* Countdown Timer */}
            <CountdownTimer />
          </div>
        </section>
      </main>
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-wedding-cream/30 via-transparent to-accent/10"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-wedding-rose/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-wedding-gold/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-accent/5 rounded-full blur-lg"></div>
      </div>
    </div>
  );
};

export default Index;