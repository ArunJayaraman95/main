import React, { useEffect } from "react";
import IPage from "../interfaces/page";

const HomePage: React.FunctionComponent<IPage> = props => {
    return (
        <div>
            <p>HOME PAGE Published V1</p>
            <a href = "/scheduler">Schedule</a>
        </div>
    )
}

export default HomePage;