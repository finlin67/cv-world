import React, { useState, useRef } from 'react';
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

// --- IMPORTS ---
import InteractiveMap from './components/Map/InteractiveMap'; 
import { CapabilityMatrix } from './components/Matrix/CapabilityMatrix'; // <--- NEW COMPONENT
import { TopBar } from './components/ui/TopBar'; 
import { Timeline } from './components/ui/Timeline';
import { RESUME_DATA, getGroupedData } from './data';

const App: React.FC = () => {
  // --- STATE ---
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("role");
  const [currentYear, setCurrentYear] = useState<number>(2025);

  const mapRef = useRef<ReactZoomPanPinchRef>(null);

  // --- DATA ---
  const safeData = RESUME_DATA || [];
  const groupedData = getGroupedData();
  const categories = Object.entries(groupedData).map(([key, group]: [string, any]) => ({
    key,
    label: group.label
  }));

  const activeHotspot = activeHotspotId ? safeData.find(h => h.id === activeHotspotId) : null;

  // --- HANDLERS ---
  const handleHotspotClick = (id: string) => {
    setActiveHotspotId(id);
    setIsRightSidebarOpen(true);
  };

  const handleCategorySelect = (key: string | null) => {
    setExpandedCategory(expandedCategory === key ? null : key);
    if (!isLeftSidebarOpen) setIsLeftSidebarOpen(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#050b14] text-gray-300 font-sans overflow-hidden">
      
      {/* 1. HEADER */}
      <TopBar 
        categories={categories}
        activeCategory={expandedCategory}
        onSelectCategory={handleCategorySelect}
        isSidebarOpen={isLeftSidebarOpen}
        onToggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
      />

      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. LEFT SIDEBAR (Navigation) */}
        <div className={`${isLeftSidebarOpen ? 'w-64' : 'w-16'} flex-shrink-0 bg-[#0b1221] border-r border-gray-800 z-20 flex flex-col transition-all duration-300 relative`}>
          <button
            onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
            className="absolute top-3 -right-3 bg-[#1a2333] border border-gray-700 text-gray-400 hover:text-white p-1 rounded-full shadow-lg z-50 w-6 h-6 flex items-center justify-center text-[10px]"
          >
            {isLeftSidebarOpen ? '◀' : '▶'}
          </button>

          {isLeftSidebarOpen ? (
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-4 pt-6">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Explorer</h3>
                {Object.entries(groupedData).map(([key, group]: [string, any]) => (
                  <div key={key} className="mb-2">
                    <button 
                      onClick={() => handleCategorySelect(key)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase rounded-md transition-colors ${expandedCategory === key ? 'bg-blue-900/30 text-blue-400' : 'text-gray-400 hover:bg-gray-800'}`}
                    >
                      <span>{group.label}</span>
                      <span className="text-[10px]">{expandedCategory === key ? '▼' : '▶'}</span>
                    </button>
                    {expandedCategory === key && (
                      <div className="mt-1 ml-2 pl-2 border-l border-gray-700 space-y-0.5">
                        {group.items.map((item: any) => (
                          <button 
                            key={item.id}
                            onClick={() => handleHotspotClick(item.id)}
                            className={`block w-full text-left py-1.5 px-2 rounded text-xs truncate transition-colors ${
                              activeHotspotId === item.id 
                                ? 'text-white font-medium bg-blue-600/20' 
                                : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center pt-6 gap-3">
               {categories.map(cat => (
                 <button 
                  key={cat.key} 
                  onClick={() => handleCategorySelect(cat.key)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${expandedCategory === cat.key ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-500 hover:text-white'}`}
                  title={cat.label}
                 >
                   {cat.label[0]}
                 </button>
               ))}
            </div>
          )}
        </div>

        {/* 3. CENTER STAGE (Split View) */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          
          {/* A. MAP (Top 55%) */}
          <div className="h-[55%] relative bg-[#A1D2F7] overflow-hidden border-b border-gray-800 shadow-2xl z-10">
             <InteractiveMap 
                ref={mapRef}
                hotspots={safeData} 
                activeHotspotId={activeHotspotId}
                currentYear={currentYear}
                onHotspotClick={handleHotspotClick}
                onBackgroundClick={() => setIsRightSidebarOpen(false)}
              />
              
              <div className="absolute bottom-4 right-4 flex gap-1 z-10">
                 <button onClick={() => mapRef.current?.zoomOut()} className="w-8 h-8 bg-black/80 hover:bg-gray-800 text-white border border-gray-700 rounded shadow font-bold">-</button>
                 <button onClick={() => mapRef.current?.resetTransform()} className="px-3 h-8 bg-black/80 hover:bg-gray-800 text-white border border-gray-700 rounded shadow text-[10px] font-bold uppercase">Reset</button>
                 <button onClick={() => mapRef.current?.zoomIn()} className="w-8 h-8 bg-black/80 hover:bg-gray-800 text-white border border-gray-700 rounded shadow font-bold">+</button>
              </div>
          </div>

          {/* B. MATRIX & TIMELINE (Bottom 45%) */}
          <div className="h-[45%] bg-[#0b1221] flex flex-col z-20">
            <Timeline minYear={2000} maxYear={2025} currentYear={currentYear} onChange={setCurrentYear} />
            
            {/* The "Price Board" Matrix */}
            <div className="flex-1 overflow-hidden relative">
               <CapabilityMatrix 
                 data={safeData}
                 activeHotspotId={activeHotspotId}
                 onItemClick={handleHotspotClick}
               />
            </div>
          </div>
        </div>

        {/* 4. RIGHT SIDEBAR (Details Panel) */}
        <div className={`${isRightSidebarOpen ? 'w-96 translate-x-0' : 'w-0 translate-x-full'} flex-shrink-0 bg-[#0b1221] border-l border-gray-800 shadow-2xl z-30 transition-all duration-300 relative`}>
           <button onClick={() => setIsRightSidebarOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>

           {activeHotspot ? (
             <div className="h-full overflow-y-auto p-8 custom-scrollbar">
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-500 mb-2">{activeHotspot.type}</div>
                <h2 className="text-2xl font-bold text-white mb-1 leading-tight">{activeHotspot.label}</h2>
                <div className="text-xs text-gray-500 font-mono mb-6 pb-4 border-b border-gray-800">
                  {activeHotspot.startYear} — {activeHotspot.endYear || 'Present'}
                </div>
                
                <p className="text-sm text-gray-300 mb-6 leading-relaxed">{activeHotspot.description}</p>

                <div className="bg-[#111827] p-5 rounded-xl border border-gray-800 mb-6">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-3 tracking-widest">Key Impact</h4>
                  {activeHotspot.metrics && activeHotspot.metrics.length > 0 ? (
                    <ul className="space-y-3">
                      {activeHotspot.metrics.map((m: string, i: number) => (
                        <li key={i} className="text-xs flex gap-3 text-gray-300 items-start">
                          <span className="text-green-400 font-bold">✓</span> 
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-xs text-gray-600 italic">No specific metrics listed.</div>
                  )}
                </div>
             </div>
           ) : null}
        </div>

      </div>
    </div>
  );
};

export default App;