// src/features/devices/devicesSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  list: [], // all simulated devices
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    createDevice: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare({ name, room, type }) {
        return {
          payload: {
            id: nanoid(),
            name,
            room,
            type,
            connected: false,
            state: {
              power: false,
              brightness: 50,
              speed: "Low",
              temp: 24,
            },
          },
        };
      },
    },

    connectDevice(state, action) {
      const device = state.list.find((d) => d.id === action.payload);
      if (device) device.connected = true;
    },

    togglePower(state, action) {
      const device = state.list.find((d) => d.id === action.payload);
      if (device) device.state.power = !device.state.power;
    },

     // set brightness (0-100)
    setBrightness(state, action) {
      const { id, brightness } = action.payload;
      const d = state.list.find((x) => x.id === id);
      if (d) d.state.brightness = Math.max(0, Math.min(100, brightness));
    },

    // set fan speed (Low/Medium/High)
    setSpeed(state, action) {
      const { id, speed } = action.payload;
      const d = state.list.find((x) => x.id === id);
      if (d) d.state.speed = speed;
    },

    // set temperature for thermostat
    setTemp(state, action) {
      const { id, temp } = action.payload;
      const d = state.list.find((x) => x.id === id);
      if (d) d.state.temp = temp;
    },

    // remove device
    removeDevice(state, action) {
      state.list = state.list.filter((x) => x.id !== action.payload);
    },

    // optional: update device name or meta
    updateDeviceMeta(state, action) {
      const { id, updates } = action.payload;
      const idx = state.list.findIndex((x) => x.id === id);
      if (idx >= 0) state.list[idx] = { ...state.list[idx], ...updates };
    },
  },
});

export const {
  createDevice,
  connectDevice,
  togglePower,
  setBrightness,
  setSpeed,
  setTemp,
  removeDevice,
  updateDeviceMeta,
} = devicesSlice.actions;

export default devicesSlice.reducer;
