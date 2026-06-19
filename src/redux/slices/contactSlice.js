import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  submissions: [],
  isSubmitting: false,
  submitSuccess: false,
  error: null,
  fileUploadState: 'idle', // 'idle' | 'uploading' | 'completed'
  fileName: ''
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
    },
    setFileName(state, action) {
      state.fileName = action.payload;
    },
    setFileUploadState(state, action) {
      state.fileUploadState = action.payload;
    },
    resetFileUpload(state) {
      state.fileUploadState = 'idle';
      state.fileName = '';
    }
  }
});

export const {
  submitFormStart,
  submitFormSuccess,
  submitFormError,
  resetSubmitStatus,
  setFileName,
  setFileUploadState,
  resetFileUpload
} = contactSlice.actions;
export default contactSlice.reducer;
