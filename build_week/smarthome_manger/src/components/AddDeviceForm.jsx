import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDevice } from "../features/devices/devicesSlice";

export default function AddDeviceForm() {
  const dispatch = useDispatch();
  const { selectedRoomId, list: rooms } = useSelector((state) => state.rooms);
  const user = useSelector((s) => s.auth.user);

  const [deviceName, setDeviceName] = useState("");
  const [type, setType] = useState("lamp");

  const handleAddDevice = (e) => {
    e.preventDefault();
    // validation: need logged in user and selected room
    if (!deviceName.trim() || !selectedRoomId || !user?.uid) return;

    dispatch(
      addDevice({
        uid: user.uid,
        name: deviceName,
        room: selectedRoomId,
        type,
      })
    );

    setDeviceName("");
    setType("lamp");
  };

  return (
    <form
      onSubmit={handleAddDevice}
      className="bg-white p-4 rounded shadow-sm mb-6 flex flex-col md:flex-row md:items-end gap-3"
    >
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Device Name</label>
        <input
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          placeholder="e.g. Bedroom Lamp"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="lamp">Lamp</option>
          <option value="fan">Fan</option>
          <option value="thermostat">Thermostat</option>
          <option value="ac">Air Conditioner</option>
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Device
      </button>
    </form>
  );
}
