import { call, put } from 'redux-saga/effects'
import deviceActionKeys from './deviceActionKeys';
import DeviceApi from '../apis/deviceApis';

export function* fetchDevices(action) {
    const result = yield call((orgId) => {
        return DeviceApi.getDevicesList(orgId);
    }, action.orgId)
    if (result && result.code === 0) {
        yield put({
            type: deviceActionKeys.fetchDevicesSuccess,
            devices: result.result
        });
        return;
    }
}
export function* createDevice(action) {
    const result = yield call((device) => {
        return DeviceApi.createDevice(device);
    }, action.device)
    if (result && result.code === 0) {
        yield put({
            type: deviceActionKeys.createDeviceSuccess,
            device: result.result
        });
        return;
    } else {
        yield put({
            type: deviceActionKeys.createDeviceFailed,
            errorMsg: result.result
        });
        return;
    }
}


export function* updateDevice(action) {
    const result = yield call((id, device) => {
        return DeviceApi.updateDevice(id, device);
    }, action.id, action.device)
    if (result && result.code === 0) {
        yield put({
            type: deviceActionKeys.updateDeviceSuccess,
            device: result.result
        });
        return;
    } else {
        yield put({
            type: deviceActionKeys.updateDeviceFailed,
            errorMsg: result.result
        });
        return;
    }
}
export function* deleteDevice(action) {
    const result = yield call((id) => {
        return DeviceApi.deleteDevice(id);
    }, action.id)
    if (result && result.code === 0) {
        yield put({
            type: deviceActionKeys.deleteDeviceSuccess,
            id: result.result.id
        });
        return;
    } else {
        yield put({
            type: deviceActionKeys.deleteDeviceFailed,
            errorMsg: result.result
        });
        return;
    }
}



export default { fetchDevices, createDevice, deleteDevice, updateDevice }