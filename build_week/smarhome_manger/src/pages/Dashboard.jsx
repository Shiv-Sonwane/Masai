
import React from "react";
import Topbar from "../components/Topbar";
import AddDeviceForm from "../components/AddDeviceForm";
import DeviceCard from "../components/DeviceCard";
import { useSelector,useDispatch } from "react-redux";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { selectRoom } from "../features/rooms/roomsSlice";

export default function Dashboard() {
  const devices = useSelector((s) => s.devices.list);
  const selectedRoomId = useSelector((s) => s.rooms.selectedRoomId);
  const navigate = useNavigate();

  const rooms = useSelector((s) => s.rooms.list);
  const dispatch = useDispatch();

  const filteredDevices = selectedRoomId === "all"
  ? devices
  : devices.filter((d) => d.room === selectedRoomId);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <main className="flex-1 p-6">
        <Topbar />

          {/* ROOM SELECTOR BAR */}
        <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2">
          <button
            onClick={() => dispatch(selectRoom("all"))}
            className={`px-3 py-1 rounded-full whitespace-nowrap ${
              selectedRoomId === "all" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            All Rooms
          </button>

          {rooms.map((r) => (
            <button
              key={r.id}
              onClick={() => dispatch(selectRoom(r.id))}
              className={`px-3 py-1 rounded-full whitespace-nowrap ${
                selectedRoomId === r.id ? "bg-blue-600 text-white" : "bg-white border"
              }`}
            >
              {r.name}
            </button>
          ))}

          <button
            onClick={() => navigate("/rooms")}
            className="flex items-center gap-1 px-3 py-1 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
          >
            <Plus size={16} />
            Add Room
          </button>
        </div>

        <AddDeviceForm />

        <h2 className="text-lg font-semibold mb-4">
          Devices in Selected Room
        </h2>

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
