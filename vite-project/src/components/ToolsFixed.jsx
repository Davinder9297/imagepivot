import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ToolsFixed() {
  // Removed text color from baseClasses
  const baseClasses = "px-4 py-2 bg-indigo-900 rounded transition";
  const activeClasses = "bg-white text-indigo-900 border-2 border-indigo-900 shadow-lg";
  const inactiveClasses = "text-white hover:bg-indigo-800";

  return (
    <div className="flex space-x-4 justify-start max-w-max p-4">
      <NavLink
        to="/image"
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        Image Operations
      </NavLink>

      <NavLink
        to="/convertaudio"
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        Audio Conversion
      </NavLink>

      <NavLink
        to="/convertvideo"
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        Video Conversion
      </NavLink>
    </div>
  );
}
