import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logout } from '../../actions';

interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface IAuthState {
  token: string | null;
  user: IUser | null;
  isLoggedIn: boolean;
}

const initialState: IAuthState = {
  token: null,
  user: null,
  isLoggedIn: false,
};

const { reducer: authReducer, actions: authActions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state: IAuthState, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setUser(state: IAuthState, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
    setIsLoggedIn(state: IAuthState, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    updateUser(state: IAuthState, action: PayloadAction<Partial<IUser>>) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(logout, () => initialState);
  },
});

export { authReducer, authActions };