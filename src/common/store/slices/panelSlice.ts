import { PanelAPI } from '@/services/api/panel.api';
import { EndpointResources } from '@/services/EndpointResources.g';
import { IError } from '@/types/api.types';
import { IDashboard, IProject, IReport } from '@/types/panel.types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface PanelState {
  dashboard: IDashboard[] | null;
  projects: IProject[] | null;
  report: IReport | null;
  loading: boolean;
  error: string | null;
}

// Thunks
export const initDashboard = createAsyncThunk<IDashboard[], undefined, IError>(
  EndpointResources.panel.dashboard, // Action name
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await PanelAPI.dashboard();

      return response.data;
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  }
);

export const initProjects = createAsyncThunk<IProject[], undefined, IError>(
  EndpointResources.panel.projects, // Action name
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await PanelAPI.projects();

      return response.data;
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  }
);

export const initReport = createAsyncThunk<IReport, undefined, IError>(
  EndpointResources.panel.charts, // Action name
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await PanelAPI.reports();

      return response.data;
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  }
);

const panelSlice = createSlice({
  name: 'panel',
  initialState: {
    dashboard: null,
    report: null,
    projects: null,
    loading: false,
    error: null,
  } as PanelState,
  reducers: {
    reset: (state) => {
      state.dashboard = null;
      state.report = null;
      state.projects = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Dashboard
      .addCase(initDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        initDashboard.fulfilled,
        (state, action: PayloadAction<IDashboard[]>) => {
          state.loading = false;
          state.dashboard = action.payload;
        }
      )
      .addCase(initDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      //Projects
      .addCase(initProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        initProjects.fulfilled,
        (state, action: PayloadAction<IProject[]>) => {
          state.projects = action.payload;
          state.loading = false;
        }
      )
      .addCase(initProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      //Report
      .addCase(initReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        initReport.fulfilled,
        (state, action: PayloadAction<IReport>) => {
          state.report = action.payload;
          state.loading = false;
        }
      )
      .addCase(initReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { reset } = panelSlice.actions;

export default panelSlice.reducer;

export const selDashboard = (state: RootState) => state.panel.dashboard;
export const selReport = (state: RootState) => state.panel.report;
export const selProject = (state: RootState) => state.panel.projects;
