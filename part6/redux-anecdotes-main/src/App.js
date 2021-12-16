import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upvoteAnecdote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = () => {
  

  const vote = id => {
    console.log('vote', id);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
