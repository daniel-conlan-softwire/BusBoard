import React, { useState } from "react";
import ReactSwitch from "react-switch";
import {
    getLatitudeLongitudeFromPostcode,
    getNearestStopPoints,
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
        textBar: {
            color: "#0B0A07",
            backgroundColor: "#F0F3F5",
            borderRadius: "10px 10px 10px 10px",
            margin: "2px",
            padding: "5px 5px 5px 5px",
            border: "solid #0B0A07",
        },
        errorTextBar: {
            color: "red",
            backgroundColor: "#F0F3F5",
            borderRadius: "10px 10px 10px 10px",
            margin: "2px",
            padding: "5px 5px 5px 5px",
            border: "solid #0B0A07",
        },
        parameterBox: {
            width: "250px",
            borderRadius: "15px 15px 15px 15px",
            margin: "20px",
            padding: "20px 20px 20px 20px",
            height: "auto",
            backgroundColor: "#FF784F",
            boxShadow: "5px 5px 5px 5px grey",
        },
        title: {
            textAlign: "left",
            background: "#3993DD",
            margin: "0px 0px 10px 0px",
            width: "100%",
            padding: "5px 50px 5px 5px",
            boxShadow: "5px 5px 5px 5px grey",
        },
        arrivalsGrid: {
            display: "grid",
            gridTemplateColumns: "auto auto",
            justifyContent: "center",
        },
        layout: {
            display: "grid",
        },
        button: {
            color: "#0B0A07",
            backgroundColor: "3993DD",
            width: "250px",
            border: "solid #0B0A07",
            borderRadius: "15px 15px 15px 15px",
            margin: "15px 0px 0px 0px",
        },
        map: {
            padding: "20px",
            borderRadius: "20px 20px 20px 20px",
            backgroundColor: "#3993DD",
            boxShadow: "5px 5px 5px 5px grey",
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

    const [errorOnSubmit, setErrorOnSubmit] = useState(false);

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    async function formHandler(
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault(); // to stop the form refreshing the page when it submits

        try {
            const data = await getStopPoints(postcode, maxRadius, maxStops);
            setStopPoints(data.stopPoints);
            setCenterLatLon(data.centerLatLon);
            setErrorOnSubmit(false);
        } catch (err) {
            setErrorOnSubmit(true);
        }
    }

    function updateFocusedStopPoint(stopPoint: stopPoint) {
        setFocusedStopPoint(stopPoint);
    }

    return (
        <div style={styles.background}>
            <h1 style={styles.title}> BusBoard </h1>
            <form action="" onSubmit={formHandler} style={styles.parameterBox}>
                <b>Postcode</b>: &nbsp;
                <input
                    style={styles.textBar}
                    type="text"
                    name="postcode"
                    onChange={(data: React.ChangeEvent<HTMLInputElement>) =>
                        setPostcode(data.target.value)
                    }
                />
                <br />
                <b>Max Radius</b>: &nbsp;
                <input
                    style={styles.textBar}
                    type="text"
                    name="maxRadius"
                    value={maxRadius}
                    onChange={(data: React.ChangeEvent<HTMLInputElement>) => {
                        setMaxRadius(Number(data.target.value));
                    }}
                />
                <br />
                <b>Max No.Stops</b>: &nbsp;
                <input
                    style={styles.textBar}
                    type="text"
                    name="maxStops"
                    value={maxStops}
                    onChange={(data: React.ChangeEvent<HTMLInputElement>) =>
                        setMaxStops(Number(data.target.value))
                    }
                />
                <br />
                <input type="submit" value="Wayhay!" style={styles.button} />

                {(errorOnSubmit) ? <div style={styles.errorTextBar}>No Wayhay :(</div> : <></>}
            </form>

            <ReactSwitch
                checked={isEnabled}
                onChange={toggleSwitch}
            ></ReactSwitch>

            <div style={styles.map}>
                <StopMap
                    stopPoints={stopPoints}
                    centerLatLon={centerLatLon}
                    toggledMode={isEnabled}
                    onMarkerClick={(stopPoint: stopPoint) =>
                        updateFocusedStopPoint(stopPoint)
                    }
                />
            </div>

            {focusedStopPoint !== null ? (
                <ArrivalList stopDetails={focusedStopPoint} />
            ) : (
                <></>
            )}
        </div>
    );
}
export default MapBoardApp;
