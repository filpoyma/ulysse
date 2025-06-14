import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITravelProgramResponse } from '../../../types/travelProgram.types';
import { IUploadedImage } from '../../../types/uploadImage.types.ts';

interface ITravelProgramState {
  program: ITravelProgramResponse | null;
}

interface IUpdateActivityIconPayload {
  dayIndex: number;
  activityIndex: number;
  icon: string;
}

const initialState: ITravelProgramState = {
  program: null,
};

const { reducer: travelProgramReducer, actions: travelProgramActions } = createSlice({
  name: 'travelProgram',
  initialState,
  reducers: {
    setProgram(state: ITravelProgramState, action: PayloadAction<ITravelProgramResponse | null>) {
      state.program = action.payload;
    },
    updateProgram(
      state: ITravelProgramState,
      action: PayloadAction<Partial<ITravelProgramResponse>>,
    ) {
      if (state.program) {
        state.program = {
          ...state.program,
          ...action.payload,
        };
      }
    },
    setBgImages(state: ITravelProgramState, action: PayloadAction<IUploadedImage[]>) {
      if (state.program) {
        state.program.bgImages = action.payload;
      }
    },
    updateActivityIcon(
      state: ITravelProgramState,
      action: PayloadAction<IUpdateActivityIconPayload>,
    ) {
      if (state.program?.secondPageTables?.routeDetailsTable?.review) {
        const { dayIndex, activityIndex, icon } = action.payload;
        const review = state.program.secondPageTables.routeDetailsTable.review;
        if (review[dayIndex]?.activity[activityIndex]) {
          review[dayIndex].activity[activityIndex].icon = icon;
        }
      }
    },
  },
});

export { travelProgramReducer, travelProgramActions };
