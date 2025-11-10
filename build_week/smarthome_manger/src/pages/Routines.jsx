
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Clock, Trash2, Play, Edit2 } from "lucide-react";
import RoutineForm from "../components/RoutineForm";
import {
  fetchRoutines,
  addRoutineFirestore,
  updateRoutineFirestore,
  deleteRoutineFirestore,
} from "../features/routines/routinesSlice";
import { updateDevice } from "../features/devices/devicesSlice";

function nowInRange(start, end) {
  if (!start || !end) return false;
  const toMinutes = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const s = toMinutes(start);
  const e = toMinutes(end);
  if (s <= e) return nowMinutes >= s && nowMinutes <= e;
  return nowMinutes >= s || nowMinutes <= e;
}

export default function Routines() {
  const dispatch = useDispatch();
  const routines = useSelector((s) => s.routines.list || []);
  const devices = useSelector((s) => s.devices.list || []);
  const user = useSelector((s) => s.auth.user);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (user?.uid) dispatch(fetchRoutines(user.uid));
  }, [dispatch, user]);

  const runRoutine = async (r) => {
    for (const da of r.deviceActions) {
      const { id, action } = da;
      const device = devices.find((d) => d.id === id);
      if (!device) continue;
      const newState = { ...(device.state || {}), ...(action.state || {}) };
      try {
        await dispatch(updateDevice({ id, updates: { state: newState } })).unwrap();
      } catch (err) {
        console.error("Failed to update device", id, err);
      }
    }
    alert(`Routine "${r.name}" executed (simulated).`);
  };

  const toggleActive = async (r) => {
    try {
      await dispatch(updateRoutineFirestore({ id: r.id, updates: { active: !r.active } })).unwrap();
    } catch (err) {
      console.error("Failed to toggle routine", err);
    }
  };

  const removeRoutine = async (id) => {
    if (!confirm("Delete this routine?")) return;
    try {
      await dispatch(deleteRoutineFirestore(id)).unwrap();
    } catch (err) {
      console.error("Failed to delete routine", err);
    }
  };

  const handleAdd = async (payload) => {
    // payload: { name, startTime, endTime, deviceActions }
    if (!user?.uid) throw new Error("User not authenticated");
    await dispatch(addRoutineFirestore({ uid: user.uid, ...payload })).unwrap();
    // refresh fetch is optional (thunk already pushes)
  };

  const handleUpdate = async (payload) => {
    // payload should include name,startTime,endTime,deviceActions
    if (!editingId) return;
    await dispatch(updateRoutineFirestore({ id: editingId, updates: payload })).unwrap();
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Clock size={22} /> Routines
      </h1>

      {/* Add form */}
      <div className="mb-6">
        <RoutineForm onSubmit={handleAdd} submitLabel="Add Routine" />
      </div>

      {routines.length === 0 ? (
        <p className="text-gray-500">No routines yet. Add one above!</p>
      ) : (
        <div className="space-y-3">
          {routines.map((r) => (
            <div key={r.id} className="bg-white p-4 rounded shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">{r.name}</h4>
                    <p className="text-sm text-gray-500">
                      {r.startTime} — {r.endTime}{" "}
                      {nowInRange(r.startTime, r.endTime) && <span className="text-xs text-green-600 ml-2">(Now)</span>}
                    </p>
                    <p className="text-sm text-gray-500">Devices: {r.deviceActions?.map(d => devices.find(x => x.id === d.id)?.name || "Unknown").join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => runRoutine(r)} className="flex items-center gap-1 text-sm text-blue-600">
                  <Play size={16} /> Run
                </button>

                <button onClick={() => setEditingId(editingId === r.id ? null : r.id)} className="flex items-center gap-1 text-sm px-2 py-1 border rounded">
                  <Edit2 size={16} /> {editingId === r.id ? "Cancel" : "Edit"}
                </button>

                <button onClick={() => toggleActive(r)} className={`text-sm px-2 py-1 rounded ${r.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                  {r.active ? "Active" : "Inactive"}
                </button>

                <button onClick={() => removeRoutine(r.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Inline edit form */}
              {editingId === r.id && (
                <div className="w-full md:col-span-2 mt-3">
                  <RoutineForm initial={r} onSubmit={handleUpdate} submitLabel="Save Changes" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
