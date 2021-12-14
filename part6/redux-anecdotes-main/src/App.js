import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upvoteAnecdote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const vote = id => {
    console.log('vote', id);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(upvoteAnecdote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
      
      <AnecdoteForm />
    </div>
  );
};

export default App;
