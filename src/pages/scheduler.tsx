import React, { useState } from "react";
import { Inject, ScheduleComponent, Week, EventSettingsModel, ViewsDirective, ViewDirective} from "@syncfusion/ej2-react-schedule";
import './scheduler.css';
import { ISchedArray } from "../interfaces/schedArray";

const Scheduler = (props: any) => {
    
    // * Always include SunSat as 20211212 and 20211218
    // ! No spaces for recurrence strings!!!
    // TODO: Figure out how to get a constant week
    // TODO Convert conflict from n^3 looping to an n^2 matrix for performance?

    // Index for the schedules
    const [scheduleIndex, setScheduleIndex] = useState<number>(0);
    // List of schedules
    const [finalList, setFinalList] = useState<ISchedArray[][]>([[        
        {
        Subject:"Stats",
        Id:"2",
        StartTime: new Date(2021, 11, 12, 9, 30),
        EndTime: new Date(2021, 11, 12, 10, 20),
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
        RecurrenceException:"20211212,20211218,20211214,20211216"    
        },
        {
        Subject:"Algorithms",
        Id:"3",
        StartTime: new Date(2021, 11, 12, 17, 30),
        EndTime: new Date(2021, 11, 12, 18, 45),
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
        RecurrenceException:"20211212,20211218,20211213,20211215,20211217"
        },]]);

    // List of all possible times
    const [timesList, setTimesList] = useState<ISchedArray[]>(
        [        
        {
        Subject:"Stats",
        Id:"0",
        StartTime: new Date(2021, 11, 12, 10, 30),
        EndTime: new Date(2021, 11, 12, 11, 20),
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
        RecurrenceException:"20211212,20211218,20211214,20211216"    
        },
        {
        Subject:"Stats",
        Id:"1",
        StartTime: new Date(2021, 11, 12, 10, 50),
        EndTime: new Date(2021, 11, 12, 11, 20),
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
        RecurrenceException:"20211212,20211218,20211214,20211216"    
        },
        {
        Subject:"Stats",
        Id:"2",
        StartTime: new Date(2021, 11, 12, 9, 30),
        EndTime: new Date(2021, 11, 12, 10, 20),
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
        RecurrenceException:"20211212,20211218,20211214,20211216"    
        },
        {
        Subject:"Algorithms",
        Id:"3",
        StartTime: new Date(2021, 11, 12, 17, 30),
        EndTime: new Date(2021, 11, 12, 18, 45),
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
        RecurrenceException:"20211212,20211218,20211213,20211215,20211217"
        },
        {
        Subject:"Game Design",
        Id:"4",
        StartTime: new Date(2021, 11, 12, 17, 30),
        EndTime: new Date(2021, 11, 12, 18, 45),
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
        RecurrenceException:"20211212,20211218,20211214,20211216,20211217"
        },
        {
        Subject:"Numerical",
        Id:"5",
        StartTime: new Date(2021, 11, 12, 16, 0),
        EndTime: new Date(2021, 11, 12, 17, 15),
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
        RecurrenceException:"20211212,20211218,20211213,20211215,20211217"
        },
        {
        Subject:"Game Lab",
        Id:"6",
        StartTime: new Date(2021, 11, 12, 19, 0),
        EndTime: new Date(2021, 11, 12, 20, 40),
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
        RecurrenceException:"20211212,20211218,20211214,20211216,20211217"
        },
        {
        Subject:"AI",
        Id:"7",
        StartTime: new Date(2021, 11, 12, 16, 0),
        EndTime: new Date(2021, 11, 12, 17, 15),
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
        RecurrenceException:"20211212,20211218,20211214,20211216,20211217"
        },
        {
        Subject:"Automata",
        Id:"8",
        StartTime: new Date(2021, 11, 12, 16, 30),
        EndTime: new Date(2021, 11, 12, 17, 20),
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
        RecurrenceException:"20211212,20211218,20211214,20211216,20211217"
        },
        {
        Subject:"Fake",
        Id:"9",
        StartTime: new Date(2021, 11, 12, 17, 15),
        EndTime: new Date(2021, 11, 12, 17, 45),
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
        RecurrenceException:"20211212,20211218,20211213,20211215,20211217"
        },]
    );


    
    // Number of schedules
    const [scheduleCount, setScheduleCount] = useState<number>(0);
    
    /////////////////////////////////////////////////////////
    // Data for React Scheduler
    let localData:EventSettingsModel = {dataSource: finalList[scheduleIndex]};
    /////////////////////////////////////////////////////////

    
    // Navigates to previous schedule
    const prevSchedule = () : void => {
        if (scheduleIndex > 0) {
            setScheduleIndex(scheduleIndex - 1);
        }
    }
    
    //Navigates to next schedule
    const nextSchedule = () : void => {
        if (scheduleIndex < scheduleCount - 1) {
            setScheduleIndex(scheduleIndex + 1);
        }
    }

    // Function to convert from decimal number to binary string
    const dec2bin = (dec: number): string => {
        return (dec >>> 0).toString(2);
    }

    // Calculate permutations and resolve conflicts
    const permute = (): void => {

        // Temporary lists for filtering schedules
        let totalSectionCount = timesList.length;
        let intermediateSchedules: ISchedArray[][] = [];
        let preFinalList: ISchedArray[][] = [];

        // Loop over all possible combinations
        for (let i = 0; i < 2**totalSectionCount; i++) {

            let tempCourses: ISchedArray[] = [];
            // Convert number to binary string and pad to length of section count
            var t: string = dec2bin(i).toString().padStart(totalSectionCount, '0');

            // For each digit push corresponding course to temp course
            for (let j = 0; j < totalSectionCount; j++) {
                if (t.charAt(j) == '1') {
                    tempCourses.push(timesList[j]);
                }
            }
            
            // Loop through courses & check if theres a conflict between any classes
            let isPossibleSchedule: boolean = true;

            for (let k = 0; k < tempCourses.length; k++) {
                for (let m = k; m < tempCourses.length; m++) {
                    if (conflict(tempCourses[k], tempCourses[m])) {
                        isPossibleSchedule = false;
                    }
                }
            }

            // If possible, add to intermediate schedule list
            if (isPossibleSchedule) {
                intermediateSchedules.push(tempCourses);
            }
        }

        // Find maximum class count for any given schedule
        let tempMax = 0;
        for (let i = 0; i < intermediateSchedules.length; i++) {
            if (intermediateSchedules[i].length > tempMax) {
                tempMax = intermediateSchedules[i].length;
            }
        }

        // Push optimal schedules into preFinalList variable
        for (let i = 0; i < intermediateSchedules.length; i++) {
            if (intermediateSchedules[i].length === tempMax) {
                preFinalList.push(intermediateSchedules[i]);
            }
        }

        // Set Final List state to preFinalList variable (Don't Change)
        setFinalList(preFinalList);
        setScheduleCount(preFinalList.length);
    }

    // Returns if there's a conflict between 2 courses
    const conflict = (a: ISchedArray, b: ISchedArray): boolean => {

        // If the object is itself, return no conflict
        if (a.Id === b.Id) {
            return false;
        }
        // If 2 courses share the same name, return immediate conflict
        if (a.Subject === b.Subject) {
            return true;
        }
        
        // Boolean to indicate same days between classes
        let conflictDays: boolean = false;
        
        // Check if there is a conflict of days
        if (!a.RecurrenceException.includes('20211213') && !b.RecurrenceException.includes('20211213')) {
            conflictDays = true;
        } 
        if (!a.RecurrenceException.includes('20211214') && !b.RecurrenceException.includes('20211214')) {
            conflictDays = true;
        } 
        if (!a.RecurrenceException.includes('20211215') && !b.RecurrenceException.includes('20211215')) {
            conflictDays = true;
        } 
        if (!a.RecurrenceException.includes('20211216') && !b.RecurrenceException.includes('20211216')) {
            conflictDays = true;
        } 
        if (!a.RecurrenceException.includes('20211217') && !b.RecurrenceException.includes('20211217')) {
            conflictDays = true;
        }

        // Converting start/end times to integers for easier comparison
        let aTempStart: number = a.StartTime.getHours() * 100 + a.StartTime.getMinutes();
        let aTempEnd: number = a.EndTime.getHours() * 100 + a.EndTime.getMinutes();
        let bTempStart: number = b.StartTime.getHours() * 100 + b.StartTime.getMinutes();
        let bTempEnd: number = b.EndTime.getHours() * 100 + b.EndTime.getMinutes();

        // Check if there is a time conflict
        let conflictOne: boolean = (aTempStart <= bTempStart && bTempStart <= aTempEnd);
        let conflictTwo: boolean = (bTempStart <= aTempStart && aTempStart <= bTempEnd);
        let timeConflict: boolean = conflictOne || conflictTwo;

        // Return true (conflict) only if there's conflict in BOTH days and times
        return conflictDays && timeConflict;
    }

    // Debugging function
    const checkFunction = () : void => {
        let checker = conflict(timesList[3], timesList[7])
    }



    // Return component
    return (
    <div className = "schedule-big"> 
        <div className="schedule-header">    
            <div className = "schedule-title-holder"><h2 className = "schedule-title">Schedule #{scheduleIndex + 1} of {scheduleCount}</h2></div>
            <div className="schedule-nav">
                <button id = "leftButton" type = "button" onClick = {prevSchedule}>Prev</button>
                <button type = "button" id = "generate" onClick = {permute}><i className="fas fa-sync"></i></button>
                <button id = "rightButton" type = "button" onClick = {nextSchedule}>Next</button>
                <button id = "testButton" type = "button" onClick = {checkFunction}>Console</button>
            </div>
        </div>
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