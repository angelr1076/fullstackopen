const anecdoteReducer = (state = [], action) => {
  console.log('action', action.type, 'state', state);
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state.concat(action.data)];
    case 'INIT_ANECDOTES':
      return action.data;
    case 'VOTE':
      const id = action.data.id;
      const anecdoteUpdate = state.find(anecdote => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteUpdate,
        votes: anecdoteUpdate.votes + 1,
      };
      return state
        .map(anecdote => (anecdote.id !== id ? anecdote : changedAnecdote))
        .sort((a, b) => b.votes > a.votes);
    default:
      return state;
  }
};

export const upvoteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const createAnecdote = content => {
  return {
    type: 'NEW_ANECDOTE',
    data: content,
  };
};

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  };
};

export default anecdoteReducer;
