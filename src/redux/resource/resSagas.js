import { call, put } from 'redux-saga/effects'
import resActionKeys from './resActionKeys';
import ResourceApi from '../apis/ResourceApis';

export function* fetchResources(action) {
    const result = yield call((orgId) => {
        return ResourceApi.fetchResources(orgId);
    }, action.orgId)
    if (result && result.code === 0) {
        yield put({
            type: resActionKeys.fetchResourcesSuccess,
            resources: result.result
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
            resourceId: result.result
        })

    } else {
        yield put({
            type: resActionKeys.uploadFailed,
            errorMsg: result.result
        })
    }

}
export default { fetchResources, upload }