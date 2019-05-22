import { call, put } from 'redux-saga/effects'
import VehicleActionKeys from './vehicleActionKeys';
import VehicleApi from '../apis/vehicleApis';
import { formatAlertMessage } from '../apis/tools';
import { formatResultsErrors } from 'jest-message-util';

export function* fetchVehicles(action) {
    const result = yield call((orgId) => {
        return VehicleApi.fetchVehicles(orgId);
    }, action.orgId)
    if (result && result.code === 0) {
        yield put({
            type: VehicleActionKeys.fetchVehicleSuccess,
            vehicles: result.result
        });
        return;
    } else {
        yield put({
            type: VehicleActionKeys.fetchVehicleFailed,
            errorMsg: formatAlertMessage(result.result)
        })
    }
}
export function* createVehicle(action) {
    const result = yield call((vehicle) => {
        return VehicleApi.createVehicle(vehicle);
    }, action.vehicle)
    if (result && result.code === 0) {
        yield put({
            type: VehicleActionKeys.createVehicleSuccess,
            vehicle: result.result
        })
    } else {
        yield put({
            type: VehicleActionKeys.createVehicleFailed,
            errorMsg: formatAlertMessage(result.result)
        })
    }
}

export default { fetchVehicles, createVehicle }