// src/pages/Rooms.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRoom as addRoomAction, selectRoom, deleteRoom } from "../features/rooms/roomsSlice";
import { Home, Edit3, Trash2 } from "lucide-react";

export default function Rooms() {
  const dispatch = useDispatch();
  const rooms = useSelector((s) => s.rooms.list);
  const selectedRoomId = useSelector((s) => s.rooms.selectedRoomId);
  const user = useSelector((s) => s.auth.user); // if you want to connect to firestore later

  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    // re-use your existing local addRoom action which expects name string
    dispatch(addRoomAction(name));
    setName("");
  };

  const startEdit = (r) => {
    setEditingId(r.id);
    setEditingName(r.name);
  };

  const finishEdit = () => {
    if (!editingName.trim()) return;
    // simple local update via updateDeviceMeta or direct reducer - we'll reuse addRoom pattern by removing old and adding new
    // but simplest is to dispatch delete then add — or extend rooms slice; for now do quick approach:
    // dispatch(deleteRoom(editingId));
    // dispatch(addRoom(editingName));
    // We'll do a small inline dispatch for update if slice supports it — if not, use delete+add fallback
    // For safety, use delete+add fallback:
    dispatch(deleteRoom(editingId));
    dispatch(addRoomAction(editingName));
    setEditingId(null);
    setEditingName("");
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this room?")) return;
    dispatch(deleteRoom(id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Rooms</h1>

      <div className="bg-white p-4 rounded shadow-sm mb-6">
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New room name (e.g., Bedroom)"
            className="flex-1 border p-2 rounded"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
        </form>
      </div>

      <div className="grid gap-3">
        {rooms.length === 0 && (
          <p className="text-gray-500">No rooms yet. Add one using the form above.</p>
        )}

        {rooms.map((r) => (
          <div key={r.id} className="flex items-center justify-between bg-white p-3 rounded shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-blue-600">
                <Home size={18} />
              </div>
              {editingId === r.id ? (
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="border p-1 rounded"
                />
              ) : (
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-gray-500">ID: {r.id}</div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {editingId === r.id ? (
                <button onClick={finishEdit} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
              ) : (
                <button onClick={() => startEdit(r)} className="p-2 hover:bg-gray-50 rounded">
                  <Edit3 size={16} />
                </button>
              )}
              <button onClick={() => handleDelete(r.id)} className="p-2 hover:bg-gray-50 rounded text-red-600">
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => dispatch(selectRoom(r.id))}
                className={`ml-2 px-3 py-1 rounded ${selectedRoomId === r.id ? "bg-blue-600 text-white" : "border"}`}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
