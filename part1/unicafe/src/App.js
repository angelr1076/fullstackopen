import React, { useState } from 'react'

const Text = ({ text }) => {
    return (
        <>
            <h1>{text}</h1>
        </>
    )
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick} style={{ margin:"5px" }}>
            {text}
        </button>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <tbody>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </tbody>
    )
}

const History = ({ trackClicks, surveyData }) => {
    const { good, neutral, bad } = surveyData
    if (trackClicks.length === 0) {
        return (
            <>
                <p>No feedback given.</p>
            </>
        )
    }
    return (
        <>
            <Statistics surveyData={{ good, neutral, bad}}/>
        </>
        
    )
}

const Statistics = ({ surveyData }) => {
    const { good, neutral, bad } = surveyData
    const total = good + neutral + bad
    const average = (good + neutral + bad) / 3 || 0
    const fixedAverage = average.toFixed(1)
    const percentPositive = (good / total) * 100 || 0
    const fixedPercent = percentPositive.toFixed(1)

    return (
        <table>
            <Statistic text="good" value={good}/>
            <Statistic text="neutral" value={neutral}/>
            <Statistic text="bad" value={bad}/>
            <Statistic text="total" value={total}/>
            <Statistic text="average" value={fixedAverage}/>
            <Statistic text="positive" value={fixedPercent}/>
        </table>
    )
}

const App = () => {
    const headers = {
        feedback: 'give feedback',
        stats: 'statistics'
    }

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [trackClicks, setAll] = useState([])

  const handleGoodClick = () => { 
      setGood(good + 1) 
      setAll(trackClicks.concat('good'))
  }
  const handleNeutralClick = () => {
      setNeutral(neutral + 1)
      setAll(trackClicks.concat('neutral'))
  }
  
  const handleBadClick = () => {
      setBad(bad + 1)
      setAll(trackClicks.concat('bad'))
  }
  
  return (
    <>
        <Text text={headers.feedback} />

        <Button handleClick={handleGoodClick}  text="good"/>
        <Button handleClick={handleNeutralClick} text="neutral"/>
        <Button handleClick={handleBadClick} text="bad"/>

        <Text text={headers.stats} />

        <History trackClicks={trackClicks} surveyData={{ good, bad, neutral }}/>
    </>
  )
}

export default App