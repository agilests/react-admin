import NetUtil from './net_utils';
export default class LineApi {
    static getLineList(orgId) {
        if (orgId) {
            return NetUtil.get(`/api/lines?orgId=${orgId}`);
        } else {
            return NetUtil.get(`/api/lines`);
        }

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
    static syncLine(id, orientation) {
        return NetUtil.put(`/api/lines/${id}/stations?sync&orientation=${orientation}`);
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