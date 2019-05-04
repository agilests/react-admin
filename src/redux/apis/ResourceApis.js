
import NetUtil from './net_utils';
export default class ResourcesApi {
    static fetchResources(orgId) {
        return NetUtil.get(`/api/resources?orgId=${orgId}`);
    }
    static upload(formData, orgId, key) {
        return NetUtil.upload(`/api/resources/voice?orgId=${orgId}&key=${key}`, formData);
    }
}