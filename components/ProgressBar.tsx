'use client';

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  isActive: boolean;
  duration?: number; // milliseconds
}

export default function ProgressBar({ isActive, duration = 5000 }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Hızlandırılmış ilerleme (başta hızlı, sonra yavaş)
        const increment = Math.max(0.5, (100 - prev) * 0.05);
        return Math.min(100, prev + increment);
      });
    }, duration / 200);

    return () => clearInterval(interval);
  }, [isActive, duration]);

  if (!isActive) return null;

  return (
    <div className="w-full mb-4">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="h-full w-full bg-white opacity-30 animate-pulse-slow" />
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center mt-1">
        {Math.round(progress)}% tamamlandı
      </p>
    </div>
  );
}

