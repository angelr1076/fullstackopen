const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification;
        case 'CLEAR_NOTIFICATION':
            return null;
        default:
            return state;
    }
};

export const showNotification = notification => {
    return {
        type: 'SET_NOTIFICATION',
        notification,
    };
};

export const hideNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION',
        notification: null,
    };
};

export default notificationReducer;