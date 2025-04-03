import { CheckCircle, X } from "lucide-react";
import React from "react";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification:React.FC<NotificationProps> = ({ message, onClose }) => (
  <div className="message-container">
    <div className="message">
      <CheckCircle className="w-4 h-4" />
      <span>{message}</span>
      <button className="message-close" onClick={onClose}>
        <X className="w-3 h-3" />
      </button>
    </div>
  </div>
);

export default Notification; 