import React from 'react';

const Person = ({ person, handleDeletePerson }) => {
    return (
        <li className='person'>
            {person.name} {person.number}
            <button onClick={handleDeletePerson}>Delete</button>
        </li>
    )
}

export default Person;