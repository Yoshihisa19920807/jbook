import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
// Test
import { ActionTypes } from './action-types';

// createStore(<reducer>, <initial value>, <middleware or enhancer>)
// middleware adds extra functionalities to dispatch function
// export const store = createStore(reducers, {}, applyMiddleware(thunk));

import { composeWithDevTools } from 'redux-devtools-extension';
import * as actionCreators from './action-creators';

const composeEnhancers = composeWithDevTools({ actionCreators });

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

// // Test
// store.dispatch({
//   type: ActionTypes.INSERT_CELL_BEFORE,
//   payload: {
//     id: Math.random().toString(),
//     type: 'code',
//   },
// });

// store.dispatch({
//   type: ActionTypes.INSERT_CELL_BEFORE,
//   payload: {
//     id: null,
//     type: 'text',
//   },
// });

// const order_id = store.getState().cells.order[1];

// store.dispatch({
//   type: ActionTypes.INSERT_CELL_BEFORE,
//   payload: {
//     id: order_id,
//     type: 'code',
//   },
// });

// store.dispatch({
//   type: ActionTypes.MOVE_CELL,
//   payload: {
//     id: order_id,
//     direction: 'up',
//   },
// });

// store.dispatch({
//   type: ActionTypes.UPDATE_CELL,
//   payload: {
//     id: order_id,
//     content: 'updated',
//   },
// });

// store.dispatch({
//   type: ActionTypes.DELETE_CELL,
//   payload: {
//     id: order_id,
//   },
// });

console.log(store.getState());
