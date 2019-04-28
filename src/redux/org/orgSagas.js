import {call, put} from 'redux-saga/effects'
import orgActionKeys from './orgActionKeys';
import store from '../create-store';
import OrgApi from '../apis/orgApis';
import { formatAlertMessage } from '../apis/tools';

export function* fetchOrgs(action){
    const result = yield call(()=>{
        return OrgApi.getOrgList();
    })
    if(result && result.code === 0){
        yield put({
            type: orgActionKeys.fetchOrgsSuccess,
            orgs: result.result
        });
        return;
    }
}
export function* fetchAccounts(action){
    const result = yield call((orgId)=>{
        return OrgApi.getAccountsByOrg(orgId);
    },action.orgId);
    if(result && result.code === 0){
        yield put({
            type: orgActionKeys.fetchAccountsSuccess,
            accounts:result.result
        })
    }
}
export function* createOrg(action){

    const result = yield call((org)=>{
        return OrgApi.createOrg(org);
    },action.org);
    if(result && result.code === 0){
        yield put({
            type: orgActionKeys.createOrgSuccess,
            org:result.result
        });
    }else{
        yield put({
            type: orgActionKeys.createOrgFailed,
            errorMsg:result.result
        });
    }
}

export function* updateOrg(action){

    const result = yield call((org)=>{
        return OrgApi.updateOrg(org);
    },action.org);
    if(result && result.code === 0){
        yield put({
            type: orgActionKeys.updateOrgSuccess,
            org:result.result
        });
    }else{
        yield put({
            type: orgActionKeys.updateOrgFailed,
            errorMsg:result.result
        });
    }
}

export function* deleteOrg(action){

    const result = yield call((orgId)=>{
        return OrgApi.deleteOrg(orgId);
    },action.orgId);
    if(result && result.code === 0){
        yield put({
            type: orgActionKeys.deleteOrgSuccess,
            orgId:action.orgId
        });
    }else{
        yield put({
            type: orgActionKeys.deleteOrgFailed,
            errorMsg:result.result
        });
    }
}


export function* createAccount(action){
    
    const result = yield call((action)=>{
        return OrgApi.createAccount(action.orgId, action.account);
    },action);
    if(result && result.code === 0){
        yield put({
            type: orgActionKeys.createAccountSuccess,
            account:result.result
        });
    }else{
        yield put({
            type: orgActionKeys.createAccountFailed,
            errorMsg:result.result
        });
    }
}

export function* updateAccount(action){

    const result = yield call((account)=>{
        return OrgApi.updateAccount(account);
    },action.account);
    if(result && result.code === 0){
        yield put({
            type: orgActionKeys.updateAccountSuccess,
            account:result.result
        });
    }else{
        yield put({
            type: orgActionKeys.updateAccountFailed,
            errorMsg:result.result
        });
    }
}

export function* deleteAccount(action){

    const result = yield call((accId)=>{
        return OrgApi.deleteAccount(accId);
    },action.accId);
    if(result && result.code === 0){
        yield put({
            type: orgActionKeys.deleteAccountSuccess,
            accId:action.accId
        });
    }else{
        yield put({
            type: orgActionKeys.deleteAccountFailed,
            errorMsg:result.result
        });
    }
}

export default{fetchOrgs,fetchAccounts,createOrg,updateOrg,deleteOrg,createAccount,updateAccount,deleteAccount}