import deviceActionKeys from './deviceActionKeys';

export const fetchDevices = (orgId) => {
    return {
        type: deviceActionKeys.fetchDevices,
        orgId: orgId
    }
};
export const createDevice = (device) => {
    return {
        type: deviceActionKeys.createDevice,
        device: device
    }
}
export const updateDevice = (id,device) => {
    return {
        type: deviceActionKeys.updateDevice,
        id: id,
        device: device
    }
}
export const deleteDevice = (id) => {
    return {
        type: deviceActionKeys.deleteDevice,
        id: id
    }
}