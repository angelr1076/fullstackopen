import React, { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

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
      const name = event.target.value
      setNewName(name)
  }

  const handleNumberChange = event => {
      const phone = event.target.value
      setNewNumber(phone)
  }

  const handleSearchPersons = event => {
      const search = event.target.value
      setNewSearch(search)
  }

  const showSearchResults = newSearch
      ? persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
      : persons

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter newSearch={newSearch} handleSearch={handleSearchPersons}/>
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
      <Persons results={showSearchResults} />
    </div>
  )
}

export default App
