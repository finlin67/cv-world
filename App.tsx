import React, { useState, useRef } from 'react';
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

import InteractiveMap from './components/Map/InteractiveMap'; 
import { TopBar } from './components/ui/TopBar'; 
import { OperationsPanel } from './components/ui/OperationsPanel';
import { WelcomeModal } from './components/ui/WelcomeModal';
import { RESUME_DATA, getGroupedData } from './data';

const App: React.FC = () => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  
  const [expandedCategory, setExpandedCategory] = useState<string | null>("role");
  const [showWelcome, setShowWelcome] = useState(true);

  const mapRef = useRef<ReactZoomPanPinchRef>(null);

  const safeData = RESUME_DATA || [];
  const groupedData = getGroupedData();
  const categories = Object.entries(groupedData).map(([key, group]: [string, any]) => ({
    key,
    label: group.label
  }));

  const activeHotspot = activeHotspotId ? safeData.find(h => h.id === activeHotspotId) : null;

  const handleHotspotClick = (id: string) => {
    if (!id) { setActiveHotspotId(null); return; }
    setActiveHotspotId(id);
    
    // Zoom to item
    const item = safeData.find(i => i.id === id);
    if (item && mapRef.current) {
        mapRef.current.zoomTo(0.6, 500); 
    }
  };

  const handleCategorySelect = (key: string | null) => {
    setExpandedCategory(expandedCategory === key ? null : key);
    if (!isLeftSidebarOpen) setIsLeftSidebarOpen(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#050b14] text-gray-300 font-sans overflow-hidden">
      
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}

      <TopBar 
        categories={categories}
        activeCategory={expandedCategory}
        onSelectCategory={handleCategorySelect}
        isSidebarOpen={isLeftSidebarOpen}
        onToggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
        onOpenTable={() => {}} 
      />

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT SIDEBAR */}
        <div className={`${isLeftSidebarOpen ? 'w-64' : 'w-16'} flex-shrink-0 bg-[#0b1221] border-r border-gray-800 z-20 flex flex-col transition-all duration-300 relative`}>
          <button onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)} className="absolute top-3 -right-3 bg-[#1a2333] border border-gray-700 text-gray-400 hover:text-white p-1 rounded-full shadow-lg z-50 w-6 h-6 flex items-center justify-center text-[10px]">
            {isLeftSidebarOpen ? '◀' : '▶'}
          </button>

          {isLeftSidebarOpen ? (
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              {Object.entries(groupedData).map(([key, group]: [string, any]) => (
                <div key={key} className="mb-6">
                  <div className="text-sm font-bold uppercase text-white mb-3 tracking-wider flex items-center gap-2 border-b border-gray-800 pb-2">
                    <span className="text-blue-500">///</span> {group.label}
                  </div>
                  <div className="space-y-1 pl-2">
                    {group.items.map((item: any) => (
                      <button 
                        key={item.id}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => handleHotspotClick(item.id)}
                        className={`block w-full text-left py-2 px-3 rounded-md text-sm font-medium transition-all ${
                          activeHotspotId === item.id ? 'text-white bg-blue-600 font-bold shadow-lg' : 
                          hoveredId === item.id ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center pt-6 gap-4">
               {categories.map(cat => (
                 <button key={cat.key} onClick={() => handleCategorySelect(cat.key)} className="w-10 h-10 rounded bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center font-bold text-lg">
                   {cat.label[0]}
                 </button>
               ))}
            </div>
          )}
        </div>

        {/* CENTER COLUMN */}
        <div className="flex-1 flex flex-col min-w-0 relative">
            
            {/* MAP AREA (75%) */}
            <div className="h-[75%] relative bg-[#0b1221] overflow-hidden border-b-4 border-blue-900 z-10">
               <InteractiveMap 
                  ref={mapRef}
                  hotspots={safeData} 
                  activeHotspotId={activeHotspotId}
                  activeHotspot={activeHotspot} 
                  hoveredId={hoveredId}
                  currentYear={2025}
                  onHotspotClick={handleHotspotClick}
                  onHoverChange={setHoveredId}
                  onClosePopup={() => setActiveHotspotId(null)}
                  onBackgroundClick={() => setActiveHotspotId(null)}
                />
            </div>

            {/* OPERATIONS CONSOLE (25%) */}
            <div className="h-[25%] bg-[#0b1221] z-20 flex flex-col relative shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <OperationsPanel 
                    data={safeData}
                    activeId={activeHotspotId}
                    onItemClick={handleHotspotClick}
                    categories={categories}
                    activeCategory={expandedCategory}
                    onSelectCategory={setExpandedCategory}
                />
            </div>
        </div>

      </div>
    </div>
  );
};

export default App;