import {call, put} from 'redux-saga/effects'
import userActionKeys from './userActionKeys';
import store from '../create-store';
import UserApi from '../apis/userApis';
import { formatAlertMessage } from '../apis/tools';

export function* login(action){
    try{
        const result = yield call((user)=>{
            return UserApi.login(user);
        },action.user);
        if(result){
            const account = yield call((username) => {
                return UserApi.fetchCurrentUser(username)
            },action.user.username);
            if(account && account.code===0){
                yield put({
                    type:userActionKeys.loginSuccess,
                    user:account
                })
                return;
            }
        }
    }catch(e){
        console.log(e);
        debugger;
        yield put({
            type:userActionKeys.loginFailed,
            loginMsg:formatAlertMessage(e)
        })
    }
}

export default{login}