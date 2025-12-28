import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  registered: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  registered: false,
};

export const register = createAsyncThunk<
  void,
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.message ?? 'Registration failed'
      );
    }
    return rejectWithValue('Registration failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetRegisterState(state) {
      state.loading = false;
      state.error = null;
      state.registered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Registration failed';
      });
  },
});

export const { resetRegisterState } = authSlice.actions;
export default authSlice.reducer;
