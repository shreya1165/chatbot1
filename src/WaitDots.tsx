import React, { useEffect, useState } from 'react';

const WaitDots: React.FC = () => {
  const [dots, setDots] = useState<string>('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots =>
        Math.random() < 0.7 ? prevDots + '.' : prevDots.substring(1)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <span id="wait">{dots}</span>;
};

export default WaitDots;
