import React from 'react'
import ReactDOM from 'react-dom'
import {Course, Header1} from './components/Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const rows = () => courses.map((course, i) => 
    <Course key={i} course={course} />
  )


  return (
    <div>
      <Header1 title="Web development curriculum" />
      {rows()}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)