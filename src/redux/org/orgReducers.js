import Immutable from 'immutable';
import orgActionKeys from './orgActionKeys';
const initialState = Immutable.Map({
    orgs:[],
    accounts:[],
    fetching:false,
    errorMsg:''
})
export default function orgReducer(state = initialState, action){
    switch(action.type){
        case orgActionKeys.fetchOrgs:
        case orgActionKeys.fetchAccounts:
        case orgActionKeys.createOrg:
        case orgActionKeys.createAccount:
        case orgActionKeys.updateOrg:
        case orgActionKeys.updateAccount:
        case orgActionKeys.deleteOrg:
        case orgActionKeys.deleteAccount:
            return state.set('fetching',true);
        case orgActionKeys.createOrgFailed:
        case orgActionKeys.updateOrgFailed:
        case orgActionKeys.deleteOrgFailed:
        case orgActionKeys.createAccountFailed:
        case orgActionKeys.updateAccountFailed:
        case orgActionKeys.deleteAccountFailed:
            state.set('errorMsg',action.errorMsg);
            state.set('fetching',false);
            return state;
        case orgActionKeys.fetchOrgsSuccess:
            return state.set('orgs',action.orgs).set('errorMsg','').set('fetching',false);
        case orgActionKeys.createOrgSuccess:
            state.set('errorMsg','');
            state.set('fetching',false);
            state.get('orgs').unshift(action.org);
            return state;
        case orgActionKeys.updateOrgSuccess:
            state.set('errorMsg','');
            state.set('fetching',false);
            state.get('orgs').find(o=> {if(o.id===action.org.id)return action.org;return o;})
            return state;
        case orgActionKeys.deleteOrgSuccess:
            state.set('errorMsg','');
            state.set('fetching',false);
            state.get('orgs').find(o=> {if(o.id===action.orgId)return null;return o;});
            return state;
        
        case orgActionKeys.fetchAccountsSuccess:
            return state.set('accounts',action.accounts).set('errorMsg','').set('fetching',false);
        case orgActionKeys.createAccountSuccess:
            state.set('errorMsg','');
            state.set('fetching',false);
            state.get('accounts').unshift(action.account);
            return state;
        case orgActionKeys.updateAccountSuccess:
            state.set('errorMsg','');
            state.set('fetching',false);
            state.get('accounts').find(o=> {if(o.id===action.account.id)return action.account;return o;})
            return state;
        case orgActionKeys.deleteAccountSuccess:
            state.set('errorMsg','');
            state.set('fetching',false);
            state.get('accounts').find(o=> {if(o.id===action.accId)return null;return o;});
            return state;
        default :
            return state;
    }
}