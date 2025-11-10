
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoutineFirestore } from "../features/routines/routinesSlice";

export default function AddRoutineForm() {
  const dispatch = useDispatch();
  const devices = useSelector((s) => s.devices.list || []);
  const user = useSelector((s) => s.auth.user);

  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selected, setSelected] = useState({});
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const toggleSelect = (id, deviceType) => {
    setSelected((p) =>
      p[id]
        ? Object.fromEntries(Object.entries(p).filter(([k]) => k !== id))
        : { ...p, [id]: defaultActionForType(deviceType) }
    );
  };

  const defaultActionForType = (type) => {
    if (type === "lamp") return { power: true, brightness: 50 };
    if (type === "fan") return { power: true, speed: "Medium" };
    if (type === "thermostat") return { power: true, temp: 24 };
    return { power: true };
  };

  const updateSelectedField = (id, field, value) => {
    setSelected((p) => ({ ...p, [id]: { ...p[id], [field]: value } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError("Please enter a name");
    if (!startTime || !endTime) return setError("Please set start and end times");
    const deviceIds = Object.keys(selected);
    if (deviceIds.length === 0) return setError("Select at least one device");
    if (!user?.uid) return setError("User not authenticated");

    const deviceActions = deviceIds.map((id) => ({
      id,
      action: { state: selected[id] },
    }));

    setBusy(true);
    try {
      await dispatch(
        addRoutineFirestore({
          uid: user.uid,
          name,
          startTime,
          endTime,
          deviceActions,
        })
      ).unwrap();

      // success
      setName("");
      setStartTime("");
      setEndTime("");
      setSelected({});

    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm mb-6 space-y-3">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <h3 className="font-semibold text-lg">Create Routine (time range)</h3>

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Routine name" className="w-full p-2 border rounded" />

      <div className="flex gap-2">
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="flex-1 p-2 border rounded"/>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="flex-1 p-2 border rounded"/>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Select & configure devices</p>
        {devices.length === 0 && <div className="text-sm text-yellow-600">No devices available</div>}
        <div className="grid gap-2">
          {devices.map((d) => {
            const cfg = selected[d.id];
            return (
              <div key={d.id} className="p-2 bg-gray-50 rounded flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={!!cfg} onChange={() => toggleSelect(d.id, d.type)} />
                  <div>
                    <div className="font-medium">{d.name}</div>
                    <div className="text-xs text-gray-500">{d.type} • {d.room}</div>
                  </div>
                </div>

                {cfg && (
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1 text-sm">Power
                      <input type="checkbox" checked={cfg.power} onChange={(e) => updateSelectedField(d.id, "power", e.target.checked)} />
                    </label>

                    {d.type === "lamp" && (
                      <>
                        <input type="range" min="0" max="100" value={cfg.brightness} onChange={(e) => updateSelectedField(d.id, "brightness", Number(e.target.value))} />
                        <div className="text-sm">{cfg.brightness}%</div>
                      </>
                    )}

                    {d.type === "fan" && (
                      <select value={cfg.speed} onChange={(e) => updateSelectedField(d.id, "speed", e.target.value)} className="p-1 border rounded">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    )}

                    {d.type === "thermostat" && (
                      <input type="number" min="16" max="30" value={cfg.temp} onChange={(e) => updateSelectedField(d.id, "temp", Number(e.target.value))} className="w-20 p-1 border rounded" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={busy} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60">
          {busy ? "Adding..." : "Add Routine"}
        </button>
      </div>
    </form>
  );
}
