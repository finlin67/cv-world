import React from 'react';

interface TimelineProps {
  minYear: number;
  maxYear: number;
  currentYear: number;
  onChange: (year: number) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ minYear, maxYear, currentYear, onChange }) => {
  const years = Array.from({ length: (maxYear - minYear) + 1 }, (_, i) => minYear + i);

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#0b1221]/90 backdrop-blur-md border border-gray-700 rounded-2xl p-4 shadow-2xl">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-bold uppercase text-blue-400 tracking-widest">Time Travel</span>
        <span className="text-xl font-bold text-white font-mono">{currentYear}</span>
      </div>

      <div className="relative h-10 flex items-center select-none">
        {/* Track */}
        <div className="absolute left-0 right-0 h-1 bg-gray-600 rounded-full overflow-hidden">
           <div 
             className="h-full bg-blue-500 transition-all duration-75 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
             style={{ width: `${((currentYear - minYear) / (maxYear - minYear)) * 100}%` }}
           />
        </div>

        {/* Input Range */}
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={currentYear}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-8 opacity-0 cursor-pointer z-20"
        />

        {/* Thumb */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border-2 border-blue-500 pointer-events-none transition-all duration-75 z-10"
          style={{ left: `calc(${((currentYear - minYear) / (maxYear - minYear)) * 100}% - 8px)` }}
        />

        {/* Major Ticks Only (Cleaner) */}
        <div className="absolute top-4 left-0 right-0 flex justify-between px-1">
          {years.map((year) => (
            <div 
              key={year} 
              className={`flex flex-col items-center ${year % 5 === 0 ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="w-px h-1 bg-gray-500 mb-1"></div>
              <span className="text-[10px] font-mono text-gray-400">{year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};