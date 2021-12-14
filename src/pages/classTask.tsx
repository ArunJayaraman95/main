import React from "react"
import { ICourse } from "../interfaces/course"

interface Props {
    course: ICourse;
    removeCourse(keyToRemove: number): void;
}

const ClassTask = ({ course, removeCourse }: Props) => {

    const getDayDisplay = () : string => {
        let tempDisplay: string = "";

        if (!course.days.includes('20211213')) {
            tempDisplay += 'M-';
        }
        if (!course.days.includes('20211214')) {
            tempDisplay += 'T-';
        }
        if (!course.days.includes('20211215')) {
            tempDisplay += 'W-';
        }
        if (!course.days.includes('20211216')) {
            tempDisplay += 'Th-';
        }
        if (!course.days.includes('20211217')) {
            tempDisplay += 'F-';
        }
        return tempDisplay.substring(0, tempDisplay.length - 1);
    }

    return (
        <div className="course">
            <div className="content">
                    <span className = "courseDisplay">{course.courseName}</span>
                    <span className="timings">
                        {course.start} ~ {course.end}
                    </span>
                    <span className = "daysOfWeekDisplay">{getDayDisplay()}</span>
            </div>
            <button onClick = {() => {removeCourse(course.key)}}>Remove</button>
        </div>
    )
}

export default ClassTask