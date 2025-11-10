
import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import {
  fetchDevicesFromFirestore,
  addDeviceToFirestore,
  updateDeviceInFirestore,
  deleteDeviceFromFirestore,
} from "../../utils/firestore";

// fetch devices for user
export const fetchDevices = createAsyncThunk(
  "devices/fetchDevices",
  async (uid, { rejectWithValue }) => {
    try {
      const devices = await fetchDevicesFromFirestore(uid);
      return devices;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// add device (client-side id) and push to Firestore
export const addDevice = createAsyncThunk(
  "devices/addDevice",
  async ({ uid, name, room, type }, { rejectWithValue }) => {
    try {
      const id = nanoid();
      const newDevice = {
        id,
        uid,
        name,
        room,
        type,
        connected: false,
        
        state: { power: false, brightness: 75, speed: "Low", temp: 24 },
        createdAt: Date.now(),
      };
      await addDeviceToFirestore(newDevice);
      return newDevice;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// update device
export const updateDevice = createAsyncThunk(
  "devices/updateDevice",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      await updateDeviceInFirestore(id, updates);
      return { id, updates };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// delete device
export const deleteDevice = createAsyncThunk(
  "devices/deleteDevice",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDeviceFromFirestore(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const devicesSlice = createSlice({
  name: "devices",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addDevice.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateDevice.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const idx = state.list.findIndex((d) => d.id === id);
        if (idx >= 0) state.list[idx] = { ...state.list[idx], ...updates };
      })
      .addCase(deleteDevice.fulfilled, (state, action) => {
        state.list = state.list.filter((d) => d.id !== action.payload);
      });
  },
});

export default devicesSlice.reducer;
