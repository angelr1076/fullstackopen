import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ANECDOTES':
            return action.data;
        case 'NEW_ANECDOTE':
            return state.concat(action.data);
        case 'VOTE':
            const id = action.data.id;
            const anecdoteUpdate = state.find(anecdote => anecdote.id === id);
            const changedAnecdote = {
                ...anecdoteUpdate,
                votes: anecdoteUpdate.votes + 1,
            };
            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : changedAnecdote
            );
        default:
            return state;
    }
};

export const upvoteAnecdote = anecdote => {
    return async dispatch => {
        const vote = await anecdoteService.update({
            ...anecdote,
            votes: anecdote.votes + 1,
        });
        dispatch({
            type: 'VOTE',
            data: vote,
        });
    };
};

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote,
        });
    };
};

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll();
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        });
    };
};

export default anecdoteReducer;