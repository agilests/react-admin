import Immutable from 'immutable';
import signActionKeys from './signActionKeys';
const initialState = Immutable.Map({
    signs: [],
    currentSign: null,
    templates: [],
    parts: [],
    added: null,
    fetching: false,
    errorMsg: ''
})
export default function signReducer(state = initialState, action) {
    switch (action.type) {
        case signActionKeys.fetchSigns:
        case signActionKeys.fetchSignTemplates:
        case signActionKeys.fetchParts:
        case signActionKeys.createSign:
            return state.set('fetching', true).set('errorMsg', '');
        case signActionKeys.fetchSignsFailed:
        case signActionKeys.fetchSignTemplatesFailed:
        case signActionKeys.fetchPartsFailed:
        case signActionKeys.createSignFailed:
            return state.set('fetching', false).set('errorMsg', action.errorMsg);
        case signActionKeys.fetchSignsSuccess:
            return state.set('fetching', false).set('errorMsg', '').set('signs', action.signs);
        case signActionKeys.fetchSignTemplatesSuccess:
            return state.set('fetching', false).set('errorMsg', '').set('templates', action.templates);
        case signActionKeys.createSignSuccess:
            let signs = state.get('signs');
            signs.unshift(action.sign);
            if (action.sign.templateId) {
                let templates = state.get('templates');
                templates.unshift({ id: action.sign.templateId, name: action.sign.templateName })
                return state.set('fetching', false).set('errorMsg', '').set('added', action.sign).set('signs', signs).set('templates', templates);
            }
            return state.set('fetching', false).set('errorMsg', '').set('added', action.sign).set('signs', signs);
        case signActionKeys.fetchPartsSuccess:
            return state.set('fetching', false).set('errorMsg', '').set('parts', action.parts);
        case signActionKeys.currentSign:
            return state.set('currentSign',action.sign);
        default:
            return state;
    }
}