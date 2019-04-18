import Immutable from 'immutable';
import userActionKeys from './userActionKeys';
const initialState = Immutable.Map({
    currentUser:null,
    logining:false,
    loginMsg:''
})
export default function userReducer(state = initialState, action){
    switch(action.type){
        case userActionKeys.loginSuccess:
            return state.set('currentUser',action.user)
        case userActionKeys.loginFailed:
            return state.set('loginMsg',action.loginMsg)
        default :
            return state;
    }
}