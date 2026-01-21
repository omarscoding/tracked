import { useState, useEffect, useCallback } from 'react';
import { getTimeUntilStreakBreaks } from '@/src/services/streakService';

interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
}

/**
 * Hook for live countdown until streak breaks (midnight)
 */
export function useCountdown(): CountdownTime {
  const [time, setTime] = useState<CountdownTime>(() => formatTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}

function formatTime(): CountdownTime {
  const { hours, minutes, seconds } = getTimeUntilStreakBreaks();

  const formatted =
    hours > 0
      ? `${hours}h ${minutes}m`
      : minutes > 0
        ? `${minutes}m ${seconds}s`
        : `${seconds}s`;

  return { hours, minutes, seconds, formatted };
}
