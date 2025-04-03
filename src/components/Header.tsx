import { Bug } from "lucide-react";

const Header = () => (
  <header className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-2">
      <div className="logo-container">
        <Bug className="w-6 h-6 text-purple-400" />
      </div>
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
        Bug Reporter
      </h1>
    </div>
    <div className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">v1.0</div>
  </header>
);

export default Header; 