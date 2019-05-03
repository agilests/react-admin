import lineActionKeys from './lineActionKeys';

export const fetchLines = (orgId) => {
    return {
        type: lineActionKeys.fetchLines,
        orgId: orgId
    }
};
export const createLine = (orgId, line) => {
    line.orgId = orgId;
    return {
        type: lineActionKeys.createLine,
        line: line
    }
}
export const addStation = (lineId, station) => {
    return {
        type: lineActionKeys.addStation,
        lineId: lineId,
        station: station
    }
}
export const deleteLine = (id) => {
    return {
        type: lineActionKeys.deleteLine,
        id: id
    }
}
export const fetchStations = (id) => {
    return {
        type: lineActionKeys.fetchStations,
        lineId: id
    }
}