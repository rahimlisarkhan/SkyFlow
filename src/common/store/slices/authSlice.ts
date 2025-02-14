import { LOCAL_STORE } from '@/common/constants/keys';
import { AuthAPI } from '@/services/api/auth.api';
import { ProfileAPI } from '@/services/api/profile.api';
import { EndpointResources } from '@/services/EndpointResources.g';
import { IError } from '@/types/api.types';
import { ILogin } from '@/types/auth.types';
import { IProfile } from '@/types/profile.types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: IProfile['profile'] | null;
  loading: boolean;
  error: string | null;
}

//Thunks
export const loginUser = createAsyncThunk<IProfile, ILogin, IError>(
  EndpointResources.auth.login, // Action name
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AuthAPI.login(credentials);

      localStorage.setItem(
        LOCAL_STORE.ACCESS_TOKEN,
        response.data.tokens.access_token
      );
      localStorage.setItem(
        LOCAL_STORE.REFRESH_TOKEN,
        response.data.tokens.refresh_token
      );

      return response.data;
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  }
);

export const initProfile = createAsyncThunk<
  IProfile['profile'],
  undefined,
  IError
>(
  EndpointResources.profile.index, // Action name
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await ProfileAPI.profile();

      return response.data;
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  } as AuthState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    reset: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<IProfile>) => {
          state.loading = false;
          state.user = action.payload.profile;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      //Profile
      .addCase(initProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        initProfile.fulfilled,
        (state, action: PayloadAction<IProfile['profile']>) => {
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(initProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { logout, reset } = authSlice.actions;

export default authSlice.reducer;
