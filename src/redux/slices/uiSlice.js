import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'dark', // default theme
  mobileMenuOpen: false,
  activeSection: 'home'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setMobileMenuOpen(state, action) {
      state.mobileMenuOpen = action.payload;
    },
    setActiveSection(state, action) {
      state.activeSection = action.payload;
    }
  }
});

export const { setTheme, toggleTheme, setMobileMenuOpen, setActiveSection } = uiSlice.actions;
export default uiSlice.reducer;
