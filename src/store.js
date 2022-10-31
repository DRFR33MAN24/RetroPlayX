import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import authReducers from '../src/Reducers/authSlice';
import notificationsReducers from '../src/Reducers/notificationSlice';
import walletReducers from '../src/Reducers/walletSlice';
//import {offersApi} from './api/graphqlAPI';
import storeSlice from '../src/Reducers/storeSlice';
export default configureStore({
  reducer: {
    // [offersApi.reducerPath]: offersApi.reducer,
    store: storeSlice,
    auth: authReducers,
    notifications: notificationsReducers,
    wallet: walletReducers,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  //.concat(offersApi.middleware),
});
