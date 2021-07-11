import React from 'react'
import Person from './Person'

const Persons = ({ results, handleDelete }) => {
    return (
        <ul>
            {results.map((person, i) => 
                <Person key={i} id={i} person={person} number={person.number} handleDeletePerson={() => handleDelete(person.id)}/> 
            )}
        </ul>
    )
}

export default Persons