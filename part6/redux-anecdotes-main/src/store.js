import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
    content: anecdoteReducer,
    notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// store.subscribe(() => console.log(store.getState()));

export default store;