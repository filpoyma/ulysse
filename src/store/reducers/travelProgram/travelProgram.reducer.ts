import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IUploadedImage,
  ITravelProgramResponse,
} from "../../../types/travelProgram.types";

interface ITravelProgramState {
  program: ITravelProgramResponse | null;
}

const initialState: ITravelProgramState = {
  program: null,
};

const { reducer: travelProgramReducer, actions: travelProgramActions } =
  createSlice({
    name: "travelProgram",
    initialState,
    reducers: {
      setProgram(
        state: ITravelProgramState,
        action: PayloadAction<ITravelProgramResponse | null>
      ) {
        state.program = action.payload;
      },
      updateProgram(
        state: ITravelProgramState,
        action: PayloadAction<Partial<ITravelProgramResponse>>
      ) {
        if (state.program) {
          state.program = {
            ...state.program,
            ...action.payload,
          };
        }
      },
      setBgImages(
        state: ITravelProgramState,
        action: PayloadAction<IUploadedImage[]>
      ) {
        if (state.program) {
          state.program.bgImages = action.payload;
        }
      },
    },
  });

export { travelProgramReducer, travelProgramActions };
