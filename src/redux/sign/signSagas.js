import { call, put } from 'redux-saga/effects'
import signActionKeys from './signActionKeys';
import SignApi from '../apis/signApis';
import { formatAlertMessage } from '../apis/tools';

export function* fetchSigns(action) {
    const result = yield call((deviceId) => {
        return SignApi.fetchSigns(deviceId)
    }, action.deviceId)
    if (result && result.code === 0) {
        yield put({
            type: signActionKeys.fetchSignsSuccess,
            signs: result.result
        })
    } else {
        yield put({
            type: signActionKeys.fetchSignsFailed,
            errorMsg: formatAlertMessage(result.result)
        })
    }
}

export function* fetchSignTemplates(action) {
    const result = yield call(() => {
        return SignApi.fetchSignTemplates()
    })
    if (result && result.code === 0) {
        yield put({
            type: signActionKeys.fetchSignTemplatesSuccess,
            templates: result.result
        })
    } else {
        yield put({
            type: signActionKeys.fetchSignTemplatesSuccess,
            errorMsg: formatAlertMessage(result.result)
        })
    }
}

export function* createSign(action) {

    const result = yield call((deviceId, sign) => {
        return SignApi.createSign(deviceId, sign)
    }, action.deviceId, action.sign)
    if (result && result.code === 0) {
        yield put({
            type: signActionKeys.createSignSuccess,
            sign: result.result
        })
    } else {
        yield put({
            type: signActionKeys.createSignFailed,
            errorMsg: formatAlertMessage(result.result)
        })
    }
}



export function* fetchParts(action) {
    const result = yield call((signId) => {
        return SignApi.fetchParts(signId)
    }, action.signId)
    if (result && result.code === 0) {
        yield put({
            type: signActionKeys.fetchPartsSuccess,
            parts: result.result
        })
    } else {
        yield put({
            type: signActionKeys.fetchPartsFailed,
            errorMsg: formatAlertMessage(result.result)
        })
    }
}

export default { fetchSigns, fetchSignTemplates, createSign, fetchParts };