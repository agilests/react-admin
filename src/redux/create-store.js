import {createStore, applyMiddleware} from 'redux'
import {combineReducers} from 'redux-immutable'
import Immutable from 'immutable'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import userReducer from './user/userReducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({collapsed: true});
const rootReducer = combineReducers({
  userReducer
});
const finalCreateStore = applyMiddleware(sagaMiddleware)(createStore);
const initialState = Immutable.Map();
const store = finalCreateStore(rootReducer, initialState);
sagaMiddleware.run(rootSaga);

export default store;