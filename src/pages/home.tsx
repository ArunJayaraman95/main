import React, { useEffect } from "react";
import IPage from "../interfaces/page";

const HomePage: React.FunctionComponent<IPage> = props => {
    return (
        <div>
            <p>HOME PAGE</p>
            <a href = "/scheduler">Schedule</a>
        </div>
    )
}

export default HomePage;