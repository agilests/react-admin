import { call, put } from 'redux-saga/effects'
import resActionKeys from './resActionKeys';
import ResourceApi from '../apis/ResourceApis';
import { formatAlertMessage } from '../apis/tools';

export function* fetchVoices(action) {
    const result = yield call((orgId) => {
        return ResourceApi.fetchVoices(orgId);
    }, action.orgId)
    if (result && result.code === 0) {
        yield put({
            type: resActionKeys.fetchVoicesSuccess,
            voices: result.result
        });
    } else {
        yield put({
            type: resActionKeys.fetchVoicesFailed,
            errorMsg: formatAlertMessage(result.result)
        })
    }
}

export function* upload(action) {
    const result = yield call((action) => {
        return ResourceApi.upload(action.formData);
    }, action);
    if (result && result.code === 0) {
        yield put({
            type: resActionKeys.uploadSuccess,
            resource: result.result
        })

    } else {
        yield put({
            type: resActionKeys.uploadFailed,
            errorMsg: formatAlertMessage(result.result)
        })
    }

}
export default { fetchVoices, upload }