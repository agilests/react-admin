import { call, put } from 'redux-saga/effects'
import orgActionKeys from './orgActionKeys';
import OrgApi from '../apis/orgApis';
import { formatAlertMessage } from '../apis/tools';
import { formatResultsErrors } from 'jest-message-util';

export function* fetchOrgs(action) {
    const result = yield call(() => {
        return OrgApi.getOrgList();
    })
    if (result && result.code === 0) {
        yield put({
            type: orgActionKeys.fetchOrgsSuccess,
            orgs: result.result
        });
        return;
    } else {
        yield put({
            type: orgActionKeys.fetchOrgsFailed,
            errorMsg: formatAlertMessage(result.result)
        });

    }
}

export function* fetchOrgSetting(action) {
    const result = yield call((orgId) => {
        return OrgApi.getSetting(orgId);
    }, action.orgId);

    if (result && result.code === 0) {
        yield put({
            type: orgActionKeys.fetchOrgSettingSuccess,
            setting: result.result
        });
        return;
    } else {
        yield put({
            type: orgActionKeys.fetchOrgSettingFailed,
            errorMsg: formatAlertMessage(result.result)
        });

    }
}

export function* updateSetting(action) {
    const result = yield call((orgId, value) => {
        return OrgApi.updateSetting(orgId, value)
    }, action.orgId, action.value);

    if (result && formatResultsErrors.code === 0) {
        yield put({
            type: orgActionKeys.updateOrgSettingSuccess,
            setting: result.result
        })
    } else {
        yield put({
            type: orgActionKeys.updateOrgSettingFailed,
            errorMsg: formatAlertMessage(result.result)
        })
    }
}
export function* fetchAccounts(action) {
    const result = yield call((orgId) => {
        return OrgApi.getAccountsByOrg(orgId);
    }, action.orgId);
    if (result && result.code === 0) {
        yield put({
            type: orgActionKeys.fetchAccountsSuccess,
            accounts: result.result
        })
    } else {
        yield put({
            type: orgActionKeys.fetchAccountsFailed,
            errorMsg: formatAlertMessage(result.result)
        });

    }
}
export function* createOrg(action) {

    const result = yield call((org) => {
        return OrgApi.createOrg(org);
    }, action.org);
    if (result && result.code === 0) {
        yield put({
            type: orgActionKeys.createOrgSuccess,
            org: result.result
        });
    } else {
        yield put({
            type: orgActionKeys.createOrgFailed,
            errorMsg: formatAlertMessage(result.result)
        });
    }
}

export function* updateOrg(action) {

    const result = yield call((org) => {
        return OrgApi.updateOrg(org);
    }, action.org);
    if (result && result.code === 0) {
        yield put({
            type: orgActionKeys.updateOrgSuccess,
            org: result.result
        });
    } else {
        yield put({
            type: orgActionKeys.updateOrgFailed,
            errorMsg: formatAlertMessage(result.result)
        });
    }
}

export function* deleteOrg(action) {

    const result = yield call((orgId) => {
        return OrgApi.deleteOrg(orgId);
    }, action.orgId);
    if (result && result.code === 0) {
        yield put({
            type: orgActionKeys.deleteOrgSuccess,
            orgId: action.orgId
        });
    } else {
        yield put({
            type: orgActionKeys.deleteOrgFailed,
            errorMsg: formatAlertMessage(result.result)
        });
    }
}


export function* createAccount(action) {

    const result = yield call((action) => {
        return OrgApi.createAccount(action.orgId, action.account);
    }, action);
    if (result && result.code === 0) {
        yield put({
            type: orgActionKeys.createAccountSuccess,
            account: result.result
        });
    } else {
        yield put({
            type: orgActionKeys.createAccountFailed,
            errorMsg: formatAlertMessage(result.result)
        });
    }
}

export function* updateAccount(action) {

    const result = yield call((account) => {
        return OrgApi.updateAccount(account);
    }, action.account);
    if (result && result.code === 0) {
        yield put({
            type: orgActionKeys.updateAccountSuccess,
            account: result.result
        });
    } else {
        yield put({
            type: orgActionKeys.updateAccountFailed,
            errorMsg: formatAlertMessage(result.result)
        });
    }
}

export function* deleteAccount(action) {

    const result = yield call((accId) => {
        return OrgApi.deleteAccount(accId);
    }, action.accId);
    if (result && result.code === 0) {
        yield put({
            type: orgActionKeys.deleteAccountSuccess,
            accId: action.accId
        });
    } else {
        yield put({
            type: orgActionKeys.deleteAccountFailed,
            errorMsg: formatAlertMessage(result.result)
        });
    }
}

export default { fetchOrgs, fetchOrgSetting, updateSetting, fetchAccounts, createOrg, updateOrg, deleteOrg, createAccount, updateAccount, deleteAccount }