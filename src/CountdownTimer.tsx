import React, { useState, useEffect } from "react";

interface countdownTimerProps {
    initialTime: number;
}


export function CountdownTimer(props: countdownTimerProps): React.ReactElement {
    const [time, setTime] = useState(props.initialTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time => time - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <>{time}</>;
}
