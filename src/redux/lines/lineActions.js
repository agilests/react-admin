import lineActionKeys from './lineActionKeys';

export const fetchLines = (orgId) => {
    return {
        type: lineActionKeys.fetchLines,
        orgId: orgId
    }
};
export const createLine = (line) => {
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
export const updateStationKey = (stationId, key, value) => {
    return {
        type: lineActionKeys.updateStationKey,
        stationId: stationId,
        key: key,
        value: value
    }
}