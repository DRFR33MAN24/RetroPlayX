import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import offersReducers from '../src/Reducers/offersSlice';
import authReducers from '../src/Reducers/authSlice';
import notificationsReducers from '../src/Reducers/notificationSlice';
import walletReducers from '../src/Reducers/walletSlice';
import {offersApi} from './api/graphqlAPI';
export default configureStore({
  reducer: {
    [offersApi.reducerPath]: offersApi.reducer,
    offers: offersReducers,
    auth: authReducers,
    notifications: notificationsReducers,
    wallet: walletReducers,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(offersApi.middleware),
});
