import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/auth';
import { travelProgramReducer } from './reducers/travelProgram';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    travelProgram: travelProgramReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;