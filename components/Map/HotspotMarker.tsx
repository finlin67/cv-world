import React, { useState } from 'react';
import { Hotspot, DistrictId } from '../../types';
import { DISTRICTS } from '../../constants';

interface HotspotMarkerProps {
  hotspot: Hotspot;
  isActive: boolean;
  isDimmed: boolean;
  onClick: (id: string) => void;
}

export const HotspotMarker: React.FC<HotspotMarkerProps> = ({ hotspot, isActive, isDimmed, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const district = DISTRICTS[hotspot.districtId];
  
  // Tailwind classes don't support dynamic string interpolation for safe purging usually,
  // but since we mapped them in constants.ts (bg-district-wallstreet), we need to ensure they exist.
  
  const baseClasses = "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-out group";
  // Refined scaling to be subtle but noticeable
  const activeClasses = isActive ? "z-40 scale-125" : "z-10 hover:z-30 hover:scale-110";
  const dimClasses = isDimmed ? "opacity-30 grayscale" : "opacity-100";

  return (
    <div 
      className={`${baseClasses} ${activeClasses} ${dimClasses}`}
      style={{ left: `${hotspot.coordinates.x}%`, top: `${hotspot.coordinates.y}%` }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(hotspot.id);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex flex-col items-center">
        {/* Pulse Effect */}
        <div className={`absolute w-full h-full rounded-full ${district.color} opacity-40 animate-ping`} />
        
        {/* Pin Body with dynamic glow */}
        <div 
            className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg border-2 border-white ${district.color} transition-all duration-300`}
            style={{
                boxShadow: isHovered || isActive 
                    ? `0 0 15px 2px ${district.hexColor}` 
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
        >
           <div className="w-2 h-2 bg-white rounded-full" />
        </div>

        {/* Label (Tooltip style, visible on hover or active) */}
        <div className={`
          absolute top-10 whitespace-nowrap px-3 py-1 rounded bg-gray-900/90 text-white text-xs font-bold shadow-xl backdrop-blur-md border border-gray-700
          transition-all duration-200 transform origin-top
          ${isActive || isHovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}
        `}>
          {hotspot.label}
        </div>
      </div>
    </div>
  );
};