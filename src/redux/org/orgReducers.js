import Immutable from 'immutable';
import orgActionKeys from './orgActionKeys';
const initialState = Immutable.Map({
    orgs: [],
    addedOrg: null,
    accounts: [],
    addedAccount: null,
    fetching: false,
    errorMsg: ''
})
export default function orgReducer(state = initialState, action) {
    switch (action.type) {
        case orgActionKeys.fetchOrgs:
        case orgActionKeys.fetchAccounts:
        case orgActionKeys.createOrg:
        case orgActionKeys.createAccount:
        case orgActionKeys.updateOrg:
        case orgActionKeys.updateAccount:
        case orgActionKeys.deleteOrg:
        case orgActionKeys.deleteAccount:
            return state.set('fetching', true).set('errorMsg', '');
        case orgActionKeys.createOrgFailed:
        case orgActionKeys.updateOrgFailed:
        case orgActionKeys.deleteOrgFailed:
        case orgActionKeys.createAccountFailed:
        case orgActionKeys.updateAccountFailed:
        case orgActionKeys.deleteAccountFailed:
            return state.set('errorMsg', action.errorMsg).set('fetching', false);
        case orgActionKeys.fetchOrgsSuccess:
            return state.set('orgs', action.orgs).set('errorMsg', '').set('fetching', false);
        case orgActionKeys.createOrgSuccess:
            let orgs = state.get('orgs');
            orgs.unshift(action.org);
            return state.set('errorMsg', '').set('fetching', false).set('addedOrg', action.org).set('orgs', orgs);
        case orgActionKeys.updateOrgSuccess:
            return state.set('errorMsg', '').set('fetching', false).get('orgs').find(o => { if (o.id === action.org.id) return action.org; return o; })
        case orgActionKeys.deleteOrgSuccess:
            return state.set('errorMsg', '').set('fetching', false).get('orgs').find(o => { if (o.id === action.orgId) return null; return o; });

        case orgActionKeys.fetchAccountsSuccess:
            return state.set('accounts', action.accounts).set('errorMsg', '').set('fetching', false);
        case orgActionKeys.createAccountSuccess:
            let accounts = state.get('accounts');
            accounts.unshift(action.account);
            return state.set('errorMsg', '').set('fetching', false).set('addedAccount', action.account).set('accounts', accounts);
        case orgActionKeys.updateAccountSuccess:
            return state.set('errorMsg', '').set('fetching', false).get('accounts').find(o => { if (o.id === action.account.id) return action.account; return o; })
        case orgActionKeys.deleteAccountSuccess:
            return state.set('errorMsg', '').set('fetching', false).get('accounts').find(o => { if (o.id === action.accId) return null; return o; });
        default:
            return state;
    }
}