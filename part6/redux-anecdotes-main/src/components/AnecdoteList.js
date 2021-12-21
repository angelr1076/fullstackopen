import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upvoteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const voteHandler = () => {
    dispatch(upvoteAnecdote(anecdote));
    dispatch(setNotification(`Added '${anecdote.content}' successfully`, 10))
  };

  return (
    <div>
    <br/>
      <div>{anecdote.content}</div>
      <div>
        has <b>{anecdote.votes}</b> votes {' '}
        <button onClick={voteHandler}>vote</button>
      </div>
      <hr/>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.content);
  const sortByVotes = (a, b) => b.votes - a.votes;

  return anecdotes
    .sort(sortByVotes)
    .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />);
};

export default AnecdoteList;
