import {call, put} from 'redux-saga/effects'
import userActionKeys from './userActionKeys';
import UserApi from '../apis/userApis';
import { formatAlertMessage } from '../apis/tools';

export function* login(action){
    try{
        const result = yield call((user)=>{
            return UserApi.login(user);
        },action.user);
        if(result && result.code===0){
            const account = yield call(() => {
                return UserApi.fetchCurrentUser()
            });
            if(account && account.code===0){
                yield put({
                    type:userActionKeys.loginSuccess,
                    user:account.result
                })
                return;
            }
        }else{
            yield put({
                type:userActionKeys.loginFailed,
                loginMsg:formatAlertMessage(result.result)
            })
        }
    }catch(e){
        console.log(e);
        yield put({
            type:userActionKeys.loginFailed,
            loginMsg:formatAlertMessage(e)
        })
    }
}
export function* logout(){
    yield call(()=>{
        return UserApi.logout();
    })
}

export default{login,logout}