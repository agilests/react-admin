import {all, takeEvery, takeLatest} from 'redux-saga/effects'
import userActionKeys from './user/userActionKeys';
import userSagas from './user/userSagas';
import orgActionKeys from './org/orgActionKeys';
import orgSagas from './org/orgSagas';
function* rootSaga() {
  yield all([
    //用户相关
    takeEvery(userActionKeys.login, userSagas.login),
    //组织相关
    takeEvery(orgActionKeys.fetchOrgs, orgSagas.fetchOrgs),
    takeEvery(orgActionKeys.fetchAccounts, orgSagas.fetchAccounts),
    takeEvery(orgActionKeys.createOrg, orgSagas.createOrg),
    takeEvery(orgActionKeys.updateOrg,orgSagas.updateOrg),
    takeEvery(orgActionKeys.deleteOrg, orgSagas.deleteOrg),
    takeEvery(orgActionKeys.createAccount, orgSagas.createAccount),
    takeEvery(orgActionKeys.updateAccount, orgSagas.updateAccount),
    takeEvery(orgActionKeys.deleteAccount, orgSagas.deleteAccount)
    ]);

}

export default rootSaga;
