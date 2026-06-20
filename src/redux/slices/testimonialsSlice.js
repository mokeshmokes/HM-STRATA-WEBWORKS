/**
 * testimonialsSlice.js — Live API-backed testimonials slice
 *
 * Copy to: src/redux/slices/testimonialsSlice.js
 * (replaces the existing file completely)
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

// ── Thunk ───────────────────────────────────────────────
export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/api/testimonials');
      return data.data; // array of testimonials
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load testimonials');
    }
  }
);

// ── Slice ───────────────────────────────────────────────
const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState: {
    items:        [],
    currentSlide: 0,
    loading:      false,
    error:        null,
  },
  reducers: {
    setCurrentSlide(state, action) {
      state.currentSlide = action.payload;
    },
    nextSlide(state) {
      if (state.items.length === 0) return;
      state.currentSlide = (state.currentSlide + 1) % state.items.length;
    },
    prevSlide(state) {
      if (state.items.length === 0) return;
      state.currentSlide = (state.currentSlide - 1 + state.items.length) % state.items.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending,   (state)         => { state.loading = true;  state.error = null; })
      .addCase(fetchTestimonials.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchTestimonials.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { setCurrentSlide, nextSlide, prevSlide } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
