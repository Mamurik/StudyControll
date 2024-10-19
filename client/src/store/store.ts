import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './Slices/userSlice'
import labSlice from './Slices/labSlice'
import subjectSlice from './Slices/subjectSlice'
import userLabProgressSlice from './Slices/userLabProgressSlice'
export const store = configureStore({
  reducer: {
    user:UserReducer,
    lab:labSlice,
    subject:subjectSlice,
    progress:userLabProgressSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch