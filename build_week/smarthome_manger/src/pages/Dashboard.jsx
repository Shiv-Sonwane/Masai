// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import Topbar from "../components/Topbar";
import AddDeviceForm from "../components/AddDeviceForm";
import DeviceCard from "../components/DeviceCard";
import { useSelector, useDispatch } from "react-redux";
import { Plus, Clock, Home} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { selectRoom, fetchRooms } from "../features/rooms/roomsSlice";
import { fetchDevices } from "../features/devices/devicesSlice";
import { fetchRoutines } from "../features/routines/routinesSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((s) => s.auth.user);
  const devices = useSelector((s) => s.devices.list);
  const rooms = useSelector((s) => s.rooms.list);
  const selectedRoomId = useSelector((s) => s.rooms.selectedRoomId);
  const routines = useSelector((s) => s.routines?.list ?? []);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchRooms(user.uid));
      dispatch(fetchDevices(user.uid));
      dispatch(fetchRoutines(user.uid)); // Load routines from Firestore
    }
  }, [dispatch, user]);

  const filteredDevices =
    selectedRoomId === "all"
      ? devices
      : devices.filter((d) => d.room === selectedRoomId);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <main className="flex-1 p-6">
        <Topbar />

        <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2">
          <button
            onClick={() => dispatch(selectRoom("all"))}
            className={`px-3 py-1 rounded-full whitespace-nowrap ${
              selectedRoomId === "all"
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            All Rooms
          </button>

          {rooms.map((r) => (
            <button
               key={r.id}
               onClick={() => dispatch(selectRoom(r.id))}
               className={`px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-2 ${
                selectedRoomId === r.id ? "bg-blue-600 text-white" : "bg-white border"
               }`}
            >
              <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs">
                <Home size={14} />
              </span>
              <span>{r.name}</span>
            </button>
          ))}

          <button
            onClick={() => navigate("/rooms")}
            className="flex items-center gap-1 px-3 py-1 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition whitespace-nowrap"
          >
            <Plus size={16} />
            Add Room
          </button>

          <button
            onClick={() => navigate("/routines")}
            className="ml-2 flex items-center gap-2 px-3 py-1 rounded-full bg-white border hover:bg-gray-50 transition whitespace-nowrap"
          >
            <Clock size={14} />
            <span className="text-sm">Routines</span>
            {routines.length > 0 && (
              <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                {routines.length}
              </span>
            )}
          </button>
        </div>

        <AddDeviceForm />

        <h2 className="text-lg font-semibold mb-4">Devices in Selected Room</h2>

        {filteredDevices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDevices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No devices in this room.</p>
        )}
      </main>
    </div>
  );
}
