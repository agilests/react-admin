
import NetUtil from './net_utils';
export default class ResourcesApi {
    static fetchVoices(orgId) {
        if (orgId) {
            return NetUtil.get(`/api/resources/voices?orgId=${orgId}`)
        } else {
            return NetUtil.get(`/api/resources/voices`);
        }
    }
    static upload(formData) {
        return NetUtil.upload(`/api/resources/voice`, formData);
    }
}