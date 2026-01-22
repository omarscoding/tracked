import { useState, useEffect } from 'react';
import { getMsUntilMidnight } from '../utils/date';

export function useCountdown() {
  const [msUntilMidnight, setMsUntilMidnight] = useState(() => getMsUntilMidnight());

  useEffect(() => {
    // Update immediately
    setMsUntilMidnight(getMsUntilMidnight());

    // Update every 30 seconds
    const interval = setInterval(() => {
      setMsUntilMidnight(getMsUntilMidnight());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return msUntilMidnight;
}
