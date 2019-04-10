import createConnect from 'redux-connect-standalone';
import store from './redux/create-store';

export const connect = createConnect(store);