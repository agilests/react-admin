import NetUtil from './net_utils';
export default class LineApi {
    static getLineList(orgId) {
        return NetUtil.get(`/api/lines?orgId=${orgId}`);
    }
    static createLine(line) {
        return NetUtil.post('/api/lines', line);
    }
    static deleteLine(id) {
        return NetUtil.delete(`/api/lines/${id}`);
    }
    static addStation(lineId, station) {
        return NetUtil.post(`/api/lines/${lineId}/stations`, station)
    }

    static getStationList(lineId) {
        return NetUtil.get(`/api/lines/${lineId}/stations`);
    }
}