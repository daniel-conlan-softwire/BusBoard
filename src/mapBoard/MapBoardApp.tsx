import React, { useState } from "react";
import ReactSwitch from "react-switch";
import {
    getLatitudeLongitudeFromPostcode,
    getNearestStopPoints,
    getNearestStopPointsFromPostcode,
    getNextBusesFromPostcode,
    stopInformation,
    stopPoint,
} from "../backend";
import StopMap from "./StopMap";
import { ArrivalList } from "../busBoard/ArrivalList";

async function getStopPoints(
    postcode: string,
    maxRadius: number,
    maxStops: number
): Promise<any> {
    const [lat, long] = await getLatitudeLongitudeFromPostcode(postcode);
    const nearestStopPoints = await getNearestStopPoints(
        lat,
        long,
        maxRadius,
        maxStops
    );

    return {
        stopPoints: nearestStopPoints,
        centerLatLon: [lat, long],
    };
}

function MapBoardApp(): React.ReactElement {
    const styles: { [key: string]: React.CSSProperties } = {
        background: {
            height: "100%",
        },
        title: {
            textAlign: "center",
            background: "#8758FF",
            margin: "0px 0px 10px 0px",
        },
        postcodeBar: {
            textAlign: "left",
            color: "white",
        },
        arrivalsGrid: {
            display: "grid",
            gridTemplateColumns: "auto auto",
            justifyContent: "center",
        },
        layout: {
            display: "grid",
        },
    };

    const [postcode, setPostcode] = useState("NW5 1TL");
    const [focusedStopPoint, setFocusedStopPoint] = useState<stopPoint | null>(
        null
    );
    const [stopPoints, setStopPoints] = useState<stopPoint[]>([]);
    const [centerLatLon, setCenterLatLon] = useState<[number, number]>([
        51.505, -0.09,
    ]);

    const [maxRadius, setMaxRadius] = useState(500);
    const [maxStops, setMaxStops] = useState(5);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    async function formHandler(
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault(); // to stop the form refreshing the page when it submits
        const data = await getStopPoints(postcode, maxRadius, maxStops);

        setStopPoints(data.stopPoints);
        setCenterLatLon(data.centerLatLon);
    }

    function updateFocusedStopPoint(stopPoint: stopPoint) {
        setFocusedStopPoint(stopPoint);
    }

    return (
        <div style={styles.background}>
            <h1 style={styles.title}> BusBoard </h1>
            <form action="" onSubmit={formHandler} style={styles.postcodeBar}>
                Postcode: &nbsp;
                <input
                    type="text"
                    name="postcode"
                    onChange={(data: React.ChangeEvent<HTMLInputElement>) =>
                        setPostcode(data.target.value)
                    }
                />
                <br />
                Max Radius: &nbsp;
                <input
                    type="text"
                    name="maxRadius"
                    value={maxRadius}
                    onChange={(data: React.ChangeEvent<HTMLInputElement>) => {
                        setMaxRadius(Number(data.target.value));
                    }}
                />
                <br />
                Max No.Stops: &nbsp;
                <input
                    type="text"
                    name="maxStops"
                    value={maxStops}
                    onChange={(data: React.ChangeEvent<HTMLInputElement>) =>
                        setMaxStops(Number(data.target.value))
                    }
                />
                <br />

                <input type="submit" value="Wayhay!" />
            </form>
            
            <ReactSwitch
                checked={isEnabled}
                onChange={toggleSwitch}
            ></ReactSwitch>
            <StopMap
                stopPoints={stopPoints}
                centerLatLon={centerLatLon}
                toggledMode={isEnabled}
                onMarkerClick={(stopPoint: stopPoint) =>
                    updateFocusedStopPoint(stopPoint)
                }
            />
            {focusedStopPoint !== null ? (
                <ArrivalList stopDetails={focusedStopPoint} />
            ) : (
                <></>
            )}
        </div>
    );
}

export default MapBoardApp;
