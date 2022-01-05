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
        <div className="course-item">
            <div className="course-item__info">
                    <span className = "course-item__info__name">{course.courseName}</span>
                    <span className="course-item__info__timings">
                        {course.start} ~ {course.end}
                    </span>
                    <span className = "course-item__info__days">{getDayDisplay()}</span>
            </div>
            <button onClick = {() => {removeCourse(course.key)}}>Remove</button>
        </div>
    )
}

export default ClassTask