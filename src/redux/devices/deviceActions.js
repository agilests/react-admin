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