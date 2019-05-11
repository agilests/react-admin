import Immutable from 'immutable';
import resActionKeys from './resActionKeys';
const initialState = Immutable.Map({
    voices: [],
    fetching: false,
    errorMsg: '',
    added: null
})
export default function resReducer(state = initialState, action) {
    switch (action.type) {
        case resActionKeys.fetchVoices:
        case resActionKeys.upload:
            return state.set('errorMsg', '').set('fetching', true).set('added',null);
        case resActionKeys.fetchVoicesSuccess:
            return state.set('errorMsg', '').set('fetching', false).set('voices', action.voices);
        case resActionKeys.uploadSuccess:
            return state.set('errorMsg', '').set('fetching', false).set('added', action.resource)
        case resActionKeys.uploadFailed:
            return state.set('errorMsg', action.errorMsg).set('fetching', false)
        default:
            return state
    }
}