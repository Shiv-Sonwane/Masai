
import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import {
  fetchRoomsFromFirestore,
  addRoomToFirestore,
  updateRoomInFirestore,
  deleteRoomFromFirestore,
} from "../../utils/firestore";

// fetch user's rooms from Firestore
export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (uid, { rejectWithValue }) => {
    try {
      const rooms = await fetchRoomsFromFirestore(uid);
      return Array.isArray(rooms) ? rooms : [];
    } catch (err) {
      return rejectWithValue(err?.message ?? String(err));
    }
  }
);

// addRoom: create id client-side and write to Firestore
export const addRoom = createAsyncThunk(
  "rooms/addRoom",
  async ({ uid, name }, { rejectWithValue }) => {
    try {
      const id = nanoid();
      const newRoom = { id, name, uid, createdAt: Date.now() };
      const created = await addRoomToFirestore(newRoom);
      if (created && created.id) newRoom.id = created.id;
      return newRoom;
    } catch (err) {
      return rejectWithValue(err?.message ?? String(err));
    }
  }
);

// update and delete follow same pattern — call firestore helper then update local state
export const updateRoom = createAsyncThunk(
  "rooms/updateRoom",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      await updateRoomInFirestore(id, updates);
      return { id, updates };
    } catch (err) {
      return rejectWithValue(err?.message ?? String(err));
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
  async (id, { rejectWithValue }) => {
    try {
      await deleteRoomFromFirestore(id);
      return id;
    } catch (err) {
      return rejectWithValue(err?.message ?? String(err));
    }
  }
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    list: [],
    selectedRoomId: "all",
    loading: false,
    error: null,
  },
  reducers: {
    // synchronous action to select a room in UI
    selectRoom(state, action) {
      state.selectedRoomId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
        // ensure selectedRoomId is valid after fetching
        if (!state.selectedRoomId || state.selectedRoomId === "") {
          state.selectedRoomId = state.list[0]?.id ?? "all";
        } else if (
          state.selectedRoomId !== "all" &&
          !state.list.some((r) => r.id === state.selectedRoomId)
        ) {
          state.selectedRoomId = state.list[0]?.id ?? "all";
        }
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message;
      })

      .addCase(addRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message;
      })

      .addCase(updateRoom.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const idx = state.list.findIndex((r) => r.id === id);
        if (idx >= 0) state.list[idx] = { ...state.list[idx], ...updates };
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        const removedId = action.payload;
        state.list = state.list.filter((r) => r.id !== removedId);
        if (state.selectedRoomId === removedId) {
          state.selectedRoomId = state.list[0]?.id || "all";
        }
      });
  },
});

export const { selectRoom } = roomsSlice.actions;
export default roomsSlice.reducer;
