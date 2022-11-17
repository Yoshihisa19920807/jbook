import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

// createStore(<reducer>, <initial value>, <middleware or enhancer>)
// middleware adds extra functionalities to dispatch function
export const store = createStore(reducers, {}, applyMiddleware(thunk));
