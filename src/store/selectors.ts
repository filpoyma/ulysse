import { RootState } from "../store";

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export const selectTravelProgram = (state: RootState) =>
  state.travelProgram.program;
