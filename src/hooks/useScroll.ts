import { useCallback, useEffect, useState } from 'react';

export const useScroll = () => {
  const [positionY, setPositionY] = useState(0);

  const handleNavigation = useCallback(() => {
    setPositionY(document.querySelector('.layout')?.scrollTop || 0);
  }, [positionY]);

  useEffect(() => {
    document
      .querySelector('.layout')
      ?.addEventListener('scroll', handleNavigation);

    return () => {
      document
        .querySelector('.layout')
        ?.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  return { positionY, showIcon: positionY > 50 };
};
