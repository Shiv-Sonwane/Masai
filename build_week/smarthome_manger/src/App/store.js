import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import devicesReducer from "../features/devices/devicesSlice.js";
import roomsReducer from "../features/rooms/roomsSlice.js";
import routinesReducer from "../features/routines/routinesSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    devices: devicesReducer,
    rooms: roomsReducer,
    routines: routinesReducer,
  },
});
