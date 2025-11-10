// src/components/RoutineForm.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function RoutineForm({ initial = null, onSubmit, submitLabel = "Save" }) {
  const devices = useSelector((s) => s.devices.list || []);
  const [name, setName] = useState(initial?.name ?? "");
  const [startTime, setStartTime] = useState(initial?.startTime ?? "");
  const [endTime, setEndTime] = useState(initial?.endTime ?? "");
  const [selected, setSelected] = useState(() =>
    (initial?.deviceActions || []).reduce((acc, da) => {
      acc[da.id] = da.action?.state ?? {};
      return acc;
    }, {})
  );
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // if initial changes (editing another routine) reset form
    if (initial) {
      setName(initial.name || "");
      setStartTime(initial.startTime || "");
      setEndTime(initial.endTime || "");
      setSelected(
        (initial.deviceActions || []).reduce((acc, da) => {
          acc[da.id] = da.action?.state ?? {};
          return acc;
        }, {})
      );
    }
  }, [initial]);

  const defaultActionForType = (type) => {
    if (type === "lamp") return { power: true, brightness: 50 };
    if (type === "fan") return { power: true, speed: "Medium" };
    if (type === "thermostat") return { power: true, temp: 24 };
    return { power: true };
  };

  const toggleSelect = (id, deviceType) => {
    setSelected((p) =>
      p[id] ? Object.fromEntries(Object.entries(p).filter(([k]) => k !== id)) : { ...p, [id]: defaultActionForType(deviceType) }
    );
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

    const deviceActions = deviceIds.map((id) => ({ id, action: { state: selected[id] } }));

    setBusy(true);
    try {
      await onSubmit({ name, startTime, endTime, deviceActions });
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm mb-6 space-y-3">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{initial ? "Edit Routine" : "Create Routine (time range)"}</h3>
        <div className="text-xs text-gray-500">{initial ? "editing" : ""}</div>
      </div>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Routine name"
        className="w-full p-2 border rounded"
      />

      <div className="flex gap-2">
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="flex-1 p-2 border rounded" />
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="flex-1 p-2 border rounded" />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Select & configure devices</p>
        <div className="grid gap-2">
          {devices.map((d) => {
            const cfg = selected[d.id];
            const checked = !!cfg;
            return (
              <div key={d.id} className="bg-gray-50 p-2 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={checked} onChange={() => toggleSelect(d.id, d.type)} />
                  <div>
                    <div className="font-medium">{d.name}</div>
                    <div className="text-xs text-gray-500">{d.type} • {d.room}</div>
                  </div>
                </div>

                {checked && (
                  <div className="flex gap-3 items-center">
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

      <div className="flex justify-end gap-2">
        <button type="submit" disabled={busy} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60">
          {busy ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
