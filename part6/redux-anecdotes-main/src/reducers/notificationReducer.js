import anecdoteService from '../services/anecdotes';

const notificationReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ANECDOTES':
            return action.data;
        case 'CLEAR_NOTIFICATION':
            return null;
        default:
            return state;
    }
};

export const hideNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION',
        notification: null,
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

export default notificationReducer;