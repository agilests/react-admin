import {call, put} from 'redux-saga/effects'
import deviceActionKeys from './deviceActionKeys';
import DeviceApi from '../apis/deviceApis';

export function* fetchDevices(action){
    const result = yield call((orgId)=>{
        return DeviceApi.getDevicesList(orgId);
    },action.orgId)
    if(result && result.code === 0){
        yield put({
            type: deviceActionKeys.fetchDevicesSuccess,
            devices: result.result
        });
        return;
    }
}
export function* createDevice(action){
    const result = yield call((device)=>{
        return DeviceApi.createDevice(device);
    },action.device)
    if(result && result.code === 0){
        yield put({
            type: deviceActionKeys.createDeviceSuccess,
            device: result.result
        });
        return;
    }else{
        yield put({
            type: deviceActionKeys.createDeviceFailed,
            errorMsg: result.result
        });
        return;
    }
}

export default{fetchDevices,createDevice}