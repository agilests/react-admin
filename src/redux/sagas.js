import {all, takeEvery} from 'redux-saga/effects'
import userActionKeys from './user/userActionKeys';
import userSagas from './user/userSagas';
import orgActionKeys from './org/orgActionKeys';
import orgSagas from './org/orgSagas';
import deviceActionKeys from './devices/deviceActionKeys';
import deviceSagas from './devices/deviceSagas';
import lineActionKeys from './lines/lineActionKeys';
import lineSagas from './lines/lineSagas';
function* rootSaga() {
  yield all([
    //用户相关
    takeEvery(userActionKeys.login, userSagas.login),
    takeEvery(userActionKeys.logout, userSagas.logout),
    //组织相关
    takeEvery(orgActionKeys.fetchOrgs, orgSagas.fetchOrgs),
    takeEvery(orgActionKeys.fetchAccounts, orgSagas.fetchAccounts),
    takeEvery(orgActionKeys.createOrg, orgSagas.createOrg),
    takeEvery(orgActionKeys.updateOrg,orgSagas.updateOrg),
    takeEvery(orgActionKeys.deleteOrg, orgSagas.deleteOrg),
    takeEvery(orgActionKeys.createAccount, orgSagas.createAccount),
    takeEvery(orgActionKeys.updateAccount, orgSagas.updateAccount),
    takeEvery(orgActionKeys.deleteAccount, orgSagas.deleteAccount),
    //设备相关
    takeEvery(deviceActionKeys.fetchDevices, deviceSagas.fetchDevices),
    takeEvery(deviceActionKeys.createDevice, deviceSagas.createDevice),
    //线路相关
    takeEvery(lineActionKeys.fetchLines, lineSagas.fetchLines),
    takeEvery(lineActionKeys.createLine, lineSagas.createLine),
    takeEvery(lineActionKeys.deleteLine, lineSagas.deleteLine),
    takeEvery(lineActionKeys.addStation, lineSagas.addStation),
    //站点
    takeEvery(lineActionKeys.fetchStations, lineSagas.fetchStation)
    ]);

}

export default rootSaga;
