
import NetUtil from './net_utils';
export default class LogApi {
    static getLogList(page) {
        return NetUtil.get(`/api/logs?page=${page}`);
    }

    static getLogListByOrgId(page, orgId) {
        return NetUtil.get(`/api/logs?orgId=${orgId}&page=${page}`);
    }
}