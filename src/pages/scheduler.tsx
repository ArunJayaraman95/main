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

    const [scheduleIndex, setScheduleIndex] = useState<number>(1);
    const xxx = [
        {
            Subject: "Algorithms",
            Id: '1',
            StartTime: new Date(2021, 11, 12, 8, 0),
            EndTime: new Date(2021, 11, 12, 12, 0),
            RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=7',
            RecurrenceException: '20211212,20211218,20211214,20211216,20211217'
        },
        {
            Subject: "Stats",
            Id: '2',
            StartTime: new Date(2021, 11, 12, 8, 0),
            EndTime: new Date(2021, 11, 12, 12, 0),
            RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=7',
            RecurrenceException: '20211212,20211218,20211214,20211216,20211217'
        },
        {
            Subject: "Algorithms",
            Id: '3',
            StartTime: new Date(2021, 11, 12, 8, 0),
            EndTime: new Date(2021, 11, 12, 12, 0),
            RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=7',
            RecurrenceException: '20211212,20211218,20211214,20211216,20211217'
        },
        {
            Subject: "Algorithms",
            Id: '4',
            StartTime: new Date(2021, 11, 12, 8, 0),
            EndTime: new Date(2021, 11, 12, 12, 0),
            RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=7',
            RecurrenceException: '20211212,20211218,20211214,20211216,20211217'
        },
        {
            Subject: "Algorithms",
            Id: '5',
            StartTime: new Date(2021, 11, 12, 8, 0),
            EndTime: new Date(2021, 11, 12, 12, 0),
            RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=7',
            RecurrenceException: '20211212,20211218,20211214,20211216,20211217'
        },
    ];

    // State for calendar event array
    const [fList, setFList] = useState<ISchedArray[][]>([[
        {
        Subject: "Algorithms",
        Id: '1',
        StartTime: new Date(2021, 11, 12, 8, 0),
        EndTime: new Date(2021, 11, 12, 12, 0),
        RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=7',
        RecurrenceException: '20211212,20211218,20211214,20211216,20211217'
        },
        {
        Subject: "Stats",
        Id: '2',
        StartTime: new Date(2021, 11, 12, 13, 0),
        EndTime: new Date(2021, 11, 12, 15, 0),
        RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=7',
        RecurrenceException: '20211212,20211218,20211214,20211216,20211217'
        },],
        [
        {
        Subject: "Stats",
        Id: '3',
        StartTime: new Date(2021, 11, 12, 13, 0),
        EndTime: new Date(2021, 11, 12, 15, 0),
        RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=7',
        RecurrenceException: '20211212,20211218,20211214,20211216,20211217'
        },]
    ]);

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
    let localData:EventSettingsModel = {dataSource: fList[scheduleIndex]}

    // Update Calendar Function
    const updateCal = () :void => {
        console.log(refinedCourses);
        setFList(refinedCourses);
    }

    const prevSchedule = () : void => {
        if (scheduleIndex > 0) {
            setScheduleIndex(scheduleIndex - 1);
        }
    }

    const dec2bin = (dec: number): string => {
        return (dec >>> 0).toString(2);
        //Use ParseInt for string to int
    }

    const nextSchedule = () : void => {
        // TODO change from 1 to dynamic variable
        if (scheduleIndex < fList.length - 1) {
            setScheduleIndex(scheduleIndex + 1);
        }
        console.log("Length" + fList.length);
        console.log(dec2bin(2));
        console.log(parseInt(dec2bin(2)));
    }



    // Return component
    return (
    <div>                    
        <button className = "leftButton" type = "button" onClick = {prevSchedule}>Left</button>
        <button type = "button" id = "updateCal" onClick = {updateCal}><i className="fas fa-sync"></i></button>
        <button className = "rightButton" type = "button" onClick = {nextSchedule}>Right</button>
        <h2>Schedule #{scheduleIndex + 1} of {fList.length}</h2>
        
        <div className="scheduler-component">
            <ScheduleComponent
                timeScale={{ enable: true, interval: 60, slotCount: 2 }}
                showHeaderBar = {false}
                showTimeIndicator = {false}
                height = '90vh'
                width = '60vw'
                currentView = "Week"
                selectedDate = {new Date(2021, 11, 12)}
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