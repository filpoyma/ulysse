import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/auth';
import { travelProgramReducer } from './reducers/travelProgram';
import { hotelReducer } from './reducers/hotel';
import { restaurantReducer } from './reducers/restaurant';
import { countriesReducer } from './reducers/countries';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    travelProgram: travelProgramReducer,
    hotel: hotelReducer,
    restaurantsData: restaurantReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;