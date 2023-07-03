import fetch from 'node-fetch';

const stopCode = '490008660N';
const requestURL = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals`;

fetch(requestURL).then((response) => {
    response.json().then((jsonBody) => {

        jsonBody = jsonBody.sort((first : any, second : any) => {
            const arrival1 = first.expectedArrival;
            const arrival2 = second.expectedArrival;

            return (arrival1 > arrival2) ? 1 : (arrival1 < arrival2) ? -1 : 0;
        });

        for (let i = 0; i <= 4; i++) {
            console.log(`${jsonBody[i].vehicleId}: ${jsonBody[i].expectedArrival}`);
        }
    });
}) 





