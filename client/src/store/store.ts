// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import labSlice from './Slices/labSlice';
import subjectSlice from './Slices/subjectSlice';
import userLabProgressSlice from './Slices/userLabProgressSlice';
import UserReducer from './Slices/userSlice';
import { subjectApi } from '../http/subjectApi';
import { userLabProgressApi } from '../http/userLabProgressApi';
import { labApi } from '../http/labApi';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    lab: labSlice,
    subject: subjectSlice,
    progress: userLabProgressSlice,
    [subjectApi.reducerPath]: subjectApi.reducer, 
    [userLabProgressApi.reducerPath]: userLabProgressApi.reducer,
    [labApi.reducerPath]:labApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(subjectApi.middleware) 
      .concat(userLabProgressApi.middleware)
      .concat(labApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
