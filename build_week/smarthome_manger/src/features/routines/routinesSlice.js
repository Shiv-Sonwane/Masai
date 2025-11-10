// src/features/routines/routinesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchRoutinesFromFirestore,
  addRoutineToFirestore,
  updateRoutineInFirestore,
  deleteRoutineFromFirestore,
} from "../../utils/firestore";

/* -------------------- ASYNC THUNKS -------------------- */

export const fetchRoutines = createAsyncThunk(
  "routines/fetchRoutines",
  async (uid, { rejectWithValue }) => {
    try {
      const routines = await fetchRoutinesFromFirestore(uid);
      return routines;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addRoutineFirestore = createAsyncThunk(
  "routines/addRoutineFirestore",
  async ({ uid, name, startTime, endTime, deviceActions }, { rejectWithValue }) => {
    try {
      const newRoutine = {
        uid,
        name,
        startTime,
        endTime,
        deviceActions,
        active: true,
        createdAt: Date.now(),
      };

      const { id } = await addRoutineToFirestore(newRoutine);

      return { id, ...newRoutine };
    } catch (err) {
      return rejectWithValue(err.message || String(err));
    }
  }
);

export const updateRoutineFirestore = createAsyncThunk(
  "routines/updateRoutineFirestore",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      await updateRoutineInFirestore(id, updates);
      return { id, updates };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteRoutineFirestore = createAsyncThunk(
  "routines/deleteRoutineFirestore",
  async (id, { rejectWithValue }) => {
    try {
      await deleteRoutineFromFirestore(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* -------------------- SLICE -------------------- */
const routinesSlice = createSlice({
  name: "routines",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch routines
      .addCase(fetchRoutines.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoutines.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchRoutines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add routine
      .addCase(addRoutineFirestore.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addRoutineFirestore.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update routine
      .addCase(updateRoutineFirestore.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const routine = state.list.find((r) => r.id === id);
        if (routine) Object.assign(routine, updates);
      })

      // Delete routine
      .addCase(deleteRoutineFirestore.fulfilled, (state, action) => {
        state.list = state.list.filter((r) => r.id !== action.payload);
      });
  },
});

export default routinesSlice.reducer;
