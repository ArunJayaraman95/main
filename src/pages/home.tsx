import React, { useEffect } from "react";
import IPage from "../interfaces/page";

const HomePage: React.FunctionComponent<IPage> = props => {
    return (
        <div>
            <p>HOME PAGE Published V3</p>
            <a href = "/arunjayaraman95.github.io/schedule">Schedule</a>
        </div>
    )
}

export default HomePage;