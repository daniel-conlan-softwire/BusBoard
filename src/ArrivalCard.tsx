import React, { useState } from "react";
import { busArrival } from "./backend";

interface ArrivalCardProps {
    arrival: busArrival;
}

export function ArrivalCard(props: ArrivalCardProps): React.ReactElement {
    const styles = {
        border: {
            width: "200px",
            height: "75px",
            "border-radius": "15px 15px 15px 15px",
            margin: "20px",
            boxShadow: "5px 5px 5px grey",
        },
        titleSection: {
            backgroundColor: "#CF0A0A",
            "border-radius": "15px 15px 0px 0px",
            //   "border-top": "solid black",
            //   "border-left": "solid black",
            //   "border-right": "solid black",
            //   borderWidth: "2px",
            height: "50%",
        },
        infoSection: {
            backgroundColor: "#EEEEEE",
            "border-radius": "0px 0px 15px 15px",
            //   "border-bottom": "solid black",
            //   "border-left": "solid black",
            //   "border-right": "solid black",
            height: "50%",
        },
    };

    return (
        <>
            <div style={styles.border}>
                <div style={styles.titleSection}>
                    <div
                        style={{
                            margin: "0px",
                            float: "left",
                            display: "inline-block",
                            padding: "5px 0px 5px 10px",
                        }}
                    >
                        {props.arrival.lineName}
                    </div>
                    <div
                        style={{
                            margin: "0px",
                            float: "right",
                            display: "inline-block",
                            padding: "5px 10px 5px 0px",
                        }}
                    >
                        {props.arrival.expectedArrival.slice(11, 19)}
                    </div>
                </div>
                <div style={styles.infoSection}>{}</div>
            </div>
        </>
    );
}

export default ArrivalCard;
