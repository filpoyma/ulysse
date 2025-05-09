import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirstPage } from '../../../types/travelProgram.types';

export interface IBgImage {
  _id: string;
  filename: string;
  path: string;
  [key: string]: any;
}

export interface ITravelProgram {
  _id: string;
  name: string;
  bgImages: IBgImage[];
  firstPage: FirstPage;
  [key: string]: any;
}

interface ITravelProgramState {
  program: ITravelProgram | null;
}

const initialState: ITravelProgramState = {
  program: null,
};

const { reducer: travelProgramReducer, actions: travelProgramActions } = createSlice({
  name: 'travelProgram',
  initialState,
  reducers: {
    setProgram(state: ITravelProgramState, action: PayloadAction<ITravelProgram | null>) {
      state.program = action.payload;
    },
    updateProgram(state: ITravelProgramState, action: PayloadAction<Partial<ITravelProgram>>) {
      if (state.program) {
        state.program = {
          ...state.program,
          ...action.payload,
        };
      }
    },
    setBgImages(state: ITravelProgramState, action: PayloadAction<IBgImage[]>) {
      if (state.program) {
        state.program.bgImages = action.payload;
      }
    },
  },
});

export { travelProgramReducer, travelProgramActions }; 