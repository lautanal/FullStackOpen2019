import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import personService from './services/persons'

const ShowPhoneNr = ({ phonenr, deletenr }) => {
  return (
    <li className="phonenr">{phonenr.name} &nbsp;&nbsp; {phonenr.number} &nbsp;&nbsp; <button onClick={deletenr}>Delete</button></li>
  )
}

const AddPhoneNr = (phonebook, addpersonFunc, newname, newnumber, notemsg, errormsg) => {
  let oldnumber = false
  let i = 0
  for (i = 0; i < phonebook.length; i++) {
    if (phonebook[i].name.toLowerCase() === newname.toLowerCase()) {
      oldnumber = true
    }
  }
  if (oldnumber !== true) {
    const personObject = {
      name: newname,
      number: newnumber,
      id: phonebook.length + 1,
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        addpersonFunc(phonebook.concat(returnedPerson))
    })
    notemsg(`${newname} was added to phonebook`)
    setTimeout(() => {
      notemsg(null)
    }, 2000)
  } else {
    errormsg(`${newname} is already added to phonebook`)
    setTimeout(() => {
      errormsg(null)
    }, 5000)
//    alert(`${newname} is already added to phonebook`)
  }
}

const RemovePhoneNr = (phonebook, id, addpersonfunc, notemsg, errormsg) => {
  console.log(`${id} DELETE`)
  const phoneNr = phonebook.find(n => n.id === id)
  personService
    .remove(id, phoneNr.name)
    .then(returnedPhone => {
      addpersonfunc(phonebook.filter(n => n.id !== id))
      notemsg(`${phoneNr.name} was removed from phonebook`)
      setTimeout(() => {
        notemsg(null)
      }, 2000)
    })
    .catch(error => {
      errormsg(`Information of '${phoneNr.name}' has already been deleted from server`)
      setTimeout(() => {
        errormsg(null)
      }, 5000)
      addpersonfunc(phonebook.filter(n => n.id !== id))
    })
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [phonebook, addPerson] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('') 
  const [nameFilter, setNameFilter] = useState('') 
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        addPerson(initialPersons)
      })
  }, [])

    
  const rows = () => phonebookFilter().map(phonenr =>
    <ShowPhoneNr
      key={phonenr.id}
      phonenr={phonenr}
      deletenr={() => handleRemoveNr(phonenr.id)}
    />
  )

//  const phonebookFilter = () => phonebook.filter(o =>Object.keys(o).some(k => o[k].toLowerCase().includes(nameFilter.toLowerCase())))
  const phonebookFilter = () => phonebook

  const handleNewPhoneNr = (event) => {
    event.preventDefault()
    AddPhoneNr(phonebook, addPerson, newName, newNumber, setNotification, setErrorMessage)
    setNewName('')
    setNewNumber('')
  }

  const handleRemoveNr = id => {
    console.log(`${id} DELETE`)
    RemovePhoneNr(phonebook, id, addPerson, setNotification, setErrorMessage)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    console.log(event.target.value)
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Error message={errorMessage} />
      <Notification message={notification} />
      <form>
        <div>
          Filter: <input value={nameFilter} onChange={handleNameFilter} />
        </div>
      </form>   
      <h1>Add a new</h1>
      <form onSubmit={handleNewPhoneNr}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>   
      <h1>Numbers</h1>
      <ul>
        {rows()}
      </ul>
  </div>
  )
}

export default App