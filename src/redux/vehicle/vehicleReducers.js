import Immutable from 'immutable';
import VehicleActionKeys from './vehicleActionKeys'
const initialState = Immutable.Map({
    vehicles: [],
    fetching: false,
    added: null,
    errorMsg: ''
})

export default function lineReducer(state = initialState, action) {
    switch (action.type) {
        case VehicleActionKeys.fetchVehicle:
        case VehicleActionKeys.createVehicle:
        case VehicleActionKeys.bindDevice:
        case VehicleActionKeys.bindLine:
            return state.set('fetching', true).set('errorMsg', '');
        case VehicleActionKeys.fetchVehicleFailed:
        case VehicleActionKeys.createVehicleFailed:
        case VehicleActionKeys.bindDeviceFailed:
        case VehicleActionKeys.bindLineFailed:
            return state.set('fetching', false).set('errorMsg', action.errorMsg);
        case VehicleActionKeys.fetchVehicleSuccess:
            return state.set('fetching', false).set('errorMsg', '').set('vehicles', action.vehicles);
        case VehicleActionKeys.createVehicleSuccess:
            let vs = state.get('vehicles');
            vs.unshift(action.vehicle);
            return state.set('fetching', false).set('errorMsg', '').set('vehicles', vs).set('added', action.vehicle);
        default:
            return state;
    }
}