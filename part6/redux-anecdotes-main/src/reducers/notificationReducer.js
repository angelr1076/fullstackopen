const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data;
        case 'CLEAR_NOTIFICATION':
            return null;
        default:
            return state;
    }
};

export const showNotification = notification => {
    return {
        type: 'SET_NOTIFICATION',
        data: notification,
    };
};

export default notificationReducer;