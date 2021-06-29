import React, { useState } from 'react'

const Text = (props) => {
    return (
        <div>
            <h1>{props.text}</h1>
        </div>
    )
}

const Button = ({ handleClick, text }) => {
    return (
        <button style={{ margin:'5px' }} onClick={handleClick}>
        {text}
        </button>
    )
}

const Anecdote = ({ anecdotes, selected }) => {
    return (
        <div>
            {anecdotes[selected]}
        </div>

    )
}

const PopularAnecdote = ({ anecdotes, highestVotes }) => {
    return (
        <div>
            {anecdotes[highestVotes]}
        </div>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]
   

    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Uint8Array(6))
    const voteLedger = [...points]

    // Generate random number
    const generateRand = () => {
        const max = anecdotes.length
        const random = Math.floor(Math.random() * max)
        return random
    }

    // Select random anecdote
    const handleNext = () => { 
        setSelected(generateRand()) 
  }

    // Vote for anecdote
    const handleVote = () => {
        voteLedger[selected] += 1
        setPoints(voteLedger)
        console.log(voteLedger)
    }

    // Set max votes
    const max = Math.max(...points)
    const mostVotes = points.indexOf(max)
    console.log(max)
    console.log(mostVotes)
    
  return (
    <div>
        <Text text="Anecdote of the day"/>
        <Anecdote anecdotes={anecdotes} selected={selected}/>
        <p>has {voteLedger[selected]} votes</p>
        <Button handleClick={handleVote} text="vote"/>
        <Button handleClick={handleNext} text="next anecdote"/>
        <Text text="Anecdote with most votes"/>
        <PopularAnecdote anecdotes={anecdotes} highestVotes={mostVotes}/>
        <p>has {voteLedger[mostVotes]} votes</p>
    </div>
  )
}

export default App