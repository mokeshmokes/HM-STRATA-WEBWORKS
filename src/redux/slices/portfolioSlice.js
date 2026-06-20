/**
 * portfolioSlice.js — Live API-backed portfolio slice
 *
 * Copy to: src/redux/slices/portfolioSlice.js
 * (replaces the existing file completely)
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

// ── Thunk ───────────────────────────────────────────────
export const fetchPortfolio = createAsyncThunk(
  'portfolio/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/api/portfolio');
      return data.data; // array of projects
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load portfolio');
    }
  }
);

// ── Slice ───────────────────────────────────────────────
const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    projects:     [],
    activeFilter: 'all',
    loading:      false,
    error:        null,
  },
  reducers: {
    setActiveFilter(state, action) {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.pending,   (state)          => { state.loading = true;  state.error = null; })
      .addCase(fetchPortfolio.fulfilled, (state, action)  => { state.loading = false; state.projects = action.payload; })
      .addCase(fetchPortfolio.rejected,  (state, action)  => { state.loading = false; state.error = action.payload; });
  },
});

export const { setActiveFilter } = portfolioSlice.actions;
export default portfolioSlice.reducer;
