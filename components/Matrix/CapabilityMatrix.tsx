import React, { useMemo, useEffect, useRef } from 'react';

interface MatrixProps {
  data: any[];
  activeHotspotId: string | null;
  onItemClick: (id: string) => void;
}

export const CapabilityMatrix: React.FC<MatrixProps> = ({ data, activeHotspotId, onItemClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Columns = ROLES (Sorted by Date)
  const roles = useMemo(() => 
    data.filter(d => d.type === 'role').sort((a, b) => b.startYear - a.startYear), 
  [data]);

  // 2. Rows = CAPABILITIES (Skills & Tech)
  const capabilities = useMemo(() => 
    data.filter(d => d.type === 'skill' || d.type === 'technology'), 
  [data]);

  // Grouping for cleaner UI
  const skills = capabilities.filter(c => c.type === 'skill');
  const tech = capabilities.filter(c => c.type === 'technology');

  // Helper: Is this cell active?
  const isConnected = (role: any, cap: any) => {
    return role.relatedIds?.includes(cap.id) || cap.relatedIds?.includes(role.id);
  };

  // Auto-scroll to selected column
  useEffect(() => {
    if (activeHotspotId && scrollRef.current) {
      const el = document.getElementById(`col-${activeHotspotId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeHotspotId]);

  return (
    <div className="w-full h-full bg-[#0b1221] flex flex-col text-gray-300 text-xs select-none">
      
      {/* HEADER: ROLES (Sticky Top) */}
      <div className="flex border-b border-gray-800 bg-[#0f172a] sticky top-0 z-20 shadow-md">
        {/* Corner Piece */}
        <div className="w-48 flex-shrink-0 p-3 border-r border-gray-800 bg-[#0f172a] sticky left-0 z-30 flex items-center">
          <span className="font-bold text-blue-500 uppercase tracking-widest">Capability Map</span>
        </div>

        {/* Role Columns */}
        <div className="flex overflow-hidden"> 
           {/* Note: This header actually needs to scroll with the body. 
               For simplicity in this layout, we treat the whole matrix as one scroll area below. */}
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar" ref={scrollRef}>
        <div className="inline-block min-w-full">
          
          {/* THE GRID HEADER (Roles) */}
          <div className="flex">
             <div className="w-48 flex-shrink-0 sticky left-0 bg-[#0b1221] z-10 border-r border-gray-800"></div>
             {roles.map(role => (
               <div 
                 id={`col-${role.id}`}
                 key={role.id}
                 onClick={() => onItemClick(role.id)}
                 className={`w-32 flex-shrink-0 p-3 border-r border-b border-gray-800 cursor-pointer transition-colors text-center group ${
                   activeHotspotId === role.id ? 'bg-blue-900/40' : 'hover:bg-gray-800'
                 }`}
               >
                 <div className="text-[10px] text-gray-500 font-mono mb-1">{role.startYear}</div>
                 <div className={`font-bold leading-tight ${activeHotspotId === role.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                   {role.label}
                 </div>
               </div>
             ))}
          </div>

          {/* SECTION: EXPERTISE */}
          <div className="sticky left-0 right-0 bg-[#1e293b] px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-y border-gray-700 z-10">
            Core Competencies
          </div>

          {skills.map(skill => (
            <div key={skill.id} className="flex hover:bg-white/5 transition-colors group">
              {/* Row Label */}
              <div 
                onClick={() => onItemClick(skill.id)}
                className={`w-48 flex-shrink-0 p-2 border-r border-gray-800 bg-[#0b1221] sticky left-0 z-10 cursor-pointer flex items-center justify-between border-b border-gray-800/50 ${
                  activeHotspotId === skill.id ? 'text-white bg-blue-900/20 border-l-2 border-l-blue-500' : 'text-gray-400'
                }`}
              >
                <span className="truncate pr-2" title={skill.label}>{skill.label}</span>
              </div>

              {/* Grid Cells */}
              {roles.map(role => {
                const active = isConnected(role, skill);
                const isSelected = activeHotspotId === role.id || activeHotspotId === skill.id;
                
                return (
                  <div 
                    key={`${role.id}-${skill.id}`}
                    className={`w-32 flex-shrink-0 border-r border-b border-gray-800/50 flex items-center justify-center transition-all ${
                      activeHotspotId === role.id ? 'bg-blue-900/10' : ''
                    }`}
                  >
                    {active ? (
                      <div className={`w-3 h-3 rounded-full ${
                        isSelected 
                          ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] scale-110' 
                          : 'bg-gray-700'
                      }`} />
                    ) : (
                      <span className="text-gray-800 text-[10px]">·</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* SECTION: TECH */}
          <div className="sticky left-0 right-0 bg-[#1e293b] px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-y border-gray-700 z-10">
            Technology Stack
          </div>

          {tech.map(t => (
            <div key={t.id} className="flex hover:bg-white/5 transition-colors group">
              <div 
                onClick={() => onItemClick(t.id)}
                className={`w-48 flex-shrink-0 p-2 border-r border-gray-800 bg-[#0b1221] sticky left-0 z-10 cursor-pointer flex items-center justify-between border-b border-gray-800/50 ${
                  activeHotspotId === t.id ? 'text-white bg-indigo-900/20 border-l-2 border-l-indigo-500' : 'text-gray-400'
                }`}
              >
                <span className="truncate pr-2">{t.label}</span>
              </div>

              {roles.map(role => {
                const active = isConnected(role, t);
                const isSelected = activeHotspotId === role.id || activeHotspotId === t.id;

                return (
                  <div 
                    key={`${role.id}-${t.id}`}
                    className={`w-32 flex-shrink-0 border-r border-b border-gray-800/50 flex items-center justify-center ${
                      activeHotspotId === role.id ? 'bg-indigo-900/5' : ''
                    }`}
                  >
                    {active ? (
                      <div className={`w-3 h-3 rounded-sm ${
                        isSelected 
                          ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)] scale-110' 
                          : 'bg-gray-700'
                      }`} />
                    ) : (
                      <span className="text-gray-800 text-[10px]">·</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};