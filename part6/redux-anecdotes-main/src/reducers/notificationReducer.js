const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.notification;
        case 'CLEAR_NOTIFICATION':
            return action.notification;
        default:
            return state;
    }
};

export const setNotification = (notification, duration) => {
    return async dispatch => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            notification,
        });

        setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION',
                notification: null,
            });
        }, duration * 1000);
    };
};

export default notificationReducer;