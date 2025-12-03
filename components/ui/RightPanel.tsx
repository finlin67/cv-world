import React, { useState, useMemo } from 'react';

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: any | null;
  visibleItems: any[];
  hoveredId: string | null;
  onHoverChange: (id: string | null) => void;
  onItemClick: (id: string) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({ 
  isOpen, 
  onClose, 
  activeItem, 
  visibleItems,
  hoveredId,
  onHoverChange,
  onItemClick 
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery) return visibleItems;
    return visibleItems.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [visibleItems, searchQuery]);

  return (
    <div 
      className={`${isOpen ? 'w-96 translate-x-0' : 'w-0 translate-x-full'} flex-shrink-0 bg-[#0b1221] border-l border-gray-800 shadow-2xl z-30 transition-all duration-300 relative flex flex-col h-full`}
    >
      {/* Header */}
      <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0f172a] flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${activeItem ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`}></div>
          <h2 className="text-xs font-bold text-white uppercase tracking-widest">
            {activeItem ? "Intel Brief" : "Assistant"}
          </h2>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        
        {activeItem ? (
          /* DETAIL VIEW */
          <div className="p-6 animate-fade-in-up">
            <button 
              onClick={() => onItemClick("")}
              className="mb-6 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              ← Back to Search
            </button>

            <div className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${activeItem.type === 'role' ? 'bg-blue-900 text-blue-300' : 'bg-purple-900 text-purple-300'}`}>
              {activeItem.type}
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2 leading-tight">{activeItem.label}</h1>
            
            {/* Category Subtitle instead of Dates */}
            <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-6 pb-4 border-b border-gray-800">
              {activeItem.districtId ? activeItem.districtId.replace('-', ' ') : 'Experience'}
            </div>

            <p className="text-sm text-gray-300 mb-6 leading-relaxed border-l-2 border-blue-500 pl-4 bg-gray-900/50 p-3 rounded-r">
              {activeItem.description}
            </p>

            <div className="bg-[#111827] p-5 rounded-xl border border-gray-800">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-3 tracking-widest">Key Outcomes</h4>
              {activeItem.metrics?.map((m: string, i: number) => (
                <div key={i} className="text-xs flex gap-3 text-gray-300 items-start mt-2">
                  <span className="text-green-500 font-bold">✓</span> <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* CHATBOT / SEARCH VIEW */
          <div className="flex flex-col h-full">
            <div className="p-6 pb-0">
                <div className="bg-[#1e293b] p-3 rounded-lg border border-gray-700 flex items-center gap-2 mb-4">
                    <span className="text-xl">🔎</span>
                    <input 
                        type="text" 
                        placeholder="Search roles, skills..."
                        className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6">
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">
                    {searchQuery ? `Results for "${searchQuery}"` : "Data Points"}
                </p>
                
                <div className="space-y-2">
                    {filteredItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => onItemClick(item.id)}
                            onMouseEnter={() => onHoverChange(item.id)}
                            onMouseLeave={() => onHoverChange(null)}
                            className={`w-full text-left p-3 rounded-lg border transition-all text-sm flex justify-between items-center group ${
                                hoveredId === item.id 
                                    ? 'bg-blue-600/20 border-blue-500 text-white' 
                                    : 'bg-[#1e293b] border-gray-700 text-gray-400 hover:border-gray-500'
                            }`}
                        >
                            <span>{item.label}</span>
                            <span className="text-[10px] uppercase opacity-50">{item.type}</span>
                        </button>
                    ))}
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};