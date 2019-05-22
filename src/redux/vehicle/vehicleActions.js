import VehicleActionKeys from './vehicleActionKeys';
export const fetchVehicles = (orgId) => {
    return {
        type: VehicleActionKeys.fetchVehicle,
        orgId: orgId
    }
}
export const createVehicle = (vehicle) => {
    return {
        type: VehicleActionKeys.createVehicle,
        vehicle: vehicle
    }
}
export const bindLine = (vid, lid) => {
    return {
        type: VehicleActionKeys.bindLine,
        vid: vid,
        lid: lid
    }
}
export const bindDevice = (vid, did) => {
    return {
        type: VehicleActionKeys.bindDevice,
        vid: vid,
        did: did
    }
}