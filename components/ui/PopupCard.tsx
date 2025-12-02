import React from 'react';
import { DISTRICTS } from '../../constants';

interface PopupCardProps {
  hotspot: any | null;
  onClose: () => void;
  onRelatedClick: (id: string) => void;
}

export const PopupCard: React.FC<PopupCardProps> = ({ hotspot, onClose, onRelatedClick }) => {
  if (!hotspot) return null;

  const district = DISTRICTS[hotspot.districtId];

  return (
    <div className="absolute top-20 left-8 w-96 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-gray-200 z-[100] animate-fade-in-up text-gray-800 flex flex-col max-h-[80vh]">
      
      {/* Header Color Strip */}
      <div className={`h-2 w-full ${district?.color || 'bg-gray-500'} flex-shrink-0`} />

      <div className="relative p-6 overflow-y-auto custom-scrollbar">
        {/* Top X Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-400 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm"
        >
          ✕
        </button>

        {/* Content */}
        <div className="mb-4 pr-8">
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${district?.color}`}></span>
            {district?.name || 'General'}
          </div>
          <h2 className="text-2xl font-bold leading-tight text-gray-900">{hotspot.label}</h2>
          <div className="text-xs font-semibold text-blue-600 mt-1 uppercase tracking-wider">{hotspot.type}</div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-700 italic border-l-4 border-gray-200 pl-3">
            {hotspot.summary}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {hotspot.description}
          </p>

          {hotspot.metrics && hotspot.metrics.length > 0 && (
            <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
              <h4 className="text-[10px] font-bold uppercase text-blue-400 mb-2">Key Impact</h4>
              <ul className="space-y-1">
                {hotspot.metrics.map((m: string, i: number) => (
                  <li key={i} className="text-xs flex gap-2 text-gray-700">
                    <span className="text-blue-500 font-bold">➜</span> {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hotspot.relatedIds && hotspot.relatedIds.length > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-2">Connected Nodes</h4>
              <div className="flex flex-wrap gap-2">
                {hotspot.relatedIds.map((rid: string) => (
                  <button
                    key={rid}
                    onClick={() => onRelatedClick(rid)}
                    className="px-3 py-1.5 text-[10px] font-medium bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-600 rounded-md border border-gray-200 transition-all shadow-sm"
                  >
                     View Related ➜
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* NEW: Bottom Close Bar */}
      <div className="p-2 border-t border-gray-100 bg-gray-50 flex justify-center flex-shrink-0">
         <button 
           onClick={onClose}
           className="text-xs text-gray-400 hover:text-gray-700 uppercase tracking-widest font-bold py-1 px-4"
         >
           Close Card
         </button>
      </div>
    </div>
  );
};