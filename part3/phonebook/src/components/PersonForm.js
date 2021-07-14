import React from 'react'

const PersonForm = ({ addPerson, newName, handleAddName, newNumber, handleAddPhone }) => {
    return (
        
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleAddName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleAddPhone}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm