import React from 'react';

interface HeartCollageProps {
  coupleImage: string;
  cakeImage: string;
}

const HeartCollage: React.FC<HeartCollageProps> = ({ coupleImage, cakeImage }) => {
  return (
    <div className="relative flex justify-center items-center py-4">
      {/* Floating petals animation */}
      <div className="floating-petals">
        <div className="petal"></div>
        <div className="petal"></div>
        <div className="petal"></div>
        <div className="petal"></div>
        <div className="petal"></div>
      </div>
      
      {/* Heart-shaped collage container */}
      <div className="heart-glow relative">
        <div className="heart-shape relative">
          {/* Perfect Heart SVG for clipping */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="perfectHeart" clipPathUnits="objectBoundingBox">
                <path d="M0.5,0.9 C0.5,0.9 0.1,0.6 0.1,0.35 C0.1,0.15 0.2,0.1 0.35,0.1 C0.4,0.1 0.45,0.15 0.5,0.25 C0.55,0.15 0.6,0.1 0.65,0.1 C0.8,0.1 0.9,0.15 0.9,0.35 C0.9,0.6 0.5,0.9 0.5,0.9 Z" />
              </clipPath>
            </defs>
          </svg>
          
          {/* Heart container with perfect heart shape */}
          <div 
            className="relative w-[400px] h-[360px] overflow-hidden shadow-romantic"
            style={{ 
              clipPath: 'url(#perfectHeart)',
              filter: 'drop-shadow(0 8px 32px rgba(194, 65, 108, 0.3))'
            }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-romantic opacity-20"></div>
            
            {/* Left side - Couple photo */}
            <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden">
              <img 
                src={coupleImage}
                alt="Incia & Arvin - Glamorous couple portrait"
                className="w-full h-full object-cover object-center transform scale-105 hover:scale-110 transition-transform duration-700"
                style={{ 
                  filter: 'sepia(10%) saturate(110%) brightness(105%)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-wedding-rose/10"></div>
            </div>
            
            {/* Right side - Cake photo */}
            <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
              <img 
                src={cakeImage}
                alt="Wedding cake with beautiful floral decorations"
                className="w-full h-full object-cover object-center transform scale-105 hover:scale-110 transition-transform duration-700"
                style={{ 
                  filter: 'sepia(5%) saturate(105%) brightness(110%)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-wedding-gold/10"></div>
            </div>
            
            {/* Center divider with romantic accent */}
            <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-wedding-rose to-transparent transform -translate-x-0.5 opacity-60"></div>
            
            {/* Heart overlay with subtle pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-full bg-gradient-radial from-wedding-cream/40 via-transparent to-romantic/20"></div>
            </div>
          </div>
          
          {/* Decorative elements around the heart */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-3 h-3 bg-wedding-rose rounded-full animate-pulse"></div>
          </div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-2 bg-wedding-gold rounded-full animate-pulse delay-300"></div>
          </div>
          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-150"></div>
          </div>
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
            <div className="w-2 h-2 bg-romantic rounded-full animate-pulse delay-450"></div>
          </div>
        </div>
      </div>
      
      {/* Romantic caption below heart */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-muted-foreground italic font-light tracking-wide">
          "Two hearts, one beautiful story"
        </p>
      </div>
    </div>
  );
};

export default HeartCollage;