import React from 'react'

export const Header1 = props =>
  <h1>{props.title}</h1>

const Header2 = props =>
  <h2>{props.title}</h2>

const Total = props => {
  let total = 0
  props.parts.forEach(part => {
    total = total + part.exercises  
  })

  return <p>yhteensä {total} tehtävää</p>
}
  
const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Content = props => {
  const { parts } = props

  const rows = () => parts.map((part, i) => 
    <Part key={i} part={part} />
  )

  return (
    <div>
      {rows()}
    </div>
  )
}

export const Course = props => (
  <div>
    <Header2 title={props.course.name} />
    <Content parts={props.course.parts} />
    <Total parts={props.course.parts} />
  </div>
)

// export default Course