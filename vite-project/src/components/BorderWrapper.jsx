import React from "react";
import ToolsFixed from "./ToolsFixed";

const BorderWrapper = ({ children }) => {
  return (
    <div className="border-2 border-indigo-900  rounded-md m-5">
    <ToolsFixed/>
      {children}
    </div>
  );
};

export default BorderWrapper;