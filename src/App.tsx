import React, { useState, useEffect } from "react";
import { ArrivalList } from "./ArrivalList";
import {
    getNextBusesFromPostcode,
    busArrival,
    stopPoint,
    stopInformation,
} from "./backend";
import { arrivalListProps } from "./ArrivalList";
import { title } from "process";

async function getBuses(postcode: string): Promise<any> {
    // very basic testing string, you'll likely return a list of strings or JSON objects instead!
    const response = await getNextBusesFromPostcode(postcode, 5, 2);
    return response;
}

function App(): React.ReactElement {

    const styles: { [key: string]: React.CSSProperties } = {
      background: {
        height: '100%'
      } ,
      title: {
        textAlign: "center",
        background : "#8758FF",
        margin: "0px 0px 10px 0px" 
      } ,
      postcodeBar: {
        textAlign: "center",
        color: "white"
      }
    }




    const [postcode, setPostcode] = useState("NW5 1TL");
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
                <input type="submit" value="Wayhay!" />
            </form>
            {Object.entries(tableData).map(([stopcode, stopInformation]) => {
                return (
                    <ArrivalList
                        key={stopcode}
                        stopDetails={stopInformation.stopDetails}
                    />
                );
            })}
        </ div>
    );
}

export default App;
