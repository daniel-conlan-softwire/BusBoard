import React, { useState } from "react";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import centerMarkerURL from "../markers/centerMarker.png";
import markerIconURL from "leaflet/dist/images/marker-icon.png";
import toggledCenterMarkerURL from "../markers/toggledCenterMarker.png";
import toggledMarkerURL from "../markers/toggledMarker.jpg";

import { Icon } from "leaflet";
import { stopPoint } from "../backend";

interface stopMapProps {
    stopPoints: stopPoint[];
    centerLatLon: [number, number];
    onMarkerClick: Function;
    toggledMode: boolean;
}

function ChangeView({ center, zoom }: any) {
    const map = useMap();
    map.flyTo([center[0], center[1]], zoom);
    return null;
}

function calculateZoom(lat: number, searchRadius: number): number {
    return Math.log2(
        (Math.cos((lat * Math.PI) / 180) * 2 * Math.PI * 6371008) / searchRadius
    );
}

function StopMap(props: stopMapProps): React.ReactElement {
    let centerMarkerIcon: string;
    let markerIcon: string;

    if (props.toggledMode) {
        centerMarkerIcon = toggledCenterMarkerURL;
        markerIcon = toggledMarkerURL;
    } else {
        centerMarkerIcon = centerMarkerURL;
        markerIcon = markerIconURL;
    }

    return (
        <>
            <MapContainer
                center={props.centerLatLon}
                zoom={13}
                scrollWheelZoom={true}
                style={{
                    height: "500px",
                }}
            >
                <ChangeView
                    center={props.centerLatLon}
                    zoom={calculateZoom(props.centerLatLon[0], 500)}
                />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                    position={props.centerLatLon}
                    icon={
                        new Icon({
                            iconUrl: centerMarkerIcon,
                            iconSize: [50, 50],
                            iconAnchor: [25, 50],
                        })
                    }
                />

                {props.stopPoints.map((stopPoint) => {
                    return (
                        <Marker
                            key={stopPoint.id}
                            position={[stopPoint.lat, stopPoint.lon]}
                            icon={
                                new Icon({
                                    iconUrl: markerIcon,
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                })
                            }
                            eventHandlers={{
                                click: (e) => {
                                    props.onMarkerClick(stopPoint);
                                },
                            }}
                        >
                            <Popup>{`${stopPoint.commonName}: ${Math.round(
                                stopPoint.distance
                            )}m`}</Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </>
    );
}

export default StopMap;
