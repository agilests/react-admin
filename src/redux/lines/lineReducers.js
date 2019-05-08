import Immutable from 'immutable';
import lineActionKeys from './lineActionKeys';
const initialState = Immutable.Map({
    lines: [],
    fetching: false,
    added: null,
    errorMsg: '',
    stations: null,
    addedStation: null
})
export default function lineReducer(state = initialState, action) {
    switch (action.type) {
        case lineActionKeys.fetchLines:
        case lineActionKeys.createLine:
        case lineActionKeys.addStation:
        case lineActionKeys.deleteLine:
        case lineActionKeys.fetchStations:
            return state.set('fetching', true).set('errorMsg', '');
        case lineActionKeys.createLineFailed:
        case lineActionKeys.addStationFailed:
        case lineActionKeys.deleteLineFailed:
            return state.set('fetching', false).set('errorMsg', action.errorMsg);
        case lineActionKeys.fetchLinesSuccess:
            return state.set('fetching', false).set('errorMsg', '').set('lines', action.lines);
        case lineActionKeys.createLineSuccess:
            let lines = state.get('lines');
            lines.unshift(action.line);
            return state.set('errorMsg', '').set('fetching', false).set('added', action.line).set('lines', lines);
        case lineActionKeys.deleteLineSuccess:
            let lines1 = state.get('lines');
            lines1 = lines1.filter(l => l.id != action.id);
            return state.set('errorMsg', '').set('fetching', false).set('lines', lines1);
        case lineActionKeys.fetchStationsSuccess:
            return state.set('fetching', false).set('errorMsg', '').set('stations', action.stations);
        case lineActionKeys.addStationSuccess:
            let stations = state.get('stations') || {};
            if (action.station.upOrDown === 'UP') {
                let upStations = stations.upStations || new Array();
                upStations.push(action.station);
                stations.upStations = upStations;
            }
            if (action.station.upOrDown === 'DOWN') {
                let downStations = stations.downStations || new Array();
                downStations.push(action.station);
                stations.downStations = downStations;
            }
            return state.set('fetching', false).set('errorMsg', '').set('stations', stations).set('addedStation', action.station);
        default:
            return state;
    }
}