import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import taskReducer from './Reducers';
import {thunk} from 'redux-thunk';


const rootReducer = combineReducers({taskReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk))