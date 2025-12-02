import React, { forwardRef } from 'react';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { MAP_IMAGE_URL, MAP_WIDTH, MAP_HEIGHT } from '../../constants'; 

interface InteractiveMapProps {
  hotspots: any[];
  activeHotspotId: string | null;
  currentYear: number;
  onHotspotClick: (id: string) => void;
  onBackgroundClick?: () => void;
}

const InteractiveMap = forwardRef<ReactZoomPanPinchRef, InteractiveMapProps>(
  ({ hotspots, activeHotspotId, currentYear, onHotspotClick, onBackgroundClick }, ref) => {
    return (
      <div className="w-full h-full bg-[#0b1221] relative flex items-center justify-center overflow-hidden">
        <TransformWrapper
          ref={ref}
          initialScale={0.35} // Keep this to fit your screen
          minScale={0.35}     // LOCK IT: Don't let them zoom out further
          maxScale={1.5}      // Limit zoom in (prevent getting lost)
          centerOnInit={true}
          limitToBounds={true} // Strict bounds
          wheel={{ step: 0.05 }} // Very slow zoom for precision
          panning={{ disabled: false, velocityDisabled: true }} // Allow slight panning but no "throwing"
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
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  draggable={false}
                />
                
                {/* Hotspots Layer */}
                {hotspots.map((spot) => {
                  const isActiveTime = currentYear >= spot.startYear && currentYear <= (spot.endYear || 2025);
                  const isSelected = activeHotspotId === spot.id;
                  
                  // Simplified Logic: Dim if inactive, Bright if active
                  const opacityClass = isActiveTime ? 'opacity-100 grayscale-0' : 'opacity-20 grayscale';
                  const scaleClass = isSelected ? 'scale-150 z-50' : 'hover:scale-125 z-30';
                  
                  // Color coding
                  let baseColor = 'bg-gray-600 border-gray-500';
                  if (isActiveTime) {
                      if (spot.type === 'role') baseColor = 'bg-blue-500 border-white';
                      else if (spot.type === 'technology') baseColor = 'bg-indigo-500 border-white';
                      else if (spot.type === 'skill') baseColor = 'bg-pink-500 border-white';
                      else baseColor = 'bg-amber-500 border-white';
                  }

                  return (
                    <button
                      key={spot.id}
                      onClick={(e) => {
                         e.stopPropagation(); 
                         onHotspotClick(spot.id);
                      }}
                      className={`absolute rounded-full border-2 cursor-pointer transition-all duration-300 shadow-xl ${opacityClass} ${scaleClass} ${isSelected ? 'bg-white border-blue-400 ring-4 ring-blue-500/30' : baseColor}`}
                      style={{
                        left: `${spot.x}px`,
                        top: `${spot.y}px`,
                        width: isSelected ? '32px' : '20px',
                        height: isSelected ? '32px' : '20px',
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                       {/* Label only shows on hover or select to reduce clutter */}
                       {(isSelected || isActiveTime) && (
                         <span className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none transition-opacity border border-gray-700 font-bold ${isSelected ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
                           {spot.label}
                         </span>
                       )}
                    </button>
                  );
                })}
              </div>
            </TransformComponent>
          )}
        </TransformWrapper>
      </div>
    );
  }
);

export default InteractiveMap;