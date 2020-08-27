import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../api/userApi';

export const getMe = createAsyncThunk('user/getMe', async (params, thunkAPI) => {
  // thunkAPI.dispatch(...)
  const currentUser = await userApi.getMe();
  return currentUser;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    loading: false,
    error: '',
  },
  reducer: {},
  extraReducers: {
    [getMe.pending]: (state, action) => {
      state.loading = true;
    },
    [getMe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getMe.fulfilled]: (state, action) => {
      state.loading = false;
      action.current = action.payload;
    }
  },
});

const { reducer: userReducer } = userSlice;

export default userReducer;
