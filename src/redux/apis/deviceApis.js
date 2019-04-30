
import NetUtil from './net_utils';
export default class DevicesApi {
    static getDevicesList(orgId) {
        return NetUtil.get(`/api/devices?orgId=${orgId}`);
    }
    static createDevice(device) {
        return NetUtil.post('/api/devices', device);
    }
}