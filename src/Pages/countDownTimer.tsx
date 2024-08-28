import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';

interface CountdownTimerProps {
  startTimestamp: number;
  onComplete: () => void; // Ajout de la prop onComplete
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ startTimestamp, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const endDate = new Date(startTimestamp + 10 * 60 * 1000);

  const handleComplete = () => {
    console.log('Décompte terminé');
    setIsCompleted(true);
  };
  
  useEffect(() => {
    if (isCompleted) {
      console.log('Appel de handleEndMatch via onComplete');
      onComplete();
    }
  }, [isCompleted, onComplete]);

  return (
    <Countdown 
      date={endDate} 
      onComplete={handleComplete} 
      renderer={({ minutes, seconds }) => (
        <p>
          Temps restant : {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
      )}
    />
  );
};

export default CountdownTimer;
