import { call, put } from 'redux-saga/effects'
import lineActionKeys from './lineActionKeys';
import LineApi from '../apis/lineApis';

export function* fetchLines(action) {
    const result = yield call((orgId) => {
        return LineApi.getLineList(orgId);
    }, action.orgId)
    if (result && result.code === 0) {
        yield put({
            type: lineActionKeys.fetchLinesSuccess,
            lines: result.result
        });
        return;
    }
}

export function* createLine(action) {
    const result = yield call((line) => {
        return LineApi.createLine(line);
    }, action.line);
    if (result && result.code === 0) {
        yield put({
            type: lineActionKeys.createLineSuccess,
            line: result.result
        });
        return;
    }
    yield put({
        type: lineActionKeys.createLineFailed,
        errorMsg: result.result
    });
}
export function* deleteLine(action) {
    const result = yield call((id) => {
        return LineApi.deleteLine(id)
    }, action.id);

    if (result && result.code === 0) {
        yield put({
            type: lineActionKeys.deleteLineSuccess,
            id: action.id
        });
        return;
    }

    yield put({
        type: lineActionKeys.deleteLineFailed,
        errorMsg: result.result
    });
}


export function* addStation(action) {
    const result = yield call((ac) => {
        return LineApi.addStation(ac.lineId, ac.station);
    }, action);
    if (result && result.code === 0) {
        yield put({
            type: lineActionKeys.addStationSuccess,
            lineId: action.lineId,
            station: result.result
        });
        return;
    }
    yield put({
        type: lineActionKeys.addStationFailed,
        errorMsg: result.result
    });
}

export function* fetchStation(action) {
    const result = yield call((lineId) => {
        return LineApi.getStationList(lineId);
    }, action.lineId);
    if(result && result.code===0){
        yield put({
            type:lineActionKeys.fetchStationsSuccess,
            stations:result.result
        })
    }
}
export default { fetchLines, createLine, deleteLine, addStation, fetchStation }