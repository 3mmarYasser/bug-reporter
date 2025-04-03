import { Clock, Link2, MessageSquare } from "lucide-react";
import { Report } from "../types/types";
import React from "react";

interface ReportItemProps {
  report: Report;
  formatDate: (date: string) => string;
  truncateUrl: (url: string, maxLength?: number) => string;
}

const ReportItem:React.FC<ReportItemProps> = ({ report, formatDate, truncateUrl }) => (
  <li className="report-item">
    <div className="report-header">
      <span className="report-time">
        <Clock className="w-3 h-3 mr-1" />
        {formatDate(report.timestamp)}
      </span>
    </div>
    <div className="report-url">
      <Link2 className="w-3 h-3 mr-1" />
      <span title={report.url}>{truncateUrl(report.url)}</span>
    </div>
    <div className="report-element">
      <span className="element-label">Element:</span>
      <span className="element-text">{report.elementText || "No text"}</span>
    </div>
    <div className="report-note">
      <MessageSquare className="w-3 h-3 mr-1" />
      {report.note || "No notes provided"}
    </div>
  </li>
);

export default ReportItem; 