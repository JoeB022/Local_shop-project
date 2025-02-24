import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  isLoggedIn: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = '';
      state.isLoggedIn = false;
    }
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
