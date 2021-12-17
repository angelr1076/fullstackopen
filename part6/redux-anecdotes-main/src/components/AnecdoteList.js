import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upvoteAnecdote } from '../reducers/anecdoteReducer';

const Upvote = ({ anecdote, handleClick }) => {
  return (
    <div>
      {anecdote.content}
      <br /> has {anecdote.votes} votes{' '}
      <button onClick={handleClick}>vote</button>
      <hr />
    </div>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector(state => state.content);
  const dispatch = useDispatch();

  return (
    <ul>
      {anecdotes.map(anecdote => (
        <Upvote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(upvoteAnecdote(anecdote.id))}
        />
      ))}
    </ul>
  );
};

export default Anecdotes;
