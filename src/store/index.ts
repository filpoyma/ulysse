import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/auth';
import { travelProgramReducer } from './reducers/travelProgram';
import { hotelReducer } from './reducers/hotel';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    travelProgram: travelProgramReducer,
    hotel: hotelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;