import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHotel } from '../../../types/hotel.types.ts';

interface HotelState {
  hotels: IHotel[];
  hotel: IHotel | null;
}

const initialState: HotelState = {
  hotels: [],
  hotel: null,
};

const { reducer: hotelReducer, actions: hotelActions } = createSlice({
  name: 'hotelsData',
  initialState,
  reducers: {
    setHotels(state, action: PayloadAction<IHotel[]>) {
      state.hotels = action.payload;
    },
    setHotel(state, action: PayloadAction<IHotel | null>) {
      state.hotel = action.payload;
    },
    updateHotel(state, action: PayloadAction<IHotel>) {
      state.hotels = state.hotels.map(hotel =>
        hotel._id === action.payload._id ? action.payload : hotel,
      );
      if (state.hotel && state.hotel._id === action.payload._id) {
        state.hotel = action.payload;
      }
    },
    addHotel(state, action: PayloadAction<IHotel>) {
      state.hotels.unshift(action.payload);
    },
    removeHotel(state, action: PayloadAction<string>) {
      state.hotels = state.hotels.filter(h => h._id !== action.payload);
      if (state.hotel && state.hotel._id === action.payload) state.hotel = null;
    },
  },
});

export { hotelReducer, hotelActions };
