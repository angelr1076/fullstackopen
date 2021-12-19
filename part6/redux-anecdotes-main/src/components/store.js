import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers } from 'redux';
import anecdoteReducer from '../reducers/anecdoteReducer';
import notificationReducer from '../reducers/notificationReducer';

const reducer = combineReducers({
  content: anecdoteReducer,
  notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools());
store.subscribe(() => console.log(store.getState()));

export default store;
