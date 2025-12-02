import React from 'react';
import { Hotspot } from '../../types';
import { DISTRICTS } from '../../constants';

interface DetailSidebarProps {
  hotspot: Hotspot | null;
  hotspots: Hotspot[];
  onClose: () => void;
  onRelatedClick: (id: string) => void;
}

const Icon: React.FC<{ icon: string; className?: string }> = ({ icon, className = "w-5 h-5" }) => {
  switch (icon) {
    // District Icons
    case 'chart-line':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      );
    case 'chip':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      );
    case 'bullhorn':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      );
    case 'server':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 01-2 2v4a2 2 0 012 2h14a2 2 0 012-2v-4a2 2 0 01-2-2m-2-4h.01M17 16h.01" />
        </svg>
      );
    case 'building':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    
    // Hotspot Icons
    case 'briefcase':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'lightbulb':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'cog':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'globe':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return null;
  }
};

export const DetailSidebar: React.FC<DetailSidebarProps> = ({ hotspot, hotspots, onClose, onRelatedClick }) => {
  const district = hotspot ? DISTRICTS[hotspot.districtId] : null;

  return (
    <div 
      // I changed 'bg-ui-panel' to 'bg-[#0b1221]' below
      className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-[#0b1221] border-l border-gray-700 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${hotspot ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {hotspot && district && (
        <div className="p-6 pb-20">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-full"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="mb-6 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-lg ${district.color} bg-opacity-90`}>
                <Icon icon={district.icon} className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs font-bold text-white uppercase tracking-wider`}>
                {district.name}
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-1 leading-tight">{hotspot.label}</h2>
            <div className="text-gray-400 text-sm italic border-b border-gray-700 pb-4 flex items-center gap-2">
              <Icon icon={hotspot.icon} className="w-4 h-4" />
              <span>{hotspot.type.toUpperCase()}</span>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Overview</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">{hotspot.summary}</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Details</h3>
              <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{hotspot.description}</div>
            </section>

            {hotspot.metrics && hotspot.metrics.length > 0 && (
              <section className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 shadow-inner">
                <h3 className="text-sm font-semibold text-green-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  Key Impact
                </h3>
                <ul className="space-y-3">
                  {hotspot.metrics.map((metric, idx) => (
                    <li key={idx} className="flex items-start text-gray-300 text-sm">
                      <span className="mr-3 text-green-500 mt-1 flex-shrink-0">➜</span>
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {hotspot.relatedIds && hotspot.relatedIds.length > 0 && (
              <section className="pt-6 border-t border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  Related Items
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {hotspot.relatedIds.map(rid => {
                    const related = hotspots.find(h => h.id === rid);
                    if (!related) return null;
                    const rDistrict = DISTRICTS[related.districtId];
                    return (
                      <button
                        key={rid}
                        onClick={() => onRelatedClick(rid)}
                        className="group flex items-center p-3 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:border-blue-500/50 hover:shadow-lg transition-all text-left w-full relative overflow-hidden"
                      >
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${rDistrict.color} transition-all group-hover:w-1.5`}></div>
                          <div className={`w-10 h-10 rounded-lg mr-3 flex items-center justify-center ${rDistrict.color} bg-opacity-20 text-white shadow-sm group-hover:scale-110 transition-transform ml-2`}>
                            <Icon icon={rDistrict.icon} className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors">{related.label}</div>
                            <div className="text-xs text-gray-400 flex items-center gap-1">
                              <span className="opacity-75">{rDistrict.name}</span>
                              <span className="text-gray-600">•</span>
                              <Icon icon={related.icon} className="w-3 h-3 text-gray-400" />
                              <span className="uppercase tracking-wider text-[10px] text-gray-500">{related.type}</span>
                            </div>
                          </div>
                          <div className="text-gray-500 group-hover:text-white transition-colors transform group-hover:translate-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
};