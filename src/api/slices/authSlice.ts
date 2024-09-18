// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse } from '../registerApi';
export interface User {
   id:string;
   firstName:string;
   lastName:string;
   userIdentifier:string
   email:string;
   role:string;
   signature:string;
   accessToken:string
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token:string|null
  mfaEnabled: boolean;
}

const loadState = (): AuthState | undefined => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: AuthState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
  }
};

const initialState: AuthState = loadState() || {
  isAuthenticated: false,
  user: null,
  token:null,
  mfaEnabled:false
};
export const inactivityLogout = () => (dispatch: any) => {
  dispatch(logout());
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token=action.payload.accessToken
      saveState(state);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.mfaEnabled = false;
      saveState(state);
    },
    reset: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.mfaEnabled=false
      saveState(state);
    },
  },
});

export const { login, logout, reset} = authSlice.actions;
export default authSlice.reducer;
