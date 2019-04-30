import Immutable from 'immutable';
import deviceActionKeys from './deviceActionKeys';
const initialState = Immutable.Map({
    devices:[],
    fetching:false,
    errorMsg:''
})
export default function deviceReducer(state = initialState, action){
    switch(action.type){
        case deviceActionKeys.fetchDevices:
        case deviceActionKeys.createDevice:
            return state.set('fetching',true);
        case deviceActionKeys.fetchDevicesSuccess:
            return state.set('fetching',false).set('errorMsg','').set('devices',action.devices);
        case deviceActionKeys.createDeviceSuccess:
            let devices = state.get('devices');
            devices.unshift(action.device);
            return state.set('errorMsg','').set('fetching',false).set('devices',devices);
        case deviceActionKeys.createDeviceFailed:
            return state.set('errorMsg',action.errorMsg).set('fetching',false);
        default: 
            return state;
    }
}