/* eslint-disable react/prop-types */
import { Tag } from 'antd';

import CollegeStats from './CollegeStats';
import { CalendarIcon, MapPinIcon } from './Icons';

const CollegeInfo = ({ college }) => (
    <div className="college-info">
        <h1>{college.name}</h1>
        <p className="location">
            <MapPinIcon />

            <span>
                {college.city}
                ,
                {' '}
                {college.country}
            </span>
        </p>

        <p className="year">
            <CalendarIcon />

            <span>
                {college.yearFounded}
            </span>
        </p>

        <CollegeStats
            numberOfStudents={college.numberOfStudents}
            numberOfCourses={college.courses.length}
        />

        <h2>Courses</h2>

        <div className="courses-list">
            {college.courses.map((course) => (
                <Tag key={course}>{course}</Tag>
            ))}
        </div>
    </div>
);

export default CollegeInfo;
