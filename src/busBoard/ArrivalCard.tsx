import React, { useState } from "react";
import { busArrival } from "../backend";
import { CountdownTimer } from "./CountdownTimer";

interface ArrivalCardProps {
    arrival: busArrival;
}


export function ArrivalCard(props: ArrivalCardProps): React.ReactElement {
    const styles = {
        border: {
            width: "200px",
            height: "75px",
            borderRadius: "15px 15px 15px 15px",
            margin: "20px",
            boxShadow: "5px 5px 5px grey",
        },
        titleSection: {
            backgroundColor: "#8758FF",
            borderRadius: "15px 15px 0px 0px",
            //   "border-top": "solid black",
            //   "border-left": "solid black",
            //   "border-right": "solid black",
            //   borderWidth: "2px",
            height: "50%",
        },
        infoSection: {
            backgroundColor: "#EEEEEE",
            borderRadius: "0px 0px 15px 15px",
            //   "border-bottom": "solid black",
            //   "border-left": "solid black",
            //   "border-right": "solid black",
            padding: "5px 0px 0px 10px",
            height: "50%",
        },
        leftTitleText: {
            margin: "0px",
            float: "left",
            display: "inline-block",
            padding: "5px 0px 5px 10px",
        } as React.CSSProperties,
        rightTitleText: {
            margin: "0px",
            float: "right",
            display: "inline-block",
            padding: "5px 10px 5px 0px",
        } as React.CSSProperties,
    };

    return (
        <>
            <div style={styles.border}>
                <div style={styles.titleSection}>
                    <div style={styles.leftTitleText}>
                        {props.arrival.lineName}
                    </div>
                    <div style={styles.rightTitleText}>
                        {props.arrival.expectedArrival.slice(11, 19)}
                    </div>
                </div>
                <div style={styles.infoSection}>Time to Arrival: <CountdownTimer initialTime={props.arrival.timeToStation} />s</div>
            </div>
        </>
    );
}

export default ArrivalCard;
