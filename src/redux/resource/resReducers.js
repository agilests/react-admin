import Immutable from 'immutable';
import resActionKeys from './resActionKeys';
const initialState = Immutable.Map({
    resources: [],
    fetching: false,
    errorMsg: '',
    added:null
})
export default function orgReducer(state = initialState, action) {
    switch (action.type) {
        case resActionKeys.fetchResources:
        case resActionKeys.upload:
            return state.set('errorMsg','').set('fetching',true);
        case resActionKeys.fetchResourcesSuccess:
            return state.set('errorMsg','').set('fetching',false).set('resources',action.resources);
        case resActionKeys.uploadSuccess:
            return state.set('errorMsg','').set('fetching',false).set('added',action.resourceId)
        case resActionKeys.uploadFailed:
            return state.set('errorMsg',action.errorMsg).set('fetching',false)
        default: 
            return state
    }
}