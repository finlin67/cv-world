import React from 'react';

interface TableProps {
  data: any[];
  onItemClick: (id: string) => void;
  activeId: string | null;
}

export const DashboardTable: React.FC<TableProps> = ({ data, onItemClick, activeId }) => {
  return (
    <div className="h-full bg-[#0b1221] border-t border-gray-800 flex flex-col">
      {/* Table Header */}
      <div className="flex items-center px-6 py-3 bg-[#0f172a] border-b border-gray-800 sticky top-0 z-10">
        <div className="w-1/4 text-xs font-bold text-gray-400 uppercase tracking-wider">Entity Name</div>
        <div className="w-1/6 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</div>
        <div className="w-1/6 text-xs font-bold text-gray-400 uppercase tracking-wider">Timeline</div>
        <div className="flex-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Strategic Impact</div>
      </div>

      {/* Scrollable Rows */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {data.map((item) => (
          <div 
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`flex items-center px-6 py-3 border-b border-gray-800/50 cursor-pointer transition-all hover:bg-[#1e293b] group ${
              activeId === item.id ? 'bg-blue-900/20 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'
            }`}
          >
            {/* Name + Icon */}
            <div className="w-1/4 flex items-center gap-3">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                 item.type === 'role' ? 'bg-blue-600/20 text-blue-400' : 
                 item.type === 'skill' ? 'bg-purple-600/20 text-purple-400' : 
                 item.type === 'technology' ? 'bg-indigo-600/20 text-indigo-400' : 'bg-amber-600/20 text-amber-400'
              }`}>
                {item.type === 'role' ? '💼' : item.type === 'skill' ? '⚡' : item.type === 'technology' ? '💻' : '🏭'}
              </span>
              <span className={`font-bold text-sm ${activeId === item.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                {item.label}
              </span>
            </div>

            {/* Category Pill */}
            <div className="w-1/6">
              <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold border ${
                 item.type === 'role' ? 'border-blue-500/30 text-blue-400' : 
                 item.type === 'skill' ? 'border-purple-500/30 text-purple-400' : 
                 item.type === 'technology' ? 'border-indigo-500/30 text-indigo-400' : 'border-amber-500/30 text-amber-400'
              }`}>
                {item.type}
              </span>
            </div>

            {/* Timeline */}
            <div className="w-1/6 text-xs text-gray-500 font-mono">
              {item.startYear} — {item.endYear || 'Pres'}
            </div>

            {/* Impact */}
            <div className="flex-1 text-xs text-gray-400 truncate pr-4">
              {item.metrics && item.metrics[0] ? (
                <span className="flex items-center gap-2">
                  <span className="text-green-500">↗</span> {item.metrics[0]}
                </span>
              ) : (
                <span className="opacity-30">{item.summary}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};