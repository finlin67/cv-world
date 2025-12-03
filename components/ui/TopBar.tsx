import React, { useState } from 'react';

interface TopBarProps {
  categories: { label: string; key: string }[];
  activeCategory: string | null;
  onSelectCategory: (key: string | null) => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenTable: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  categories, 
  activeCategory, 
  onSelectCategory,
  onToggleSidebar,
  onOpenTable
}) => {
  const [showPrompts, setShowPrompts] = useState(false);

  return (
    <div className="h-16 bg-[#0b1221] border-b border-gray-800 flex items-center justify-between px-4 z-50 shadow-lg shrink-0 relative">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="p-2 text-gray-400 hover:text-white rounded">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold tracking-wider text-white leading-none">CAREER CITY</h1>
          <span className="text-[10px] text-blue-500 uppercase tracking-widest">Michael Findling</span>
        </div>
      </div>

      <div className="hidden md:block relative">
        <button 
          onClick={() => setShowPrompts(!showPrompts)}
          className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#334155] text-gray-300 px-4 py-2 rounded-full border border-gray-700 transition-all text-sm w-64"
        >
          <span>🤖</span>
          <span>Ask about experience...</span>
          <span className="ml-auto text-gray-500">▼</span>
        </button>
        {showPrompts && (
          <div className="absolute top-full left-0 mt-2 w-80 bg-[#1e293b] border border-gray-700 rounded-xl shadow-2xl p-2 z-[60]">
            <div className="text-[10px] font-bold text-gray-500 uppercase p-2">Suggested Prompts</div>
            <button className="w-full text-left p-2 hover:bg-blue-600 rounded text-sm text-white">Show Executive Roles</button>
            <button className="w-full text-left p-2 hover:bg-blue-600 rounded text-sm text-white">Highlight RevOps Skills</button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenTable}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold rounded border border-gray-600 transition-colors"
        >
          <span>📊</span> Data View
        </button>
        <a href="mailto:email@example.com" className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded transition-colors">
          Contact
        </a>
      </div>
    </div>
  );
};