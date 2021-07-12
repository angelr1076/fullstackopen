import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ dynamicClass, setDynamicClass ] = useState('');

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
            .then(phoneList => {
                setPersons(persons.concat(phoneList))
                setDynamicClass('success')
                setSuccessMessage(
                  `${personObject.name} has been added to the phonebook`
                )
                setTimeout(() => {
                  setSuccessMessage(null)
                }, 5000)
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
                        .then(updatedResponse => {
                            setPersons(persons.map(person => person.id !== findPerson.id ? person : updatedResponse))
                            setDynamicClass('success')
                            setSuccessMessage(
                              `${personObject.name}'s phone number has been updated`
                            )
                            setTimeout(() => {
                              setSuccessMessage(null)
                            }, 5000)
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
              setDynamicClass('success')
              setSuccessMessage(
                `${filteredPerson.name} has been deleted from the phonebook`
              )
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
            })
            .catch(error => {
              setDynamicClass('error')
              setErrorMessage(
                `Information of ${filteredPerson.name} has already been removed from the server`
              )
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
            })
      }
  }

  const showSearchResults = newSearch
      ? persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
      : persons

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification successMessage={successMessage} errorMessage={errorMessage} dynamicClass={dynamicClass}/>
        <Filter newSearch={newSearch} handleSearch={handleSearchPersons}/>
        <PersonForm addPerson={addPerson} newName={newName} handleAddName={handleAddName} newNumber={newNumber} handleAddPhone={handleAddPhone}/>
      <h2>Numbers</h2>
        <Persons results={showSearchResults} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
