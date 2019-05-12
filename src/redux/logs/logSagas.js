import { call, put } from 'redux-saga/effects'
import logActionKeys from './logActionKeys'
import LogApi from '../apis/logApis'

export function* fetchLogs(action) {
    const result = yield call((page, orgId) => {
        if (orgId) {
            return LogApi.getLogListByOrgId(page, orgId);
        }
        return LogApi.getLogList(page)
    }, action.page, action.orgId)

    if (result && result.code === 0) {
        yield put({
            type: logActionKeys.fetchLogsSuccess,
            logs: result.result
        })
    }else{
        //todo
    }
}
export default{fetchLogs}