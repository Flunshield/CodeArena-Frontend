import React, {useEffect} from 'react';
import {useTimer} from 'react-timer-hook';
import clsx from "clsx";

interface MyTimerProps {
    expiryTimestamp: Date;
    setRemainingTime: (time: number) => void;
    className?: string;
}

const MyTimer: React.FC<MyTimerProps> = ({expiryTimestamp, setRemainingTime, className}) => {
    const {
        seconds,
        minutes,
    } = useTimer({expiryTimestamp, onExpire: () => console.warn('onExpire called')});
    // Fonction pour formater les chiffres avec un zéro devant si nécessaire
    const formatNumber = (num: number): string => {
        return num < 10 ? `0${num}` : `${num}`;
    };
    useEffect(() => {
        setRemainingTime(seconds + minutes * 60);
    }, [seconds, minutes, setRemainingTime]);
    return (
        <div style={{textAlign: 'center'}} id="timer">
            <div style={{fontSize: '100px'}} className={clsx(className)}>
                <span>{formatNumber(minutes)}</span>:<span>{formatNumber(seconds)}</span>
            </div>
        </div>
    );
};

export default MyTimer;
