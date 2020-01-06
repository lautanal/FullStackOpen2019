import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
//  console.log(props)
    return (
      <div>
        <h1>
            {props.title}
        </h1>
      </div>
    )
}

const Statistics = (props) => {
  const g = props.points[0].count
  const n = props.points[1].count
  const b = props.points[2].count
  if ((g+n+b) > 0) {
    return (
      <div>
        <table>
          <tbody>
          <Statistic grade={props.points[0].grade} count={g} unit='' />
          <Statistic grade={props.points[1].grade} count={n} unit='' />
          <Statistic grade={props.points[2].grade} count={b} unit='' />
          <Statistic grade='all' count={g + n + b} unit='' />
          <Statistic grade='average' count={(g-b)/(g + n + b)} unit='' />
          <Statistic grade='positive' count={100*g/(g + n + b)} unit='%'/>
          </tbody>
        </table>
      </div>
    )
  } else {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const Statistic = (props) => {
  return (
    <tr>
      <td width="80">{props.grade}</td><td>{props.count}</td><td>{props.unit}</td>
    </tr>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const results = {
    title: 'statistics',
    points: [
      {
        grade: 'good',
        count: good
      },
      {
        grade: 'neutral',
        count: neutral
      },
      {
        grade: 'bad',
        count: bad
      }
    ]
  }

  const goodClick = () => {
    console.log('good clicked')
    setGood(good + 1)
  }

  const neutralClick = () => {
    console.log('neutral clicked')
    setNeutral(neutral + 1)
 }

  const badClick = () => {
    console.log('bad clicked')
    setBad(bad + 1)
  }

  return (
    <div>
      <Header title='give feedback' />
      <Button onClick={() => goodClick()} text='good' />
      <Button onClick={() => neutralClick()} text='neutral' />
      <Button onClick={() => badClick()} text='bad' />
      <Header title='statistics' />
      <Statistics points={results.points} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
