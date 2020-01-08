import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

// import axios from 'axios'

ReactDOM.render(<App />, document.getElementById('root'))

/*
axios.get('http://localhost:3001/persons').then(response => {
  const persons = response.data
  ReactDOM.render(
    <App phonebook={persons} />,
    document.getElementById('root')
  )
})
*/

/*
ReactDOM.render(
  <App phonebook={persons} />,
  document.getElementById('root')
)
*/
