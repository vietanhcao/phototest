import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';

import photoReducer from '../features/Photo/photoSlice';
import userReducer from './userSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';

//persist
const persistConfig = {
  key: 'photo-app',
  version: 1,
  storage,
  whitelist: ['photos'],
};
//redux
const rootReducer = combineReducers({
  photos: photoReducer,
  user: userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
// export default store
