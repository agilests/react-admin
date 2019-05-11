import Immutable from 'immutable';
import deviceActionKeys from './deviceActionKeys';
const initialState = Immutable.Map({
    devices: [],
    added: null,
    fetching: false,
    errorMsg: ''
})
export default function deviceReducer(state = initialState, action) {
    switch (action.type) {
        case deviceActionKeys.fetchDevices:
        case deviceActionKeys.createDevice:
        case deviceActionKeys.updateDevice:
        case deviceActionKeys.deleteDevice:
            return state.set('fetching', true).set('errorMsg', '').set('added',null);
        case deviceActionKeys.createDeviceFailed:
        case deviceActionKeys.updateDeviceFailed:
        case deviceActionKeys.deleteDeviceFailed:
            return state.set('errorMsg', action.errorMsg).set('fetching', false);
        case deviceActionKeys.fetchDevicesSuccess:
            return state.set('fetching', false).set('errorMsg', '').set('devices', action.devices);
        case deviceActionKeys.createDeviceSuccess:
            let devices = state.get('devices');
            devices.unshift(action.device);
            return state.set('errorMsg', '').set('fetching', false).set('added', action.device).set('devices', devices);
        case deviceActionKeys.updateDeviceSuccess:
            let devices2 = state.get('devices');
            devices2 = devices2.map(d=>{if(d.id===action.device.id)return action.device;return d;})
            return state.set('errorMsg', '').set('fetching', false).set('added', action.device).set('devices', devices2);
        case deviceActionKeys.deleteDeviceSuccess:
            let devices1 = state.get('devices');
            devices1 = devices1.filter(d => d.id != action.id);
            return state.set('errorMsg', '').set('fetching', false).set('devices', devices1);
        default:
            return state;
    }
}