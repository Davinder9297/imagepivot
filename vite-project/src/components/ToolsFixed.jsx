import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ToolsFixed() {
  const baseClasses = "px-4 py-2 bg-indigo-900 text-white rounded transition";
  const activeClasses = "text-red-800 border-2 border-indigo-900 bg-white  shadow-lg";

  return (
    <div className="flex space-x-4 justify-start max-w-max p-4">
      <NavLink
        to="/image"
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : "hover:bg-indigo-800"}`
        }
      >
        Image Operations
      </NavLink>

      <NavLink
        to="/convertaudio"
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : "hover:bg-indigo-800"}`
        }
      >
        Audio Conversion
      </NavLink>

      <NavLink
        to="/convertvideo"
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : "hover:bg-indigo-800"}`
        }
      >
        Video Conversion
      </NavLink>
    </div>
  );
}
