import React from "react";
import { busArrival } from "./backend";

interface arrivalListProps {
  stopcode: string;
  arrivals: busArrival[];
}

export function ArrivalList(props: arrivalListProps): React.ReactElement {
  return (
    <>
      <h2>{props.stopcode}</h2>
      <ol>
        {props.arrivals.map((arrival: busArrival) => {
          return (
            <li key={arrival.id}>
              {arrival.id}, {arrival.timeToStation}{" "}
            </li>
          );
        })}
      </ol>
    </>
  );
}
