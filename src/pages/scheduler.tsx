import React, { useState } from "react";
import { Inject, ScheduleComponent, Week, EventSettingsModel, ViewsDirective, ViewDirective} from "@syncfusion/ej2-react-schedule";
import './scheduler.css';
import { ISchedArray } from "../interfaces/schedArray";
import { ICourse } from "../interfaces/course";
import { strictEqual } from "assert";

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

    const [scheduleIndex, setScheduleIndex] = useState<number>(0);
    const xxx = [
        {
            Subject:"Stats",
            Id:0,
            StartTime: new Date(2021, 11, 12, 10, 30),
            EndTime: new Date(2021, 11, 12, 11, 20),
            RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
            RecurrenceException:"20211212,20211218,20211213,20211215,20211217"
            },
            {
            Subject:"Stats",
            Id:1,
            StartTime: new Date(2021, 11, 12, 10, 50),
            EndTime: new Date(2021, 11, 12, 11, 20),
            RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
            RecurrenceException:"20211212,20211218,20211213,20211215,20211217"
            },
            {
            Subject:"Stats",
            Id:2,
            StartTime: new Date(2021, 11, 12, 9, 30),
            EndTime: new Date(2021, 11, 12, 10, 20),
            RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
            RecurrenceException:"20211212,20211218,20211213,20211215,20211217"
            },
            {
            Subject:"Algorithms",
            Id:3,
            StartTime: new Date(2021, 11, 12, 17, 30),
            EndTime: new Date(2021, 11, 12, 18, 45),
            RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
            RecurrenceException:"20211212,20211218,20211214,20211216"  
            },
            {
            Subject:"Game Design",
            Id:4,
            StartTime: new Date(2021, 11, 12, 17, 30),
            EndTime: new Date(2021, 11, 12, 18, 45),
            RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
            RecurrenceException:"20211212,20211218,20211213,20211215"  
            },
            {
            Subject:"Numerical",
            Id:5,
            StartTime: new Date(2021, 11, 12, 16, 0),
            EndTime: new Date(2021, 11, 12, 17, 15),
            RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
            RecurrenceException:"20211212,20211218,20211214,20211216"  
            },
            {
            Subject:"Game Lab",
            Id:6,
            StartTime: new Date(2021, 11, 12, 19, 0),
            EndTime: new Date(2021, 11, 12, 20, 40),
            RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
            RecurrenceException:"20211212,20211218,20211213,20211215"  
            },
            {
            Subject:"AI",
            Id:7,
            StartTime: new Date(2021, 11, 12, 16, 0),
            EndTime: new Date(2021, 11, 12, 17, 15),
            RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
            RecurrenceException:"20211212,20211218,20211213,20211215"  
            },
            {
            Subject:"Automata",
            Id:8,
            StartTime: new Date(2021, 11, 12, 16, 30),
            EndTime: new Date(2021, 11, 12, 17, 20),
            RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
            RecurrenceException:"20211212,20211218,20211213,20211215"  
            },
            {
            Subject:"Fake",
            Id:9,
            StartTime: new Date(2021, 11, 12, 17, 15),
            EndTime: new Date(2021, 11, 12, 17, 45),
            RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7",
            RecurrenceException:"20211212,20211218,20211214,20211216"  
            },
    ];

    // State for calendar event array
    const [finalList, setFinalList] = useState<ISchedArray[][]>([]);
    const [fList, setFList] = useState<ISchedArray[]>(
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

    let intermediateSchedules: ISchedArray[][] = [];
    
    const [ck, setck] = useState<number>(0);
    let testerList: ISchedArray[][] = [];
    // Data for React Scheduler
    let localData:EventSettingsModel = {dataSource: finalList[scheduleIndex]};

    // Update Calendar Function
    const updateCal = () :void => {
        console.log(refinedCourses);
        setFList(refinedCourses);
    }
    
    const prevSchedule = () : void => {
        if (scheduleIndex > 0) {
            setScheduleIndex(scheduleIndex - 1);
        }
        console.log("NEW");
        console.log(finalList);
    }
    
    const nextSchedule = () : void => {
        // TODO change from 1 to dynamic variable
        // ! Change back...like uncommon
        if (scheduleIndex < ck - 1) {
            setScheduleIndex(scheduleIndex + 1);
        }
        console.log(finalList);
    }

    const dec2bin = (dec: number): string => {
        return (dec >>> 0).toString(2);
        //Use ParseInt for string to int
    }


    // TODO Convert to matrix for performance

    const permute = (): void => {
        // console.log(fList.length);
        let fLength = fList.length;
        // setFinalList([]);
        testerList = [];
        // console.log("Flength" + fLength);
        // console.log("HEllo" + dec2bin(2**fLength));
        // console.log("Test" + "7".padStart(10, '0'));
        // * Change stopping condition to 2**fLength when done debugging
        

        for (let i = 0; i < 2**fLength; i++) {
            let tempCourses: ISchedArray[] = [];
            var t: string = dec2bin(i).toString().padStart(fLength, '0');
            for (let j = 0; j < fLength; j++) {
                if (t.charAt(j) == '1') {
                    tempCourses.push(fList[j]);
                    // console.log(tempCourses);
                }
            }

            let poss: boolean = true;

            for (let k = 0; k < tempCourses.length; k++) {
                for (let m = k; m < tempCourses.length; m++) {
                    if (conflict(tempCourses[k], tempCourses[m])) {
                        poss = false;
                    }
                }
            }

            if (poss) {
                intermediateSchedules.push(tempCourses);
                console.log(tempCourses);
            } else {
                // console.log("CONFLICTED SCHEDULE NUMBER " + i);
            }
        }

        let tempMax = 0;
        for (let i = 0; i < intermediateSchedules.length; i++) {
            if (intermediateSchedules[i].length > tempMax) {
                tempMax = intermediateSchedules[i].length;
            }
        }

        for (let i = 0; i < intermediateSchedules.length; i++) {
            if (intermediateSchedules[i].length === tempMax) {
                console.log("YUP")
                console.log(intermediateSchedules[i]);
                // setFinalList([...finalList, intermediateSchedules[i]])
                // setFinalList([...finalList, ...[intermediateSchedules[1]]]);
                // var join = finalList.concat(intermediateSchedules[i]);
                // setFinalList(join);
                testerList.push(intermediateSchedules[i]);
                console.log("UPDATED");
                console.log(testerList);
            }
        }

        console.log("FINAL LIST");
        console.log(testerList);
        setFinalList(testerList);
        setck(testerList.length);

    }

    const conflict = (a: ISchedArray, b: ISchedArray): boolean => {
        if (a.Id === b.Id) {
            return false;
        }
        if (a.Subject === b.Subject) {
            return true;
        }
        
        let conflictDays: boolean = false;
        // ! ERROR ON DAY CHECKER FIX LOGIC
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

        let aTempStart: number = a.StartTime.getHours() * 100 + a.StartTime.getMinutes();
        let aTempEnd: number = a.EndTime.getHours() * 100 + a.EndTime.getMinutes();
        let bTempStart: number = b.StartTime.getHours() * 100 + b.StartTime.getMinutes();
        let bTempEnd: number = b.EndTime.getHours() * 100 + b.EndTime.getMinutes();

        let conflictOne: boolean = (aTempStart <= bTempStart && bTempStart <= aTempEnd);
        let conflictTwo: boolean = (bTempStart <= aTempStart && aTempStart <= bTempEnd);
        let timeConflict: boolean = conflictOne || conflictTwo;
        // console.log("Time" + timeConflict);
        // console.log("Day" + conflictDays);

        return conflictDays && timeConflict;
    }

    const checkFunction = () : void => {
        let checker = conflict(fList[3], fList[7]);
        console.log(checker);
    }



    // Return component
    return (
    <div>                    
        <button className = "leftButton" type = "button" onClick = {prevSchedule}>Left</button>
        <button type = "button" id = "updateCal" onClick = {permute}><i className="fas fa-sync"></i></button>
        <button className = "rightButton" type = "button" onClick = {nextSchedule}>Right</button>
        <button className = "testButton" type = "button" onClick = {checkFunction}>Console</button>
        <h2>Schedule #{scheduleIndex + 1} of {ck}</h2>
        
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