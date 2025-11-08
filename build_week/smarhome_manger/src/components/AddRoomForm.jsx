// src/components/AddRoomForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRoom } from "../features/rooms/roomsSlice";

export default function AddRoomForm() {
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    dispatch(addRoom(roomName));
    setRoomName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Add new room..."
        className="flex-1 border p-2 rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
}
