import { call, put } from 'redux-saga/effects'
import resActionKeys from './resActionKeys';
import ResourceApi from '../apis/ResourceApis';

export function* fetchVoices(action) {
    const result = yield call(() => {
        return ResourceApi.fetchVoices();
    })
    if (result && result.code === 0) {
        yield put({
            type: resActionKeys.fetchVoicesSuccess,
            voices: result.result
        });
        return;
    }
}

export function* upload(action) {
    const result = yield call((action) => {
        return ResourceApi.upload(action.formData, action.key);
    }, action);
    if (result && result.code === 0) {
        yield put({
            type: resActionKeys.uploadSuccess,
            resource: result.result
        })

    } else {
        yield put({
            type: resActionKeys.uploadFailed,
            errorMsg: result.result
        })
    }

}
export default { fetchVoices, upload }