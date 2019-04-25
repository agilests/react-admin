
import NetUtil from './net_utils';
export default class UserApi{
    static login(account){
        return NetUtil.post('/login',account);
    }
    static fetchCurrentUser(account){
        return NetUtil.get(`/api/account?account=${account}`);
    }
}