import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

// ── Thunk — submits contact form as a Lead (multipart) ──
// payload: { name, email, phone, service, budget, description, domain, file? }
export const submitLead = createAsyncThunk(
  'contact/submitLead',
  async (payload, { rejectWithValue }) => {
    try {
      const fd = new FormData();
      fd.append('name',        payload.name        || '');
      fd.append('email',       payload.email       || '');
      fd.append('phone',       payload.phone       || '');
      fd.append('service',     payload.service     || '');
      fd.append('domain',      payload.domain      || '');
      fd.append('budget',      payload.budget      || '');
      fd.append('description', payload.description || '');
      fd.append('source',      'website');

      // Attach the actual File object if provided
      if (payload.file instanceof File) {
        fd.append('requirementDoc', payload.file, payload.file.name);
      }

      const { data } = await axios.post(`${API_URL}/api/leads`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 20000,
      });

      return data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Submission failed. Please try again.'
      );
    }
  }
);

// ── Slice ───────────────────────────────────────────────
const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    isSubmitting:  false,
    submitSuccess: false,
    error:         null,
    fileName:      '',       // display name shown in the file input
  },
  reducers: {
    resetSubmitStatus(state) {
      state.submitSuccess = false;
      state.error         = null;
    },
    setFileName(state, action) {
      state.fileName = action.payload;
    },
    resetFileUpload(state) {
      state.fileName = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitLead.pending, (state) => {
        state.isSubmitting  = true;
        state.submitSuccess = false;
        state.error         = null;
      })
      .addCase(submitLead.fulfilled, (state) => {
        state.isSubmitting  = false;
        state.submitSuccess = true;
        state.fileName      = '';
      })
      .addCase(submitLead.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error        = action.payload;
      });
  },
});

export const { resetSubmitStatus, setFileName, resetFileUpload } = contactSlice.actions;
export default contactSlice.reducer;
