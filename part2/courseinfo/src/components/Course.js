import React from 'react';

    const Total = ({ course }) => {
        const sum = course.parts.reduce((acc, curr) =>  acc + curr.exercises, 0)

        return(
            <h3>total of {sum} exercises</h3>
        ) 
    }

    const Part = ({ part }) => {
        return (
            <div>
                <p>{part.name} {part.exercises}</p>
            </div>
        )
    }

    const Content = ({ course }) => {
        return (
            <div>
                {course.parts.map(part => 
                    <Part key={part.id} part={part} />
                )}
                <Total course={course}/>
            </div>
        )
    }

    const Header = ({ course }) => {
        return (
            <div>
                <h2>{course.name}</h2>
                <Content course={course}/>
            </div>
        )
    }

    const Course = ({ courses }) => {
        return (
            <div>
                <h1><b>Web Development Curricumlum</b></h1>
                {courses.map(course => 
                    <Header key={course.id} course={course}/>
                )}
            </div>
        )
    }
 
  export default Course;