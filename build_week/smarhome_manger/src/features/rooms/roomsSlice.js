
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  list: [
    { id: "living-room", name: "Living Room" },
    { id: "bedroom", name: "Bedroom" },
  ],
  selectedRoomId: "living-room",
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    addRoom: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare(name) {
        return { payload: { id: nanoid(), name } };
      },
    },
    deleteRoom(state, action) {
      state.list = state.list.filter((room) => room.id !== action.payload);
      if (state.selectedRoomId === action.payload) {
        state.selectedRoomId = state.list[0]?.id || null;
      }
    },
    selectRoom(state, action) {
      state.selectedRoomId = action.payload;
    },
  },
});

export const { addRoom, deleteRoom, selectRoom } = roomsSlice.actions;
export default roomsSlice.reducer;
