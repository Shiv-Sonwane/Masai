// src/components/DeviceCard.jsx
import React from "react";
import { useDispatch } from "react-redux";
import {
  connectDevice,
  togglePower,
  setBrightness,
  setSpeed,
  setTemp,
  removeDevice,
} from "../features/devices/devicesSlice";
import { Power, Plug, Trash2 } from "lucide-react";

export default function DeviceCard({ device }) {
  const dispatch = useDispatch();

  const handleConnect = () => {
    dispatch(connectDevice(device.id));
  };

  const handleTogglePower = () => {
    dispatch(togglePower(device.id));
  };

  const changeBrightness = (e) => {
    dispatch(setBrightness({ id: device.id, brightness: Number(e.target.value) }));
  };

  const changeSpeed = (e) => {
    dispatch(setSpeed({ id: device.id, speed: e.target.value }));
  };

  const changeTemp = (e) => {
    dispatch(setTemp({ id: device.id, temp: Number(e.target.value) }));
  };

  const handleRemove = () => {
    if (confirm(`Remove device "${device.name}"?`)) {
      dispatch(removeDevice(device.id));
    }
  };

  const disabled = !device.connected;

  return (
    <div className="bg-white p-4 rounded shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-gray-800">{device.name}</h4>
          <p className="text-xs text-gray-500">
            {device.type} • {device.room}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {!device.connected ? (
            <button
              onClick={handleConnect}
              className="inline-flex items-center gap-1 text-sm px-2 py-1 border rounded text-blue-600"
            >
              <Plug size={14} />
              Connect
            </button>
          ) : (
            <span className="text-green-600 text-sm font-medium">Connected</span>
          )}
          <button
            onClick={handleRemove}
            title="Remove device"
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-3 text-sm space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-500">Power:</span>{" "}
            <span className="font-medium">{device.state.power ? "On" : "Off"}</span>
          </div>

          <button
            onClick={handleTogglePower}
            disabled={disabled}
            className={`flex items-center gap-2 px-3 py-1 rounded text-white text-sm ${
              device.state.power ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Power size={14} />
            {device.state.power ? "Turn Off" : "Turn On"}
          </button>
        </div>

        {/* Lamp controls */}
        {device.type === "lamp" && (
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Brightness</label>
            <input
              type="range"
              min="0"
              max="100"
              value={device.state.brightness}
              onChange={changeBrightness}
              disabled={disabled}
              className={`w-full ${disabled ? "opacity-50" : ""}`}
            />
            <div className="text-xs text-gray-600"> {device.state.brightness}%</div>
          </div>
        )}

        {/* Fan controls */}
        {device.type === "fan" && (
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Speed</label>
            <select
              value={device.state.speed}
              onChange={changeSpeed}
              disabled={disabled}
              className="p-1 border rounded"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <div className="text-xs text-gray-600">Current: {device.state.speed}</div>
          </div>
        )}

        {/* Thermostat controls */}
        {device.type === "thermostat" && (
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Temperature (°C)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="16"
                max="30"
                value={device.state.temp}
                onChange={changeTemp}
                disabled={disabled}
                className="w-20 p-1 border rounded"
              />
              <div className="text-xs text-gray-600">Set between 16–30°C</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
