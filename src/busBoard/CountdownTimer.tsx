import React, { useState, useEffect } from "react";

interface countdownTimerProps {
    initialTime: number;
}

function secondsToMinuteSeconds(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const leftoverSeconds = seconds - (minutes*60);

    if (minutes > 0) {
        return `${minutes}m ${leftoverSeconds}s`;
    } else {
        return `${leftoverSeconds}s`
    }

}


export function CountdownTimer(props: countdownTimerProps): React.ReactElement {
    const [time, setTime] = useState(props.initialTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time => time - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <>{secondsToMinuteSeconds(time)}</>;
}
