import { BooksIcon, UserGraduateIcon } from './Icons';

/* eslint-disable react/prop-types */
const CollegeStats = ({ numberOfStudents, numberOfCourses }) => (
    <div className="college-stats">
        <h2>Statistics</h2>
        <div className="stats">
            <div className="courses">
                <BooksIcon />

                <h2>{numberOfCourses}</h2>
                <p>Courses</p>
            </div>
            <div className="students">
                <UserGraduateIcon />

                <h2>{numberOfStudents}</h2>
                <p>Students</p>
            </div>
        </div>
    </div>
);

export default CollegeStats;
