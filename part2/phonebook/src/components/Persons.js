import React from 'react'
import Person from './Person'

const Persons = ({ results, handleDelete }) => {
    return (
        <ul>
            {results.map((person, i) => 
                <Person key={i} person={person} number={person.number}/> 
            )}
        </ul>
    )
}

export default Persons