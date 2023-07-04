import React from "react";
import ArrivalCard from "./ArrivalCard";
import { busArrival, stopPoint } from "./backend";

interface arrivalListProps {
    stopDetails: stopPoint;
    arrivals: busArrival[];
}

export function ArrivalList(props: arrivalListProps): React.ReactElement {
    return (
        <>
            <h2>{props.stopDetails.commonName}</h2>
            {props.arrivals.map((arrival: busArrival) => {
                return <ArrivalCard key={arrival.id} arrival={arrival} />;
            })}
        </>
    );
}
