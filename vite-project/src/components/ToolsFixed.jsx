import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ToolsFixed() {
  // Removed text color from baseClasses
  const baseClasses = "px-4 py-2 bg-gray-100 transition font-semibold";
  const activeClasses = " text-indigo-900 bg-gray-300 border-b-2 border-l-2 border-r-2 border-indigo-900 shadow-lg ";
  const inactiveClasses = "text-indigo-900";

  return (
    <div className="flex justify-start w-fit">
      <NavLink
        to="/image"
        className={({ isActive }) =>
          `${baseClasses} ${!isActive ? activeClasses : inactiveClasses}`
        }
      >
        Image Operations
      </NavLink>

      <NavLink
        to="/convertaudio"
        className={({ isActive }) =>
          `${baseClasses} ${!isActive ? activeClasses : inactiveClasses}`
        }
      >
        Audio Conversion
      </NavLink>

      <NavLink
        to="/convertvideo"
        className={({ isActive }) =>
          `${baseClasses} ${!isActive ? activeClasses : inactiveClasses}`
        }
      >
        Video Conversion
      </NavLink>
    </div>
  );
}
