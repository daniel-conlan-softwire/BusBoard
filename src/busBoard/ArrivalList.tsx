import React, { useState, useEffect } from "react";
import ArrivalCard from "./ArrivalCard";
import { busArrival, stopPoint } from "../backend";
import { getNextBusesFromStopcode } from "../backend";

export interface arrivalListProps {
    stopDetails: stopPoint;
}

export function ArrivalList(props: arrivalListProps): React.ReactElement {
    const styles: { [key: string]: React.CSSProperties } = {
        border: {
            width: "250px",
            borderRadius: "15px 15px 15px 15px",
            margin: "20px",
            padding: "1px 0px 5px 0px",
            height: "auto",
            boxShadow: "5px 5px 5px grey",
            backgroundColor: "#EAE9FE",
        },
        text: {
            textAlign: "center",
        },
    };

    const [arrivals, setArrivals] = useState<busArrival[]>([]);

    useEffect(() => {

        getNextBusesFromStopcode(props.stopDetails.id, 5).then((data) => setArrivals(data));
        
        const interval = setInterval(async () => {
            const busArrivals = await getNextBusesFromStopcode(props.stopDetails.id, 5);
            setArrivals(busArrivals);
        }, 30000);

        return () => clearInterval(interval);
    }, [arrivals]);

    return (
        <div style={styles.border}>
            <h2 style={styles.text}>{props.stopDetails.commonName}</h2>
            {arrivals.map((arrival: busArrival) => {
                return <ArrivalCard key={arrival.id} arrival={arrival} />;
            })}
        </div>
    );
}
