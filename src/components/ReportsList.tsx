import { Clock, MessageSquare } from "lucide-react";
import { Report } from "../types/types";
import ReportItem from "./ReportItem";
import React from "react";

interface ReportsListProps {
  reports: Report[];
  formatDate: (date: string) => string;
  truncateUrl: (url: string, maxLength?: number) => string;
}

const ReportsList:React.FC<ReportsListProps> = ({ reports, formatDate, truncateUrl }) => (
  <div className="reports-container">
    <div className="reports-header">
      <h2 className="text-lg font-semibold flex items-center">
        <Clock className="w-4 h-4 mr-2 text-indigo-400" />
        Recent Reports
      </h2>
      <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
        {reports.length} / 5
      </span>
    </div>

    {reports.length === 0 ? (
      <div className="empty-state">
        <div className="empty-icon">
          <MessageSquare className="w-10 h-10 text-gray-600" />
        </div>
        <p className="empty-text">No reports yet</p>
        <p className="empty-subtext">Reports will appear here after submission</p>
      </div>
    ) : (
      <ul className="reports-list">
        {reports.map((report, index) => (
          <ReportItem
            key={index}
            report={report}
            formatDate={formatDate}
            truncateUrl={truncateUrl}
          />
        ))}
      </ul>
    )}
  </div>
);

export default ReportsList; 