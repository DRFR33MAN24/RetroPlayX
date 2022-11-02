import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import authReducers from '../src/Reducers/authSlice';
import notificationsReducers from '../src/Reducers/notificationSlice';
import walletReducers from '../src/Reducers/walletSlice';
//import {offersApi} from './api/graphqlAPI';
import storeSlice from '../src/Reducers/storeSlice';
import downloadsSlice from './Reducers/downloadsSlice';
import myGames from './Reducers/myGamesSlice';
export default configureStore({
  reducer: {
    // [offersApi.reducerPath]: offersApi.reducer,
    store: storeSlice,
    download: downloadsSlice,
    localStorage: myGames,
    auth: authReducers,
    notifications: notificationsReducers,
    wallet: walletReducers,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  //.concat(offersApi.middleware),
});
