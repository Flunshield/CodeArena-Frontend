import React, {useEffect} from 'react';
import { useTimer } from 'react-timer-hook';

interface MyTimerProps {
    expiryTimestamp: Date;
    setRemainingTime: (time: number) => void;
}

const MyTimer: React.FC<MyTimerProps> = ({ expiryTimestamp, setRemainingTime }) => {
    const {
        seconds,
        minutes,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
    // Fonction pour formater les chiffres avec un zéro devant si nécessaire
    const formatNumber = (num: number): string => {
        return num < 10 ? `0${num}` : `${num}`;
    };
    useEffect(() => {
        setRemainingTime(seconds + minutes * 60);
    }, [seconds, minutes, setRemainingTime]);
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '100px' }} className="text-white">
                <span>{formatNumber(minutes)}</span>:<span>{formatNumber(seconds)}</span>
            </div>
        </div>
    );
};

export default MyTimer;
