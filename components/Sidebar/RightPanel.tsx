import React from 'react';

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: any | null;
  allItems: any[]; // Need access to all items to find connections
  onItemClick: (id: string) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({ 
  isOpen, 
  onClose, 
  activeItem, 
  allItems,
  onItemClick 
}) => {
  
  // Helper: Find related items (The "Features" of the selected package)
  const relatedItems = activeItem && activeItem.relatedIds 
    ? allItems.filter(i => activeItem.relatedIds.includes(i.id))
    : [];

  return (
    <div 
      className={`${isOpen ? 'w-96 translate-x-0' : 'w-0 translate-x-full'} flex-shrink-0 bg-[#0f172a] border-l border-gray-800 shadow-2xl z-30 transition-all duration-300 relative flex flex-col h-full`}
    >
      {/* Header */}
      <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#1e293b] flex-shrink-0">
        <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest">
          {activeItem ? "Role Specification" : "System Overview"}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-white">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {activeItem ? (
          <div className="animate-fade-in-up">
            {/* 1. Title Block */}
            <div className="mb-6">
               <div className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${activeItem.type === 'role' ? 'bg-blue-900 text-blue-300' : 'bg-green-900 text-green-300'}`}>
                  {activeItem.type}
                </div>
                <h1 className="text-2xl font-bold text-white mb-2 leading-tight">{activeItem.label}</h1>
                <div className="text-xs text-gray-400 font-mono">{activeItem.startYear} — {activeItem.endYear || 'Present'}</div>
            </div>

            {/* 2. Description */}
            <p className="text-sm text-gray-300 mb-8 leading-relaxed border-l-2 border-blue-500 pl-4">
              {activeItem.description}
            </p>

            {/* 3. The "Features" List (Disney Price Board Style) */}
            {relatedItems.length > 0 && (
              <div className="mb-8">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-3 tracking-widest">Included Capabilities</h4>
                <div className="grid grid-cols-1 gap-2">
                  {relatedItems.map(item => (
                    <button 
                      key={item.id}
                      onClick={() => onItemClick(item.id)}
                      className="flex items-center gap-3 p-2 rounded bg-[#1e293b] hover:bg-[#334155] transition-colors border border-gray-700 text-left"
                    >
                      <div className={`w-2 h-2 rounded-full ${item.type === 'skill' ? 'bg-pink-500' : 'bg-indigo-500'}`}></div>
                      <div>
                        <div className="text-xs font-bold text-gray-200">{item.label}</div>
                        <div className="text-[10px] text-gray-500 uppercase">{item.type}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Results / Metrics */}
            <div className="bg-[#1e293b] p-5 rounded-xl border border-gray-700">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-widest">Performance Metrics</h4>
              {activeItem.metrics && activeItem.metrics.length > 0 ? (
                <ul className="space-y-3">
                  {activeItem.metrics.map((m: string, i: number) => (
                    <li key={i} className="text-xs flex gap-3 text-gray-300 items-start">
                      <span className="text-green-400 font-bold">✓</span> 
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-xs text-gray-500 italic">No metrics available.</div>
              )}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <p className="text-sm">Select a location on the map to view capabilities.</p>
          </div>
        )}
      </div>
    </div>
  );
};