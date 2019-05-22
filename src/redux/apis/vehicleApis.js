
import NetUtil from './net_utils';
export default class UserApi {
    static fetchVehicles(orgId) {
        if (orgId) {
            return NetUtil.get(`/api/vehicles?orgId=${orgId}`);
        }
        else {
            return NetUtil.get('/api/vehicles');
        }
    }
    static createVehicle(vechile) {
        return NetUtil.post('/api/vehicles', vechile);
    }
}