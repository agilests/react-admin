import Immutable from 'immutable';
import signActionKeys from './signActionKeys';
const initialState = Immutable.Map({
    signs: [],
    templates: [],
    added: null,
    fetching: false,
    errorMsg: ''
})
export default function signReducer(state = initialState, action) {
    switch (action.type) {
        case signActionKeys.fetchSigns:
        case signActionKeys.fetchSignTemplates:
        case signActionKeys.createSign:
            return state.set('fetching', true).set('errorMsg', '');
        case signActionKeys.fetchSignsFailed:
        case signActionKeys.fetchSignTemplatesFailed:
        case signActionKeys.createSignFailed:
            return state.set('fetching', false).set('errorMsg', action.errorMsg);
        case signActionKeys.fetchSignsSuccess:
            return state.set('fetching', false).set('errorMsg', '').set('signs', action.signs);
        case signActionKeys.fetchSignTemplatesSuccess:
            return state.set('fetching', false).set('errorMsg', '').set('templates', action.templates);
        case signActionKeys.createSignSuccess:
            let signs = state.get('signs');
            signs.unshift(action.sign);
            return state.set('fetching', false).set('errorMsg', '').set('added', action.sign).set('signs', signs);
        default:
            return state;
    }
}