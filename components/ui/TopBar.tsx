import React from 'react';

interface TopBarProps {
  categories: { label: string; key: string }[];
  activeCategory: string | null;
  onSelectCategory: (key: string | null) => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  categories, 
  activeCategory, 
  onSelectCategory,
  onToggleSidebar
}) => {
  return (
    <div className="h-16 bg-[#0b1221] border-b border-gray-800 flex items-center justify-between px-4 z-30 shadow-lg shrink-0">
      
      {/* LEFT: Logo & Sidebar Toggle */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
        >
          {/* Hamburger Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div>
          <h1 className="text-lg font-bold tracking-wider text-white">CAREER CITY</h1>
        </div>
      </div>

      {/* CENTER: Categories (Hidden on mobile) */}
      <div className="hidden md:flex items-center gap-1">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onSelectCategory(activeCategory === cat.key ? null : cat.key)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeCategory === cat.key 
                ? 'bg-blue-600 text-white shadow-lg scale-105' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* RIGHT: Contact Button (Matches your previous version) */}
      <div className="flex items-center gap-2">
        <a 
          href="mailto:your-email@example.com"
          className="px-3 py-1.5 bg-white text-[#0b1221] text-xs font-bold rounded hover:bg-gray-200 transition-colors"
        >
          Contact Me
        </a>
      </div>

    </div>
  );
};