
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../store";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserState {
  data: User | null;
}

const initialState: UserState = {
  data: null,
};

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
