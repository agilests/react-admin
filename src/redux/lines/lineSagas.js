import { call, put } from 'redux-saga/effects'
import lineActionKeys from './lineActionKeys';
import LineApi from '../apis/lineApis';
import { formatAlertMessage } from '../apis/tools';

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
    } else {
        yield put({
            type: lineActionKeys.fetchLinesFailed,
            errorMsg: formatAlertMessage(result.result)
        })
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
        errorMsg: formatAlertMessage(result.result)
    });
}
export function* updateLine(action) {
    const result = yield call((line) => {
        return LineApi.updateLine(line);
    }, action.line);
    if (result && result.code === 0) {
        yield put({
            type: lineActionKeys.updateLineSuccess,
            line: result.result
        });
        return;
    }
    yield put({
        type: lineActionKeys.updateLineFailed,
        errorMsg: formatAlertMessage(result.result)
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
        errorMsg: formatAlertMessage(result.result)
    });
}


export function* fetchStation(action) {
    const result = yield call((lineId) => {
        return LineApi.getStationList(lineId);
    }, action.lineId);
    if (result && result.code === 0) {
        yield put({
            type: lineActionKeys.fetchStationsSuccess,
            stations: result.result
        })
    } else {
        yield put({
            type: lineActionKeys.fetchStationsFailed,
            errorMsg: formatAlertMessage(result.result)
        })
    }
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
    } else {
        yield put({
            type: lineActionKeys.addStationFailed,
            errorMsg: formatAlertMessage(result.result)
        });
    }
}

export function* deleteStation(action) {
    const result = yield call((id) => {
        return LineApi.deleteStation(id);
    }, action.id);
    if (result && result.code === 0) {
        yield put({
            type: lineActionKeys.deleteStationSuccess,
            id: action.id,
            orientation: action.orientation
        });
    } else {
        yield put({
            type: lineActionKeys.deleteStationFailed,
            errorMsg: formatAlertMessage(result.result)
        });
    }
}

export function* updateStationKey(action) {
    const result = yield call((id, key, value) => {
        return LineApi.updateStationKey(id, key, value)
    }, action.stationId, action.key, action.value)

    if (result && result.code === 0) {
        yield put({
            type: lineActionKeys.updateStationKeySuccess,
            station: result.result,
            orientation: action.orientation
        })
    } else {
        yield put({
            type: lineActionKeys.updateStationKeyFailed,
            errorMsg: formatAlertMessage(result.result)
        })
    }
}
export default { fetchLines, createLine, updateLine, deleteLine, addStation, deleteStation, fetchStation, updateStationKey }