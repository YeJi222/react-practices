import React, {useState, useEffect} from 'react';
import './assets/scss/App.scss'
import Clock from './Clock';

export default function App() {
    const [ticks, setTicks] = useState(0);
    
    useEffect(() => {
        setInterval(() => {
            /* 시간 */
            setTicks(ticks + 1);
        }, 1000);
    }, [ticks]);

    return (
        <>
            <Clock
                message={`ex04: thicks ${ticks}`}
                hours={'15'}
                minutes={'04'}
                seconds={'02'}/>
        </>        
    );
}