import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch ] = useState('')

  const addPerson = event => {
      event.preventDefault()

      const personObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1
      }

      // Deconstruct and get name from the person object
      const { name } = personObject
      const personExists = persons.find(person => person.name.toLowerCase() === name.toLowerCase())

      if (!personExists) {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      } else {
        alert(`${name} already exists`)
        setNewName('')
        setNewNumber('')
      }
  }

  const handlePersonChange = event => {
      setNewName(event.target.value)
  }

  const handleNumberChange = event => {
      setNewNumber(event.target.value)
  }

  const handleSearchPersons = event => {
      console.log(event.target.value)
      setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>filter shown with <input onChange={handleSearchPersons}/></p>
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: 
            <input 
                value={newName}
                onChange={handlePersonChange}  
            />
        </div>
        <div>
          number: 
            <input 
                value={newNumber}
                onChange={handleNumberChange}  
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{ listStyleType: 'none' }}>
        {persons.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
      </ul>
        
    </div>
  )
}

export default App
