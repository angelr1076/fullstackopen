import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upvoteAnecdote } from '../reducers/anecdoteReducer';
import {
  initializeAnecdotes,
  hideNotification,
} from '../reducers/notificationReducer';

const Anecdotes = () => {
  const anecdotes = useSelector(state => state.content);
  const dispatch = useDispatch();
  const vote = id => dispatch(upvoteAnecdote(id));

  const showAnecdoteNotif = content => {
    dispatch(initializeAnecdotes(content));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  return (
    <ul>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            <button
              onClick={() => {
                vote(anecdote.id);
                showAnecdoteNotif(anecdote.content);
              }}
            >
              vote
            </button>{' '}
            has {anecdote.votes} votes
          </div>
          <hr />
        </div>
      ))}
    </ul>
  );
};

export default Anecdotes;
