import {all, takeEvery, takeLatest} from 'redux-saga/effects'
import userActionKeys from './user/userActionKeys';
import userSagas from './user/userSages';
function* rootSaga() {
  yield all([
    //用户相关
    takeEvery(userActionKeys.login, userSagas.login),
    ]);

}

export default rootSaga;
