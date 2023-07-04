import fetch from 'node-fetch';

export interface stopPoint {
    id: string,
    distance: number
    commonName: string
}

export interface busArrival {
    id: string,
    direction: string,
    expectedArrival: string,
    lineName: string,
    timeToStation: number
}

export interface stopInformation {
    stopDetails: stopPoint,
    arrivals: busArrival[]
}

async function getLatitudeLongitudeFromPostcode(postcode: string): Promise<[number, number]> {
    const requestURL = `https://api.postcodes.io/postcodes/${postcode}`;

    const response = await fetch(requestURL);
    const jsonBody = await response.json();

    return [jsonBody.result.latitude, jsonBody.result.longitude];
}


async function getNearestStopPoints(latitude: number, longitude: number, radius: number, noStops: number): Promise<stopPoint[]> {
    const requestURL = `https://api.tfl.gov.uk/StopPoint/?lat=${latitude}&lon=${longitude}&stopTypes=NaptanPublicBusCoachTram&radius=${radius}`

    const response = await fetch(requestURL);
    const jsonBody = await response.json();

    jsonBody.stopPoints.sort((first: stopPoint, second: stopPoint) => {
        return first.distance - second.distance;
    });

    return jsonBody.stopPoints.slice(0, noStops);

}

export async function getNextBusesFromStopcode(stopcode: string, noBuses: number): Promise<busArrival[]> {
    const requestURL = `https://api.tfl.gov.uk/StopPoint/${stopcode}/Arrivals`;

    const response = await fetch(requestURL);
    const jsonBody = await response.json();

    jsonBody.sort((first: busArrival, second: busArrival) => {
        return first.timeToStation - second.timeToStation;
    });

    return jsonBody.slice(0, noBuses);
}

async function getNextBusesFromStopPoints(stopPoints: stopPoint[], noBuses: number) {

    const stopInfoPerStopcode: { [key: string]: stopInformation } = {};

    for (let stopPoint of stopPoints) {
        const nextBuses = await getNextBusesFromStopcode(stopPoint.id, noBuses)

        const stopInfo: stopInformation = {
            arrivals: nextBuses,
            stopDetails: stopPoint
        };

        stopInfoPerStopcode[stopPoint.id] = stopInfo;
    }

    return stopInfoPerStopcode;

}

export async function getNextBusesFromPostcode(postcode: string, noBuses: number, noStops: number) {

    const [latitude, longitude] = await getLatitudeLongitudeFromPostcode(postcode);
    const nearestStopPoints = await getNearestStopPoints(latitude, longitude, 200, noStops);

    return await getNextBusesFromStopPoints(nearestStopPoints, noBuses);

}
