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
            setHours(clock.getHours().toString().length === 1 ? '0' + clock.getHours() : clock.getHours());
            setMinutes(clock.getMinutes().toString().length === 1 ? '0' + clock.getMinutes() : clock.getMinutes());
            setSeconds(clock.getSeconds().toString().length === 1 ? '0' + clock.getSeconds() : clock.getSeconds());

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