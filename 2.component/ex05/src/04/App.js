import React, {useState, useEffect} from 'react';
import './assets/scss/App.scss'
import Clock from './Clock';

export default function App() {
    const [ticks, setTicks] = useState(0);
    const [clock, setClock] = useState(new Date());
    
    useEffect(() => {
        const interval = setInterval(() => {
            setClock(new Date()); // Get Clock
            setTicks(ticks + 1); // Increase Ticks
        }, 1000);
        
        return() => clearInterval(interval); // Unmount - clear interval
    }, [ticks]);

    var getTime = [clock.getHours(), clock.getMinutes(), clock.getSeconds()];
    
    const hours = getTime[0].toString().length === 1 ? '0' + getTime[0] : getTime[0];
    const minutes = getTime[1].toString().length === 1 ? '0' + getTime[1] : getTime[1];
    const seconds = getTime[2].toString().length === 1 ? '0' + getTime[2] : getTime[2];

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