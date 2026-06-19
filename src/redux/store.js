import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import portfolioReducer from './slices/portfolioSlice';
import testimonialsReducer from './slices/testimonialsSlice';
import contactReducer from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    portfolio: portfolioReducer,
    testimonials: testimonialsReducer,
    contact: contactReducer
  }
});
