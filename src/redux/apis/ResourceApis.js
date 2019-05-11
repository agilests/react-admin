
import NetUtil from './net_utils';
export default class ResourcesApi {
    static fetchVoices() {
        return NetUtil.get(`/api/resources/voices`);
    }
    static upload(formData, key) {
        return NetUtil.upload(`/api/resources/voice?key=${key}`, formData);
    }
}