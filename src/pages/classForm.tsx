import React, { ChangeEvent, useState} from "react";
import "./classForm.css";
import {ICourse} from "../interfaces/course"
import ClassTask from "./classTask";
import Scheduler from "./scheduler";

// ! NPM RUN DEPLOY SETUP SOON

function ClassForm() {

    // State for counting classes add. Helps with unique deletion
    const [counter, setCounter] = useState<number>(0);
    
    // * Consider renaming? This is for the section/course name
    const [section, setSection] = useState<string>("");
    // Time States
    const [start, setStart] = useState<string>("");
    const [sHour, setSHour] = useState<number>(0);
    const [sMin, setSMin] = useState<number>(0);

    const [end, setEnd] = useState<string>("");
    const [eHour, setEHour] = useState<number>(0);
    const [eMin, setEMin] = useState<number>(0);
    // State for array of courses
    const [courseList, setCourseList] = useState<ICourse[]>([]);
    const [days, setDays] = useState<boolean[]>([false, false, false, false, false]);


    // Updates time and name state on change
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        let t = event.target.value;
                
        if (event.target.name === "cName") {
            setSection(t);
        } else if (event.target.name === "sTime") {
            setStart(t);
            setSHour(Number(t.substring(0,2)));
            setSMin(Number(t.substring(3,5)));
        } else if (event.target.name === "eTime") {
            setEnd(t);
            setEHour(Number(t.substring(0,2)));
            setEMin(Number(t.substring(3,5)));
        }

        console.log(days);
    };

    const handleCheckboxes = (position: number): void => {
        const updatedCheckedState = days.map((item, index) =>
            index === position ? !item : item
        );
        setDays(updatedCheckedState);
        console.log(updatedCheckedState); //logging 'days' lags by 1
    }

    // TODO: Add validation for times
    // ! Fix checkboxes

    // Actually pushes a new class into CourseList
    const addSection = (): void => {

        // String for recurrence exclusion. Repeat everyday across the week but Sun/Sat. For other days, if unchecked add an exception so event doesn't show up on calendar
        let x: string = "20211212,20211218";
        if (days[0] === false) {
            x += ",20211213"
        } 
        if (days[1] === false) {
            x += ",20211214"
        } 
        if (days[2] === false) {
            x += ",20211215"
        } 
        if (days[3] === false) {
            x += ",20211216"
        } 
        if (days[4] === false) {
            x += ",20211217"
        }

        //Create new object
        const newCourse = {
            courseName: section,
            start: start,
            end: end,
            sHour: sHour,
            sMin: sMin,
            eHour: eHour,
            eMin: eMin,
            key: counter, // * Note key in this case is just the count. It never decrements to maintain uniqueness
            days: x
        }
        
        // Increment counter and append new course
        setCounter(counter + 1);
        setCourseList([...courseList, newCourse]);

        // Reset values, don't reset checkboxes
        setSection("");
        setStart("");
        setEnd("");
        
    }

    // Removes a course from array by checking key/counter
    const removeCourse = (keyToRemove: number): void => {
        setCourseList(courseList.filter((course) => {
            return course.key !== keyToRemove;
        }))

    }


    // TODO: Add day options
    return (
        <div className = "schedule-page">
                <Scheduler className = "scheduler" courseListings = {courseList}></Scheduler>
                <div className="input-section">
                    <div className = "input-section__elements">
                        <div className = "input-section__title">
                            <span>A</span>
                            <span>D</span>
                            <span>D</span>
                            <span>&nbsp;</span>
                            <span>S</span>
                            <span>E</span>
                            <span>C</span>
                            <span>T</span>
                            <span>I</span>
                            <span>O</span>
                            <span>N</span>
                            <span>S</span>
                        </div>
                        <a href = "/">Home Page</a>
                        <form action="">
                            <div className = "input-section__class-input">
                                <label>Class Name:</label>
                                <input 
                                    className = "input-section__inputs" 
                                    // type="text" 
                                    id = "cName" 
                                    name = "cName" 
                                    value = {section} 
                                    placeholder= "Course Name"
                                    onChange = {handleChange}
                                    required/>
                                <br/>
                            </div>
    
                            <div className = "input-section__time-inputs">
                                <label>Start Time:</label>
                                <input 
                                    className = "input-section__inputs" 
                                    type="time" 
                                    id = "sTime" 
                                    name = "sTime" 
                                    value = {start} 
                                    onChange = {handleChange} 
                                    required/>
                                <br/>
        
                                <label>End Time:</label>
                                <input 
                                    className = "input-section__inputs"  
                                    type="time" 
                                    id="eTime" 
                                    name="eTime" 
                                    value = {end} 
                                    onChange = {handleChange} 
                                    required/>
                                <br/>
                            </div>

                            <div className = "input-section__check-submit">
                                <div className="input_section__checkboxes">
                                    <input 
                                        onChange = {() => handleCheckboxes(0)} 
                                        type = "checkbox" 
                                        name = "daysOfWeek" 
                                        value = "Mon"
                                    /><label>M</label>
                                    <input 
                                        onChange = {() => handleCheckboxes(1)} 
                                        type = "checkbox" 
                                        name = "daysOfWeek" 
                                        value = "Tue"
                                    /><label>T</label>
                                    <input 
                                        onChange = {() => handleCheckboxes(2)} 
                                        type = "checkbox" 
                                        name = "daysOfWeek" 
                                        value = "Wed"
                                    /><label>W</label>
                                    <input 
                                        onChange = {() => handleCheckboxes(3)} 
                                        type = "checkbox" 
                                        name = "daysOfWeek" 
                                        value = "Thu"
                                    /><label>T</label>
                                    <input 
                                        onChange = {() => handleCheckboxes(4)} 
                                        type = "checkbox" 
                                        name = "daysOfWeek" 
                                        value = "Fri"
                                    /><label>F</label>
        
        
                                </div>
        
        
                                <div className = "add-section-button">
                                    <button type = "button" className = "input-section__submit-button" onClick={addSection}>Add Section</button>
                                </div>
                            </div>

                        </form>
                        <div className="courseList">
                            <div id = "courseList__title"><h3>Section List</h3></div>
                            {courseList.map((course: ICourse, key: number) => {
                                return <ClassTask course = {course} key = {key} removeCourse = {removeCourse} />;
                            })}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ClassForm