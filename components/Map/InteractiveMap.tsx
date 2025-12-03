import React, { forwardRef } from 'react';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { MAP_IMAGE_URL, MAP_WIDTH, MAP_HEIGHT } from '../../constants'; 
import { ConnectionsLayer } from './ConnectionsLayer';

interface InteractiveMapProps {
  hotspots: any[];
  activeHotspotId: string | null;
  activeHotspot: any | null; 
  hoveredId: string | null;
  currentYear: number;
  onHotspotClick: (id: string) => void;
  onHoverChange: (id: string | null) => void;
  onBackgroundClick?: () => void;
  onClosePopup?: () => void;
}

const InteractiveMap = forwardRef<ReactZoomPanPinchRef, InteractiveMapProps>(
  ({ hotspots, activeHotspotId, activeHotspot, hoveredId, currentYear, onHotspotClick, onHoverChange, onBackgroundClick, onClosePopup }, ref) => {
    
    return (
      <div className="w-full h-full bg-[#0b1221] relative flex items-center justify-center overflow-hidden">
        <TransformWrapper
          ref={ref}
          initialScale={.2} // Kept low to fit the 6K image
          minScale={0.1}
          maxScale={2}
          centerOnInit={true}
          limitToBounds={true}
          wheel={{ step: 0.1 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <TransformComponent 
              wrapperStyle={{ width: "100%", height: "100%" }}
              contentStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <div 
                onClick={(e) => {
                  if (e.target === e.currentTarget && onBackgroundClick) onBackgroundClick();
                }}
                style={{ 
                  width: `${MAP_WIDTH}px`, 
                  height: `${MAP_HEIGHT}px`, 
                  position: "relative" 
                }}
              > 
                <img 
                  src={MAP_IMAGE_URL} 
                  alt="Career City Map" 
                  style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.9 }} 
                  draggable={false}
                />

                <ConnectionsLayer hotspots={hotspots} activeHotspotId={activeHotspotId || hoveredId} currentYear={2025} />
                
                {hotspots.map((spot) => {
                  const isSelected = activeHotspotId === spot.id;
                  const isHovered = hoveredId === spot.id;
                  const iconChar = spot.type === 'role' ? '💼' : spot.type === 'skill' ? '⚡' : spot.type === 'technology' ? '💻' : '🏭';
                  
                  return (
                    <button
                      key={spot.id}
                      onClick={(e) => { e.stopPropagation(); onHotspotClick(spot.id); }}
                      onMouseEnter={() => onHoverChange(spot.id)}
                      onMouseLeave={() => onHoverChange(null)}
                      // SCALED UP ICONS (w-48 = 192px) to match 6K map
                      className={`absolute flex items-center justify-center transition-all duration-300 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-full ${
                        isSelected || isHovered
                          ? 'w-64 h-64 text-9xl border-[10px] border-white bg-blue-600 z-50 scale-110' 
                          : 'w-48 h-48 text-8xl border-[6px] border-gray-400 bg-gray-800/90 hover:scale-110 hover:bg-blue-500 hover:text-white'
                      }`}
                      style={{
                        left: `${spot.x}px`,
                        top: `${spot.y}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                       {iconChar}
                    </button>
                  );
                })}

                {/* THE MASSIVE POPUP CARD (Scaled for 6K Resolution) */}
                {activeHotspot && (
                  <div 
                    className="absolute z-[200]"
                    style={{ 
                      left: `${activeHotspot.x}px`, 
                      top: `${activeHotspot.y}px`,
                      // Move it up so it sits nicely above the icon
                      transform: 'translate(-50%, -120%)' 
                    }}
                  >
                    {/* Width: 2400px (Looks like ~400px on screen) */}
                    <div className="w-[2400px] bg-[#0f172a]/95 backdrop-blur-xl rounded-[80px] shadow-[0_0_100px_rgba(0,0,0,0.9)] border-[6px] border-gray-500 overflow-hidden text-left animate-fade-in-up">
                        <div className={`h-12 w-full ${activeHotspot.type === 'role' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                        <div className="p-[80px]"> {/* Huge Padding */}
                            <button 
                                onClick={(e) => { e.stopPropagation(); onClosePopup(); }} 
                                className="absolute top-10 right-10 text-gray-400 hover:text-white bg-gray-700/50 rounded-full w-32 h-32 text-6xl flex items-center justify-center"
                            >
                                ✕
                            </button>
                            
                            <div className="text-5xl font-bold text-gray-400 uppercase tracking-widest mb-6">{activeHotspot.type}</div>
                            <h3 className="text-[120px] font-bold text-white mb-8 leading-tight">{activeHotspot.label}</h3>
                            <div className="text-5xl font-mono text-blue-400 mb-12">{activeHotspot.startYear} - {activeHotspot.endYear || 'Pres'}</div>
                            
                            <p className="text-6xl text-gray-200 leading-relaxed mb-12 border-l-[12px] border-gray-600 pl-10">
                                {activeHotspot.description}
                            </p>

                            {activeHotspot.metrics && (
                                <div className="space-y-8 bg-black/30 p-12 rounded-[40px]">
                                    <div className="text-4xl uppercase font-bold text-gray-500 mb-4">Key Results</div>
                                    {activeHotspot.metrics.map((m: string, i: number) => (
                                        <div key={i} className="text-5xl flex gap-6 text-green-400 items-start">
                                            <span className="font-bold">✓</span> 
                                            <span className="text-gray-300">{m}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                  </div>
                )}

              </div>
            </TransformComponent>
          )}
        </TransformWrapper>
      </div>
    );
  }
);

export default InteractiveMap;