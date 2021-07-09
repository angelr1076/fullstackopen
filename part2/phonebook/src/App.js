import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
}

useEffect(hook, [])

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

  const handleAddName = event => {
      const name = event.target.value
      setNewName(name)
  }

  const handleAddPhone = event => {
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
        <PersonForm addPerson={addPerson} newName={newName} handleAddName={handleAddName} newNumber={newNumber} handleAddPhone={handleAddPhone}/>
      <h2>Numbers</h2>
        <Persons results={showSearchResults} />
    </div>
  )
}

export default App
