import fetch from 'node-fetch';

interface stopPoint {
    id: string,
    distance: number
}

interface busArrival {
    timeToStation: number
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

async function getNextBusesFromStopcode(stopcode: string, noBuses: number): Promise<busArrival[]> {
    const stopCode = '490008660N';
    const requestURL = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals`;

    const response = await fetch(requestURL);
    const jsonBody = await response.json();

    jsonBody.sort((first: busArrival, second: busArrival) => {
        return first.timeToStation - second.timeToStation;
    });

    return jsonBody.slice(0, noBuses);
}

async function getNextBusesFromStopPoints(stopPoints: stopPoint[], noBuses: number) {

    const busesPerStopcode: {[key: string]: busArrival[]} = {};

    for (let stopPoint of stopPoints) {
        const nextBuses = await getNextBusesFromStopcode(stopPoint.id, noBuses)
        busesPerStopcode[stopPoint.id] = nextBuses;
    }

    return busesPerStopcode;

}

async function getNextBusesFromPostcode(postcode: string, noBuses: number, noStops: number) {

    const [latitude, longitude] = await getLatitudeLongitudeFromPostcode(postcode);
    const nearestStopPoints = await getNearestStopPoints(latitude, longitude, 200, noStops);

    return await getNextBusesFromStopPoints(nearestStopPoints, noBuses);

}

async function main() {
    const postcode = 'NW5 1TL'
    const noBuses = 5;
    const noStops = 2;

    const nextBuses = await getNextBusesFromPostcode(postcode, noBuses, noStops);
    console.log(nextBuses);
}

main();
// getNextBusesFromPostcode(postcode, 5);

// const postcode = '';
// const stopcode = getStopCode(postcode);
// const requestURL = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals`;

// fetch(requestURL).then((response) => {
//     response.json().then((jsonBody) => {

//         jsonBody = jsonBody.sort((first : any, second : any) => {
//             const arrival1 = first.expectedArrival;
//             const arrival2 = second.expectedArrival;

//             return (arrival1 > arrival2) ? 1 : (arrival1 < arrival2) ? -1 : 0;
//         });

//         for (let i = 0; i <= 4; i++) {
//             console.log(`${jsonBody[i].vehicleId}: ${jsonBody[i].expectedArrival}`);
//         }
//     });
// }) 





