import { useState, useEffect } from 'react';
import { canCreatePost, formatCooldownTime } from '../utils/gameUtils';

export const useCooldownTimer = (lastPostTime, postCooldown) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!canCreatePost(lastPostTime, postCooldown)) {
      const interval = setInterval(() => {
        setTick(prev => prev + 1);
        
        // Stop updating when cooldown is over
        if (canCreatePost(lastPostTime, postCooldown)) {
          clearInterval(interval);
        }
      }, 100); // Update every 100ms for smooth countdown

      return () => clearInterval(interval);
    }
  }, [lastPostTime, postCooldown]);

  return {
    canPost: canCreatePost(lastPostTime, postCooldown),
    remainingTime: formatCooldownTime(lastPostTime, postCooldown)
  };
};