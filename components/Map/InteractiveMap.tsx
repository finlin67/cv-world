import React, { useState, useRef, useEffect } from 'react';
import { MAP_IMAGE_URL, MAP_WIDTH, MAP_HEIGHT } from '../../constants';
import { Hotspot } from '../../types';
import { HotspotMarker } from './HotspotMarker';

interface InteractiveMapProps {
  hotspots: Hotspot[];
  activeHotspotId: string | null;
  onHotspotClick: (id: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ hotspots, activeHotspotId, onHotspotClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.5 }); // Start zoomed out
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  // Center map on load
  useEffect(() => {
    if (containerRef.current) {
        const cw = containerRef.current.clientWidth;
        const ch = containerRef.current.clientHeight;
        // Center the 4055x1720 image roughly
        setTransform({
            x: (cw - MAP_WIDTH * 0.5) / 2,
            y: (ch - MAP_HEIGHT * 0.5) / 2,
            scale: 0.5
        });
    }
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleSensitivity = 0.001;
    const newScale = Math.min(Math.max(transform.scale - e.deltaY * scaleSensitivity, 0.2), 2);
    setTransform(prev => ({ ...prev, scale: newScale }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    setTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Determine dimming
  const activeHotspot = hotspots.find(h => h.id === activeHotspotId);
  
  return (
    <div 
      className="relative w-full h-full bg-[#050b14] overflow-hidden cursor-move"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <div 
        className="absolute origin-top-left transition-transform duration-75 ease-linear"
        style={{ 
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          width: MAP_WIDTH,
          height: MAP_HEIGHT,
        }}
      >
        <img 
          src={MAP_IMAGE_URL} 
          alt="Career City Map" 
          className="w-full h-full object-cover pointer-events-none opacity-80"
          draggable={false}
        />
        
        {hotspots.map(hotspot => {
            const isDimmed = activeHotspot 
                ? activeHotspot.id !== hotspot.id && !activeHotspot.relatedIds.includes(hotspot.id)
                : false;

            return (
                <HotspotMarker 
                    key={hotspot.id} 
                    hotspot={hotspot} 
                    isActive={activeHotspotId === hotspot.id}
                    isDimmed={isDimmed}
                    onClick={onHotspotClick}
                />
            );
        })}
      </div>
      
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur text-white text-xs p-2 rounded pointer-events-none select-none">
        Map Controls: Drag to Pan • Scroll to Zoom
      </div>
    </div>
  );
};