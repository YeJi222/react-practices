import React, {useState, useEffect} from 'react';
import './assets/scss/App.scss'
import Clock from './Clock';

export default function App() {
    const [ticks, setTicks] = useState(0);
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');
    
    useEffect(() => {
        setInterval(() => {
            /* 시간 */
            var today = new Date();
            setHours(today.getHours());
            setMinutes(today.getMinutes());
            setSeconds(today.getSeconds());

            setTicks(ticks + 1);
        }, 1000);
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