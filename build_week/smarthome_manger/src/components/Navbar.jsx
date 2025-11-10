
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, Settings, User, Home, Layers, Clock } from "lucide-react";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  // Hide Navbar on auth pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const activeClass =
    "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1";
  const inactiveClass = "text-gray-600 hover:text-gray-800";

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left Section: Logo + Nav Links */}
        <div className="flex items-center gap-6">
          {/* Clickable Logo */}
          <button
            onClick={() => navigate("/dashboard")}
            className="text-xl font-bold text-gray-800 flex items-center gap-1 hover:text-blue-600 transition-colors duration-150 cursor-pointer"
            aria-label="Go to Dashboard"
          >
            <Home size={20} />
            SmartHome
          </button>

          {/* Navigation Links */}
          <nav className="hidden sm:flex items-center gap-4">
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
            <Layers size={14} className="inline-block mr-2" />Rooms
            </NavLink>
            <NavLink
              to="/routines"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
            <Clock size={14} className="inline-block mr-2" />Routines
            </NavLink>
          </nav>
        </div>

        {/* Right Section: User Info + Actions */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-700 hidden md:block">
            Hello, <span className="font-medium">{user?.email ?? "Guest"}</span>
          </div>

          <button
            title="Settings"
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => alert("Settings coming soon!")}
          >
            <Settings size={18} />
          </button>

          <button
            title="Profile"
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => alert("Profile coming soon!")}
          >
            <User size={18} />
          </button>

          <button
            onClick={handleLogout}
            className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
