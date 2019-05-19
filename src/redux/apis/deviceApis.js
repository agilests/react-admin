
import NetUtil from './net_utils';
export default class DevicesApi {

    static getDevicesList() {
    }
    static getDevicesList(orgId) {
        if (orgId) {
            return NetUtil.get(`/api/devices?orgId=${orgId}`);
        } else {
            return NetUtil.get(`/api/devices`);
        }
    }
    static createDevice(device) {
        return NetUtil.post('/api/devices', device);
    }
    static updateDevice(id, device) {
        return NetUtil.put(`/api/devices/${id}`, device);
    }
    static deleteDevice(id) {
        return NetUtil.delete(`/api/devices/${id}`);
    }
}