import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  user_id: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    //add another reducer to update user_id in the store
    setUser_id: (state, action) => {
      state.user_id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEmail, setUser_id } = userSlice.actions;

export default userSlice.reducer;
