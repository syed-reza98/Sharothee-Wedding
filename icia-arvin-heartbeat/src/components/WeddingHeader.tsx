import React from 'react';
import { Menu } from 'lucide-react';

const WeddingHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / Initials */}
        <div className="text-2xl font-serif text-primary">
          I & A
        </div>
        
        {/* Menu Icon */}
        <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
          <Menu className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </header>
  );
};

export default WeddingHeader;