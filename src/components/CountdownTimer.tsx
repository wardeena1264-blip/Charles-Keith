import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
      <Timer size={14} className="text-white animate-pulse" />
      <div className="flex gap-4 font-mono text-sm text-white font-medium">
        <div className="flex flex-col items-center">
          <span>{format(timeLeft.hours)}</span>
          <span className="text-[8px] uppercase tracking-tighter opacity-70">HRS</span>
        </div>
        <span className="opacity-50">:</span>
        <div className="flex flex-col items-center">
          <span>{format(timeLeft.minutes)}</span>
          <span className="text-[8px] uppercase tracking-tighter opacity-70">MIN</span>
        </div>
        <span className="opacity-50">:</span>
        <div className="flex flex-col items-center">
          <span>{format(timeLeft.seconds)}</span>
          <span className="text-[8px] uppercase tracking-tighter opacity-70">SEC</span>
        </div>
      </div>
    </div>
  );
}
