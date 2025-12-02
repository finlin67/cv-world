import React from 'react';
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

// A Map to get a nice icon for each category
const iconMap: { [key: string]: string } = {
  role: '💼',
  skill: '⚡',
  technology: '💻',
  project: '🏭',
};

interface SidebarProps {
  isOpen: boolean;
  groupedData: any;
  expandedCategory: string | null;
  onToggleCategory: (key: string) => void;
  activeHotspotId: string | null;
  onHotspotClick: (id: string) => void;
  mapControls: React.RefObject<ReactZoomPanPinchRef>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  groupedData,
  expandedCategory,
  onToggleCategory,
  activeHotspotId,
  onHotspotClick,
  mapControls
}) => {

  const handleZoomIn = () => mapControls.current?.zoomIn(0.2);
  const handleZoomOut = () => mapControls.current?.zoomOut(0.2);
  const handleReset = () => mapControls.current?.resetTransform();

  return (
    <div 
      className={`flex-shrink-0 flex flex-col border-r border-gray-800 bg-[#0b1221] shadow-2xl transition-all duration-300 z-20 ${
        isOpen ? 'w-80' : 'w-0'
      }`}
    >
      {/* This inner div is the key to preventing content from being visible during collapse */}
      <div className={`flex-1 flex flex-col overflow-hidden ${!isOpen && 'invisible'}`}>
        
        {/* Main Category List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {Object.entries(groupedData).map(([key, group]: [string, any]) => (
            <div key={key} className="mb-2">
              <button 
                onClick={() => onToggleCategory(key)}
                className="w-full flex justify-between items-center text-left text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-white mb-2 py-2 border-b border-gray-800 transition-colors"
              >
                {group.label}
                <span className="text-lg">{expandedCategory === key ? '−' : '+'}</span>
              </button>
              
              {expandedCategory === key && (
                <div className="pl-2 space-y-1 mt-2 border-l-2 border-blue-800/50">
                  {group.items.map((item: any) => (
                    <button 
                      key={item.id}
                      onClick={() => onHotspotClick(item.id)}
                      className={`w-full text-left cursor-pointer text-sm px-3 py-2 rounded transition-all flex items-center gap-3 ${
                        activeHotspotId === item.id 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-lg opacity-80">{iconMap[item.type] || '❓'}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer with Zoom Controls */}
        <div className="p-4 border-t border-gray-800">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-3">Map Controls</p>
            <div className="grid grid-cols-3 gap-2">
                <button onClick={handleZoomIn} className="py-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 font-bold text-lg flex items-center justify-center">+</button>
                <button onClick={handleZoomOut} className="py-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 font-bold text-lg flex items-center justify-center">-</button>
                <button onClick={handleReset} className="py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 text-xs font-bold">Reset</button>
            </div>
        </div>

      </div>
    </div>
  );
};
