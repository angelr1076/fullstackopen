import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
      { name: 'Arto Hellas', id: 0 }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = event => {
      event.preventDefault()

      const personObject = {
          name: newName,
          id: persons.length + 1
      }

      // Deconstruct and get name from the person object
      const { name } = personObject
      const personExists = persons.filter(person => person.name.toLowerCase() === name.toLowerCase())
      
      if (personExists.length < 1) {
        setPersons(persons.concat(personObject))
        setNewName('')
      } else {
        alert(`${name} already exists`)
        setNewName('')
      }
  }

  const handlePersonChange = event => {
      setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
            <input 
                value={newName}
                onChange={handlePersonChange}  
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{ listStyleType: 'none' }}>
        {persons.map(person => <li key={person.id}>{person.name}</li>)}
      </ul>
        
    </div>
  )
}

export default App
