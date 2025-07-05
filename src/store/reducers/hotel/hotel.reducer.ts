import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHotel } from '../../../types/hotel.types.ts';
import { IHotelsList } from '../../../types/hotelsList.types.ts';

interface HotelState {
  hotels: IHotel[];
  hotelsListFull: IHotel[];
  hotel: IHotel | null;
  hotelsList: IHotelsList[];
}

const initialState: HotelState = {
  hotels: [],
  hotel: null,
  hotelsList: [],
  hotelsListFull: [],
};

const { reducer: hotelReducer, actions: hotelActions } = createSlice({
  name: 'hotelsData',
  initialState,
  reducers: {
    setHotels(state, action: PayloadAction<IHotel[]>) {
      state.hotels = action.payload;
    },
    setHotelsListFull(state, action: PayloadAction<IHotel[]>) {
      state.hotelsListFull = action.payload;
    },
    setHotel(state, action: PayloadAction<IHotel | null>) {
      state.hotel = action.payload;
    },
    setHotelsList(state, action: PayloadAction<IHotelsList[]>) {
      state.hotelsList = action.payload;
    },
    updateHotelsList(state, action: PayloadAction<IHotelsList>) {
      state.hotelsList = state.hotelsList.map((hotel) =>
        hotel._id === action.payload._id ? action.payload : hotel,
      );
    },
    updateHotel(state, action: PayloadAction<IHotel>) {
      state.hotels = state.hotels.map((hotel) =>
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
      state.hotels = state.hotels.filter((h) => h._id !== action.payload);
      if (state.hotel && state.hotel._id === action.payload) state.hotel = null;
    },
  },
});

export { hotelReducer, hotelActions };
