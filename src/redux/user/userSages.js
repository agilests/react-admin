import {call, put} from 'redux-saga/effects'
import userActionKeys from './userActionKeys';
import store from '../create-store';

export function* login({user}){
    if(user.username!=='admin' && user.password!=='admin'){
        yield put({
            type:userActionKeys.loginFailed,
            loginMsg:'用户名密码错误'
        })
    }
    yield put({
        type:userActionKeys.loginSuccess,
        user:user
    })
}

export default{login}