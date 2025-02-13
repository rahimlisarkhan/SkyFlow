import { AuthAPI } from '@/services/api/auth.api';
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

//First type: return data type
//Second type: payload type
//Third type: return error type
export const loginUser = createAsyncThunk<IProfile, ILogin, IError>(
  EndpointResources.auth.login, // Action name
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AuthAPI.login(credentials);
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
      });
    //Profile
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
