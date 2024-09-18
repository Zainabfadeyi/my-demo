
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../store";
import { User } from './authSlice';



interface UserState {
  data: User | null;
}

;
const loadState = (): UserState | undefined => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
const initialState: UserState = loadState() || {
  data: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    clearUser: (state) => {
      state.data = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const getUser = (state: RootState) => state.user.data;
export default userSlice.reducer;
