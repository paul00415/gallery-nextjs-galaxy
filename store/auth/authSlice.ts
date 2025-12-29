import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { registerUser, loginUser } from '@/services/auth.service';

//   Types

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  // register-specific
  registered: boolean;
}

//   Initial State

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  registered: false,
};

//   Register Thunk

export const register = createAsyncThunk<
  void,
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    await registerUser(payload);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.message ?? 'Registration failed'
      );
    }
    return rejectWithValue('Registration failed');
  }
});

//   Login Thunk

export const login = createAsyncThunk<
  { user: User; accessToken: string },
  LoginPayload,
  { rejectValue: string }
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const res = await loginUser(payload);

    return {
      user: res.user,
      accessToken: res.accessToken,
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message ?? 'Login failed');
    }
    return rejectWithValue('Login failed');
  }
});

//   Slice

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetRegisterState(state) {
      state.loading = false;
      state.error = null;
      state.registered = false;
    },

    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
      }
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== Register ===== */
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registered = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Registration failed';
      })

      /* ===== Login ===== */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ Store in Redux
        state.user = action.payload.user;
        state.isAuthenticated = true;

        // ✅ Store ONLY token in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', action.payload.accessToken);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed';
        state.isAuthenticated = false;
      });
  },
});

//   Exports

export const { resetRegisterState, logout } = authSlice.actions;

export default authSlice.reducer;
