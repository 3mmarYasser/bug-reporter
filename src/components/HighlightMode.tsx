import { Flag, AlertTriangle } from "lucide-react";
import React from "react";

interface HighlightModeProps {
  isHighlightMode: boolean;
  onToggle: () => void;
}

const HighlightMode:React.FC<HighlightModeProps> = ({ isHighlightMode, onToggle }) => (
  <div className="highlight-mode-container mb-6">
    <button className={`toggle-button ${isHighlightMode ? "active" : ""}`} onClick={onToggle}>
      <div className="toggle-button-content">
        <Flag className={`w-5 h-5 ${isHighlightMode ? "text-red-300" : "text-green-300"}`} />
        <span>{isHighlightMode ? "Disable Highlight Mode" : "Enable Highlight Mode"}</span>
      </div>
      <div className="toggle-button-status">{isHighlightMode ? "ON" : "OFF"}</div>
    </button>
    <div className="text-xs text-gray-400 mt-2 flex items-center">
      <AlertTriangle className="w-3 h-3 mr-1" />
      <span>
        Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> to toggle
      </span>
    </div>
  </div>
);

export default HighlightMode; 