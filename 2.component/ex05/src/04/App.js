import React, {useState, useEffect} from 'react';
import './assets/scss/App.scss'
import Clock from './Clock';

export default function App() {
    const [ticks, setTicks] = useState(0);
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');
    
    useEffect(() => {
        const interval = setInterval(() => {
            /* 시간 */
            var clock = new Date();
            var getTime = [clock.getHours(), clock.getMinutes(), clock.getSeconds()];

            setHours(getTime[0].toString().length === 1 ? '0' + getTime[0] : getTime[0]);
            setMinutes(getTime[1].toString().length === 1 ? '0' + getTime[1] : getTime[1]);
            setSeconds(getTime[2].toString().length === 1 ? '0' + getTime[2] : getTime[2]);

            setTicks(ticks + 1);
        }, 1000);

        return() => clearInterval(interval); // 언마운트시 clear
    }, [ticks]);

    return (
        <>
            <Clock
                message={`ex04: thicks ${ticks}`}
                hours={hours}
                minutes={minutes}
                seconds={seconds}/>
        </>        
    );
}