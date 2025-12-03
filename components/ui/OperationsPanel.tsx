import React, { useState } from 'react';

interface OperationsPanelProps {
  data: any[];
  activeId: string | null;
  onItemClick: (id: string) => void;
  categories: { key: string; label: string }[];
  activeCategory: string | null;
  onSelectCategory: (key: string | null) => void;
}

export const OperationsPanel: React.FC<OperationsPanelProps> = ({ 
  data, 
  activeId, 
  onItemClick,
  categories,
  activeCategory,
  onSelectCategory
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter(item => {
    const matchesCategory = activeCategory ? item.type === activeCategory : true;
    const matchesSearch = searchQuery 
      ? item.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Assistant Suggestions
  const prompts = [
    { label: "Show Executive Roles", filter: "role" },
    { label: "Highlight RevOps Skills", filter: "skill" },
    { label: "Tech Stack", filter: "technology" }
  ];

  return (
    <div className="h-full bg-[#0b1221] border-t-4 border-blue-900 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50">
      
      {/* 1. ASSISTANT & FILTERS BAR */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-3 bg-[#0f172a] border-b border-gray-800 gap-4 flex-shrink-0">
        
        {/* Search / Assistant */}
        <div className="flex items-center gap-4 w-full md:w-1/2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">🤖</span>
            <input 
              type="text" 
              placeholder="Ask about ABM, Experience..." 
              className="w-full bg-[#1e293b] text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none text-sm font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Quick Prompts */}
          <div className="hidden md:flex gap-2">
            {prompts.map((p, i) => (
                <button 
                    key={i}
                    onClick={() => onSelectCategory(p.filter === activeCategory ? null : p.filter)}
                    className="text-[10px] bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white px-3 py-1.5 rounded-full border border-gray-700 transition-colors whitespace-nowrap"
                >
                    {p.label}
                </button>
            ))}
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 custom-scrollbar">
          <button 
            onClick={() => onSelectCategory(null)}
            className={`px-3 py-1 rounded text-[10px] font-bold uppercase whitespace-nowrap transition-all ${!activeCategory ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => onSelectCategory(cat.key === activeCategory ? null : cat.key)}
              className={`px-3 py-1 rounded text-[10px] font-bold uppercase whitespace-nowrap transition-all border ${
                activeCategory === cat.key 
                  ? 'bg-blue-600 text-white border-blue-500' 
                  : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. DATA TABLE */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0b1221]">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="sticky top-0 bg-[#0b1221] z-10 shadow-md">
            <tr className="text-gray-500 border-b border-gray-800 text-[10px] uppercase tracking-wider">
              <th className="p-3 w-1/3 font-bold">Entity Name</th>
              <th className="p-3 w-1/6 font-bold">Type</th>
              <th className="p-3 font-bold">Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {filteredData.map((item) => (
              <tr 
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={`cursor-pointer transition-all hover:bg-[#1e293b] group ${
                  activeId === item.id ? 'bg-blue-900/20 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'
                }`}
              >
                <td className="p-3 flex items-center gap-3">
                  <div className={`w-6 h-6 rounded flex items-center justify-center text-sm ${
                     item.type === 'role' ? 'bg-blue-600/20 text-blue-400' : 
                     item.type === 'skill' ? 'bg-purple-600/20 text-purple-400' : 
                     item.type === 'technology' ? 'bg-indigo-600/20 text-indigo-400' : 'bg-amber-600/20 text-amber-400'
                  }`}>
                    {item.type === 'role' ? '💼' : item.type === 'skill' ? '⚡' : item.type === 'technology' ? '💻' : '🏭'}
                  </div>
                  <span className={`font-bold text-xs ${activeId === item.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {item.label}
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-gray-800 text-[10px] text-gray-400 uppercase border border-gray-700">
                    {item.type}
                  </span>
                </td>
                <td className="p-3 text-gray-400 text-xs truncate max-w-xs">
                  {item.metrics && item.metrics[0] ? (
                    <span className="flex items-center gap-2">
                      <span className="text-green-500 font-bold">↗</span> {item.metrics[0]}
                    </span>
                  ) : (
                    <span className="opacity-30 italic">{item.summary}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};