
import NetUtil from './net_utils';
export default class UserApi{
    static login(account){
        return NetUtil.post('/login',account);
    }
    static fetchCurrentUser(){
        return NetUtil.get(`/api/account`);
    }
}