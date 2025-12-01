import React, { useState, useEffect } from 'react';
import { InteractiveMap } from './components/Map/InteractiveMap';
import { DetailSidebar } from './components/Sidebar/DetailSidebar';
import { Modal } from './components/ui/Modal';
import { CityGuide } from './components/Chat/CityGuide';
import { HOTSPOTS } from './data';
import { DISTRICTS } from './constants';
import { DistrictId } from './types';

function App() {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [filter, setFilter] = useState<DistrictId | 'all'>('all');

  const handleHotspotClick = (id: string) => {
    setActiveHotspotId(id);
  };

  const filteredHotspots = filter === 'all' 
    ? HOTSPOTS 
    : HOTSPOTS.filter(h => h.districtId === filter);

  const activeHotspot = activeHotspotId ? HOTSPOTS.find(h => h.id === activeHotspotId) || null : null;

  return (
    <div className="relative w-screen h-screen bg-ui-dark overflow-hidden flex flex-col">
      {/* Header / Filter Bar */}
      <div className="absolute top-0 left-0 w-full z-40 p-4 pointer-events-none">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div className="bg-black/50 backdrop-blur-md p-3 rounded-lg border border-white/10 pointer-events-auto">
            <h1 className="text-xl font-bold text-white tracking-wider uppercase">Career City</h1>
            <p className="text-xs text-gray-400">Michael Findling • Interactive Resume</p>
          </div>
          
          <div className="bg-black/50 backdrop-blur-md p-2 rounded-lg border border-white/10 flex gap-2 overflow-x-auto max-w-full pointer-events-auto">
             <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${filter === 'all' ? 'bg-white text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
             >
               ALL
             </button>
             {Object.values(DISTRICTS).map(d => (
               <button
                 key={d.id}
                 onClick={() => setFilter(d.id)}
                 className={`px-3 py-1 rounded text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${filter === d.id ? 'bg-gray-700 ring-1 ring-white' : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800'}`}
               >
                 <span className={`w-2 h-2 rounded-full ${d.color}`}></span>
                 {d.name}
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative">
        <InteractiveMap 
          hotspots={filteredHotspots} 
          activeHotspotId={activeHotspotId}
          onHotspotClick={handleHotspotClick}
        />
      </div>

      {/* Sidebar Details */}
      <DetailSidebar 
        hotspot={activeHotspot}
        hotspots={HOTSPOTS}
        onClose={() => setActiveHotspotId(null)}
        onRelatedClick={handleHotspotClick}
      />

      {/* Chat Bot */}
      <CityGuide />

      {/* Onboarding Modal */}
      <Modal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)}
        title="Welcome to Career City"
      >
        <div className="space-y-4">
          <p className="text-lg">
            You have entered the interactive resume world of <strong>Michael Findling</strong>. 
            This city represents a career journey built on five foundational districts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            {Object.values(DISTRICTS).map(d => (
              <div key={d.id} className="bg-gray-800 p-3 rounded border border-gray-700 flex items-start gap-3">
                <div className={`w-3 h-3 mt-1.5 rounded-full flex-shrink-0 ${d.color}`} />
                <div>
                  <h4 className="font-bold text-white text-sm">{d.name}</h4>
                  <p className="text-xs text-gray-400">{d.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-900/30 p-4 rounded border border-blue-800 text-sm">
            <strong>How to Explore:</strong>
            <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300">
              <li><strong>Drag</strong> to explore the map.</li>
              <li><strong>Scroll</strong> to zoom in/out.</li>
              <li><strong>Click</strong> hotspots to reveal role details, skills, and tech stacks.</li>
              <li>Use the <strong>AI City Guide</strong> (bottom right) to ask specific questions!</li>
            </ul>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              onClick={() => setShowOnboarding(false)}
              className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition-colors"
            >
              Enter City
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;