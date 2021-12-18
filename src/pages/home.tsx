import React, { useEffect } from "react";
import IPage from "../interfaces/page";

const HomePage: React.FunctionComponent<IPage> = props => {
    return (
        <div>
            <p>HOME PAGE Published V2</p>
            <a href = "/schedule">Schedule</a>
        </div>
    )
}

export default HomePage;