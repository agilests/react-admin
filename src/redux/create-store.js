import {createStore, applyMiddleware} from 'redux'
import {combineReducers} from 'redux-immutable'
import Immutable from 'immutable'
import createSagaMiddleware from 'redux-saga';
import userReducer from './user/userReducers';
import orgReducer from './org/orgReducers';
import deviceReducer from './devices/deviceReducers';
import lineReducer from './lines/lineReducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  userReducer,
  orgReducer,
  deviceReducer,
  lineReducer
});
const finalCreateStore = applyMiddleware(sagaMiddleware)(createStore);
const initialState = Immutable.Map();
const store = finalCreateStore(rootReducer, initialState);
sagaMiddleware.run(rootSaga);

export default store;
