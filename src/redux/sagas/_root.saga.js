import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import ordersSaga from './orders.saga';
import fulfillSaga from './fulfill.saga';
import deleteOrderSaga from './delete.order.saga';
import homeSaga from './home.saga';
import saveDesignSaga from "./saveDesign.saga";
import getDesignSaga from "./getDesign.saga";
import updateDesignSaga from "./updateDesign.saga";
import cartItemsSaga from './cart.saga';
import submitOrderSaga from './submit.order.saga';



// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    ordersSaga(),
    fulfillSaga(),
    deleteOrderSaga(),
    homeSaga(),
    saveDesignSaga(), // adds new lure design to DB
    getDesignSaga(), // gets data for a single design
    updateDesignSaga(), // update a design
    cartItemsSaga(), // get unordered items currently in a user's cart
    submitOrderSaga(), // submits a user's cart item as ordered
  ]);
}
