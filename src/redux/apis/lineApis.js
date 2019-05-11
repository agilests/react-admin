import NetUtil from './net_utils';
export default class LineApi {
    static getLineList(orgId) {
        return NetUtil.get(`/api/lines?orgId=${orgId}`);
    }
    static createLine(line) {
        return NetUtil.post('/api/lines', line);
    }
    static updateLine(line) {
        return NetUtil.put(`/api/lines/${line.id}`, line);
    }
    static deleteLine(id) {
        return NetUtil.delete(`/api/lines/${id}`);
    }
    static addStation(lineId, station) {
        return NetUtil.post(`/api/lines/${lineId}/stations`, station)
    }
    static deleteStation(id) {
        return NetUtil.delete(`/api/stations/${id}`)
    }

    static getStationList(lineId) {
        return NetUtil.get(`/api/lines/${lineId}/stations`);
    }
    static updateStationKey(stationId, key, value) {
        return NetUtil.put(`/api/stations/${stationId}/${key}`, { value: value })
    }
}