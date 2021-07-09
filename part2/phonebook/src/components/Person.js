import React from 'react';

const Person = ({ person, handleDelete }) => {
    return (
        <li>
            {person.name} {person.number}
        </li>
    )
}

export default Person;