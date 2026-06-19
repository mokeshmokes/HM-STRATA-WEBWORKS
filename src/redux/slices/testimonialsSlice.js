import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSlide: 0,
  totalSlides: 3
};

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    setSlide(state, action) {
      state.currentSlide = action.payload;
    },
    nextSlide(state) {
      state.currentSlide = (state.currentSlide + 1) % state.totalSlides;
    },
    prevSlide(state) {
      state.currentSlide = (state.currentSlide - 1 + state.totalSlides) % state.totalSlides;
    }
  }
});

export const { setSlide, nextSlide, prevSlide } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
