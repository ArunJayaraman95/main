import React, { useState } from "react";
import { Inject, ScheduleComponent, Week, EventSettingsModel, ViewsDirective, ViewDirective} from "@syncfusion/ej2-react-schedule";
import './scheduler.css';
import { ISchedArray } from "../interfaces/schedArray";

const Scheduler = (props: any) => {
    
    // * Always include SunSat as 20211212 and 20211218
    // ! No spaces for recurrence strings!!!
    
    // let initial: ISchedArray = {
    //     Id: "1",
    //     Subject: "HI",
    //     StartTime: new Date(2021, 11, 13, 16, 45),
    //     EndTime: new Date(2021, 11, 13, 18, 45),
    //     RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=8",
    //     RecurrenceException:"20211214,20211216"
    // }

    // State for calendar event array
    const [fList, setFList] = useState<ISchedArray[]>([]);

    // TODO: Figure out how to get a constant week
    // Morph props courses into manageable FList type courses
    const refinedCourses = props.courseListings.map((item:any) => {
        const container:any = {};
        container.Subject = item.courseName;
        container.StartTime = new Date(2021, 11, 12, item.sHour, item.sMin);
        container.EndTime = new Date(2021, 11, 12, item.eHour, item.eMin);
        container.RecurrenceRule = "FREQ=DAILY;INTERVAl=1;COUNT=7"
        container.RecurrenceException = item.days;
        console.log(container);
        return container;
    })

    // Data for React Scheduler
    let localData:EventSettingsModel = {dataSource: fList}

    // Update Calendar Function
    const updateCal = () :void => {
        console.log(refinedCourses);
        setFList(refinedCourses);
    }

    // Return component
    return (
    <div>
        <button type = "button" onClick = {updateCal}>Update</button>
        <div className="scheduler-component">
            <ScheduleComponent
                timeScale={{ enable: true, interval: 60, slotCount: 2 }}
                showHeaderBar = {false}
                showTimeIndicator = {false}
                height = '90vh'
                width = '60vw'
                currentView = "Week"
                eventSettings = {localData}>

                <ViewsDirective>
                    <ViewDirective
                        option = 'Week'
                        isSelected = {true}
                        readonly = {true}
                        startHour = '07:00'
                        endHour = '23:00'
                        showWeekNumber = {false}/>

                </ViewsDirective>
                <Inject services = {[Week]} />

            </ScheduleComponent>
        </div>
    </div>
    )
}

export default Scheduler;