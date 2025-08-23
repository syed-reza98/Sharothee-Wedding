'use client';

import { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline'

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: string;
  className?: string;
}

export default function Countdown({ targetDate, className = '' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [hasExpired, setHasExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setHasExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (hasExpired) {
    return (
      <div className={`text-center ${className}`}>
        <div className="animate-floatIn">
          <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-secondary mb-2 inline-flex items-center gap-2">
            <HeartIcon className="h-7 w-7 text-primary" />
            We&apos;re Married!
          </h3>
          <p className="text-lg text-muted">
            Thank you for celebrating with us
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-sm mx-auto">
        <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-cream-200 shadow-sm">
          <div className="text-xl sm:text-2xl font-semibold text-secondary">
            {timeLeft.days}
          </div>
          <div className="text-[10px] sm:text-xs text-muted font-medium tracking-wide">
            {timeLeft.days === 1 ? 'Day' : 'Days'}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-cream-200 shadow-sm">
          <div className="text-xl sm:text-2xl font-semibold text-secondary">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs text-muted font-medium tracking-wide">
            {timeLeft.hours === 1 ? 'Hour' : 'Hours'}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-cream-200 shadow-sm">
          <div className="text-xl sm:text-2xl font-semibold text-secondary">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs text-muted font-medium tracking-wide">
            {timeLeft.minutes === 1 ? 'Min' : 'Mins'}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-cream-200 shadow-sm">
          <div className="text-xl sm:text-2xl font-semibold text-secondary">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs text-muted font-medium tracking-wide">
            {timeLeft.seconds === 1 ? 'Sec' : 'Secs'}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-muted mt-3 font-medium inline-flex items-center gap-2">
        <HeartIcon className="h-4 w-4 text-primary" />
        Until we say &quot;I do&quot;
      </p>
    </div>
  );
}