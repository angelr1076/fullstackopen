import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personServices from './services/persons'
// import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const hook = () => {
  personServices
    .getAll()
    .then(initialPeople => {
      setPersons(initialPeople)
    })
}
useEffect(hook, [])

  const addPerson = event => {
      event.preventDefault()

      const personObject = {
          name: newName,
          number: newNumber,
      }
    // Deconstruct and get name from the person object
      const { name } = personObject
      const personExists = persons.find(person => person.name.toLowerCase() === name.toLowerCase())
      
      if (!personExists) {
        personServices
            .create(personObject)
            .then(returnedList => {
                setPersons(persons.concat(returnedList))
                setNewName('')
                setNewNumber('')
            })
            } else {
                const findPerson = persons.find(person => person.id === personExists.id)
                // Create shallow copy of personObject
                const updatedPerson = { ...personObject, id: findPerson.id}
                if (window.confirm(`${updatedPerson.name} is already added to phonebook, replace the old number with a new`)) {
                    personServices
                        .update(findPerson.id, updatedPerson)
                        .then(serverResponse => {
                            setPersons(persons.map(person => person.id !== findPerson.id ? person : serverResponse))
                            setNewName('')
                            setNewNumber('')
                        })
                        .catch(error => {
                            console.log('Error: ', error)
                        })
                }
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

  const handleDelete = id => {
      const filteredPerson = persons.find(person => person.id === id)

      if (window.confirm(`Delete ${filteredPerson.name}?`)) {
          personServices
            .remove(id)
            .then(deletedPerson => {
              setPersons(persons.filter(person => person.id !== filteredPerson.id))
            })
            .catch(error => {
              console.log('Error: ', error)
            })
      }
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
        <Persons results={showSearchResults} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
