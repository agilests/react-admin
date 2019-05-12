import Immutable from 'immutable';
import logActionKeys from './logActionKeys';
const initialState = Immutable.Map({
    logs: [],
    fetching: false,
    errorMsg: ''
})
export default function resReducer(state = initialState, action) {
    if (action.type === logActionKeys.fetchLogs) {
        return state.set('errorMsg', '').set('fetching', true);
    } else if (action.type === logActionKeys.fetchLogsSuccess) {
        return state.set('errorMsg', '').set('fetching', false).set('logs', action.logs);
    }
    return state;
}