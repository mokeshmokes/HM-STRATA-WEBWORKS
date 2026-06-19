import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  submissions: [],
  isSubmitting: false,
  submitSuccess: false,
  error: null
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    submitFormStart(state) {
      state.isSubmitting = true;
      state.submitSuccess = false;
      state.error = null;
    },
    submitFormSuccess(state, action) {
      state.isSubmitting = false;
      state.submitSuccess = true;
      state.submissions.push(action.payload);
    },
    submitFormError(state, action) {
      state.isSubmitting = false;
      state.submitSuccess = false;
      state.error = action.payload;
    },
    resetSubmitStatus(state) {
      state.submitSuccess = false;
      state.error = null;
    }
  }
});

export const { submitFormStart, submitFormSuccess, submitFormError, resetSubmitStatus } = contactSlice.actions;
export default contactSlice.reducer;
