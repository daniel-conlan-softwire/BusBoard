import React, { useState } from "react";
import { ArrivalList } from "./ArrivalList";
import {
    getNextBusesFromPostcode,
    busArrival,
    stopPoint,
    stopInformation,
} from "./backend";

async function getBuses(postcode: string): Promise<any> {
    // very basic testing string, you'll likely return a list of strings or JSON objects instead!
    const response = await getNextBusesFromPostcode(postcode, 5, 2);
    return response;
}

function App(): React.ReactElement {
    const [postcode, setPostcode] = useState("");
    const [tableData, setTableData] = useState<{
        [key: string]: stopInformation;
    }>({});

    async function formHandler(
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault(); // to stop the form refreshing the page when it submits
        const data = await getBuses(postcode);
        setTableData(data);
    }

    return (
        <>
            <h1> BusBoard </h1>
            <form action="" onSubmit={formHandler}>
                Postcode: &nbsp;
                <input
                    type="text"
                    name="postcode"
                    onChange={(data: React.ChangeEvent<HTMLInputElement>) =>
                        setPostcode(data.target.value)
                    }
                />
                <br />
                <input type="submit" value="Submit" />
            </form>
            {Object.entries(tableData).map(([stopcode, stopInformation]) => {
                return (
                    <ArrivalList
                        key={stopcode}
                        stopDetails={stopInformation.stopDetails}
                        arrivals={stopInformation.arrivals}
                    />
                );
            })}
        </>
    );
}

export default App;
