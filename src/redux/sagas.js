import { all, takeEvery, take } from 'redux-saga/effects'
import userActionKeys from './user/userActionKeys';
import userSagas from './user/userSagas';
import orgActionKeys from './org/orgActionKeys';
import orgSagas from './org/orgSagas';
import deviceActionKeys from './devices/deviceActionKeys';
import deviceSagas from './devices/deviceSagas';
import signActionKeys from './sign/signActionKeys';
import signSagas from './sign/signSagas';
import lineActionKeys from './lines/lineActionKeys';
import lineSagas from './lines/lineSagas';
import resActionKeys from './resource/resActionKeys';
import resSagas from './resource/resSagas';
import logActionKeys from './logs/logActionKeys';
import logSagas from './logs/logSagas';
import vehicleActionKeys from './vehicle/vehicleActionKeys';
import vehicleSagas from './vehicle/vehicleSagas';

function* rootSaga() {
  yield all([
    //用户相关
    takeEvery(userActionKeys.login, userSagas.login),
    takeEvery(userActionKeys.logout, userSagas.logout),
    //组织相关
    takeEvery(orgActionKeys.fetchOrgs, orgSagas.fetchOrgs),
    takeEvery(orgActionKeys.fetchOrgSetting, orgSagas.fetchOrgSetting),
    takeEvery(orgActionKeys.updateOrgSetting, orgSagas.updateSetting),
    takeEvery(orgActionKeys.fetchAccounts, orgSagas.fetchAccounts),
    takeEvery(orgActionKeys.createOrg, orgSagas.createOrg),
    takeEvery(orgActionKeys.updateOrg, orgSagas.updateOrg),
    takeEvery(orgActionKeys.deleteOrg, orgSagas.deleteOrg),
    takeEvery(orgActionKeys.createAccount, orgSagas.createAccount),
    takeEvery(orgActionKeys.updateAccount, orgSagas.updateAccount),
    takeEvery(orgActionKeys.deleteAccount, orgSagas.deleteAccount),
    //设备相关
    takeEvery(deviceActionKeys.fetchDevices, deviceSagas.fetchDevices),
    takeEvery(deviceActionKeys.createDevice, deviceSagas.createDevice),
    takeEvery(deviceActionKeys.deleteDevice, deviceSagas.deleteDevice),
    takeEvery(deviceActionKeys.updateDevice, deviceSagas.updateDevice),
    //路牌相关
    takeEvery(signActionKeys.fetchSigns, signSagas.fetchSigns),
    takeEvery(signActionKeys.fetchSignTemplates, signSagas.fetchSignTemplates),
    takeEvery(signActionKeys.createSign, signSagas.createSign),
    takeEvery(signActionKeys.fetchParts, signSagas.fetchParts),
    //线路相关
    takeEvery(lineActionKeys.fetchLines, lineSagas.fetchLines),
    takeEvery(lineActionKeys.createLine, lineSagas.createLine),
    takeEvery(lineActionKeys.updateLine, lineSagas.updateLine),
    takeEvery(lineActionKeys.deleteLine, lineSagas.deleteLine),
    takeEvery(lineActionKeys.syncLine, lineSagas.syncLine),
    takeEvery(lineActionKeys.addStation, lineSagas.addStation),
    takeEvery(lineActionKeys.updateStationKey, lineSagas.updateStationKey),
    takeEvery(lineActionKeys.deleteStation, lineSagas.deleteStation),
    //站点
    takeEvery(lineActionKeys.fetchStations, lineSagas.fetchStation),
    //资源相关
    takeEvery(resActionKeys.fetchVoices, resSagas.fetchVoices),
    takeEvery(resActionKeys.upload, resSagas.upload),

    //日志相关
    takeEvery(logActionKeys.fetchLogs, logSagas.fetchLogs),

    //车辆相关
    takeEvery(vehicleActionKeys.fetchVehicle, vehicleSagas.fetchVehicles),
    takeEvery(vehicleActionKeys.createVehicle, vehicleSagas.createVehicle),
  ]);

}

export default rootSaga;
