'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// A lightweight top progress bar for route transitions (no external deps)
export default function RouteLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<'start' | 'finish'>('start');

  useEffect(() => {
    // Start progress on route change
    setVisible(true);
    setPhase('start');

    // Finalize shortly after route params stabilize
    const finalize = window.setTimeout(() => {
      setPhase('finish');
      const hide = window.setTimeout(() => {
        setVisible(false);
      }, 260);
      return () => window.clearTimeout(hide);
    }, 500);

    return () => {
      window.clearTimeout(finalize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      {/* Track */}
      <div className="h-0.5 bg-transparent">
        {/* Bar */}
        <div
          className={`route-progress-bar ${phase === 'finish' ? 'route-progress-finish' : 'route-progress-start'}`}
        />
      </div>
    </div>
  );
}
