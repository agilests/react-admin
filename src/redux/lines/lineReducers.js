import Immutable from 'immutable';
import lineActionKeys from './lineActionKeys';
const initialState = Immutable.Map({
    lines: [],
    fetching: false,
    added: null,
    errorMsg: '',
    stations: null,
    addedStation: null,
    currentStation: null
})
export default function lineReducer(state = initialState, action) {
    switch (action.type) {
        case lineActionKeys.fetchLines:
        case lineActionKeys.createLine:
        case lineActionKeys.updateLine:
        case lineActionKeys.deleteLine:
        case lineActionKeys.addStation:
        case lineActionKeys.deleteStation:
        case lineActionKeys.fetchStations:
        case lineActionKeys.updateStationKey:
        case lineActionKeys.syncLine:
            return state.set('fetching', true).set('errorMsg', '').set('addedStation', null).set('added', null);
        case lineActionKeys.createLineFailed:
        case lineActionKeys.updateLineFailed:
        case lineActionKeys.deleteLineFailed:
        case lineActionKeys.addStationFailed:
        case lineActionKeys.deleteStationFailed:
        case lineActionKeys.updateStationKeyFailed:
        case lineActionKeys.fetchStationsFailed:
        case lineActionKeys.fetchLinesFailed:
        case lineActionKeys.syncLineFailed:
            return state.set('fetching', false).set('errorMsg', action.errorMsg);
        case lineActionKeys.fetchLinesSuccess:
            return state.set('fetching', false).set('errorMsg', '').set('lines', action.lines);
        case lineActionKeys.createLineSuccess:
            let lines = state.get('lines');
            lines.unshift(action.line);
            return state.set('errorMsg', '').set('fetching', false).set('added', action.line).set('lines', lines);
        case lineActionKeys.updateLineSuccess:
            let lines2 = state.get('lines');
            lines2 = lines2.map(l => { if (l.id === action.line.id) return action.line; return l });
            return state.set('errorMsg', '').set('fetching', false).set('added', action.line).set('lines', lines2);
        case lineActionKeys.deleteLineSuccess:
            let lines1 = state.get('lines');
            lines1.splice(lines1.findIndex(l => l.id === action.id), 1);
            return state.set('errorMsg', '').set('fetching', false).set('lines', lines1);
        case lineActionKeys.fetchStationsSuccess:
            return state.set('fetching', false).set('errorMsg', '').set('stations', action.stations);
        case lineActionKeys.addStationSuccess:
            let stations = state.get('stations') || {};
            if (action.station.orientation === 'UP') {
                let upStations = stations.upStations || new Array();
                upStations.splice(action.station.seq - 1, 0, action.station);
                stations.upStations = upStations;
            } else {
                let downStations = stations.downStations || new Array();
                downStations.splice(action.station.seq - 1, 0, action.station);
                stations.downStations = downStations;
            }
            return state.set('fetching', false).set('errorMsg', '').set('stations', stations).set('addedStation', action.station);
        case lineActionKeys.updateStationKeySuccess:

            let stations1 = state.get('stations');
            if (action.station.orientation === 'UP') {
                stations1
                    && stations1.upStations
                    && stations1.upStations.map(s => { if (s.id === action.station.id) return action.station; return s });
            } else {
                stations1
                    && stations1.downStations
                    && stations1.downStations.map(s => { if (s.id === action.station.id) return action.station; return s });
            }

            return state.set('fetching', false).set('errorMsg', '').set('currentStation', action.station).set('stations', stations1);
        case lineActionKeys.deleteStationSuccess:
            let stations2 = state.get('stations');
            if (action.orientation === 'UP') {
                stations2
                    && stations2.upStations
                    && stations2.upStations.splice(stations2.upStations.findIndex(s => s.id === action.id), 1)
            } else {
                stations2
                    && stations2.downStations
                    && stations2.downStations.splice(stations2.downStations.findIndex(s => s.id === action.id), 1)
            }
            return state.set('fetching', false).set('errorMsg', '').set('currentStation', action.station).set('stations', stations2);
        case lineActionKeys.syncLineSuccess:
            let stations3 = state.get('stations');
            let orientation = action.stations[0].orientation;
            if (orientation === 'UP') {
                stations3.upStations = action.stations;
            } else {
                stations3.downStations = action.stations;
            }
            return state.set('fetching', false).set('errorMsg', '').set('stations', stations3);
        default:
            return state;
    }
}