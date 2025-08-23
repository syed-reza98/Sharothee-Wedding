import React, { useState, useEffect } from 'react';

interface TimeUnit {
  value: number;
  label: string;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: 0, label: 'Days' },
    { value: 0, label: 'Hours' },
    { value: 0, label: 'Mins' },
    { value: 0, label: 'Secs' }
  ]);

  useEffect(() => {
    const weddingDate = new Date('2025-12-16T18:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft([
          { value: days, label: 'Days' },
          { value: hours, label: 'Hours' },
          { value: minutes, label: 'Mins' },
          { value: seconds, label: 'Secs' }
        ]);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-border/30 max-w-lg mx-auto">
      {/* Calendar Icon & Save the Date */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 text-primary mb-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span className="text-lg font-serif font-medium">Save the Date</span>
        </div>
        
        <h3 className="text-3xl font-serif font-semibold text-foreground mb-2">
          December 16, 2025
        </h3>
        
        <p className="text-muted-foreground">
          Tuesday • Starts at 6:00 PM
        </p>
      </div>

      {/* Countdown */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {timeLeft.map((unit, index) => (
          <div key={index} className="text-center">
            <div className="bg-secondary/50 rounded-xl py-4 px-2 border border-border/20">
              <div className="text-2xl font-bold text-primary font-mono">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {unit.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Until we say "I do" */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground italic flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-romantic" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          Until we say "I do"
        </p>
      </div>

      {/* Location */}
      <div className="text-center mt-4 pt-4 border-t border-border/20">
        <p className="text-sm font-medium text-foreground">
          Dhaka, Bangladesh
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;