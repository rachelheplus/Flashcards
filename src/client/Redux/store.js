import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice.js';
import userReducer from './slices/userSlice.js';
import collectionSlice from './slices/collectionSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    collection: collectionSlice,
    counter: counterReducer,
  },
});
