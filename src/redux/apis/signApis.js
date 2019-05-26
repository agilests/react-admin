
import NetUtil from './net_utils';
export default class SignsApi {
    static fetchSigns(deviceId) {
        return NetUtil.get(`/api/devices/${deviceId}/signs`);
    }
    static fetchSignTemplates() {
        return NetUtil.get(`/api/signs/templates`);
    }
    static createSign(deviceId, sign) {
        return NetUtil.post(`/api/devices/${deviceId}/signs`, sign);
    }

    static fetchParts(signId) {
        return NetUtil.get(`/api/signs/${signId}/parts`)
    }
}