import React from 'react';

interface WelcomeModalProps {
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-[#0f172a] border border-blue-500/30 rounded-2xl shadow-2xl max-w-2xl w-full p-8 text-center animate-fade-in-up">
        
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(37,99,235,0.6)]">
            🚀
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">Welcome to Career City</h2>
        <p className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-6">The Interactive Portfolio of Michael Findling</p>

        <p className="text-gray-300 leading-relaxed mb-8 max-w-lg mx-auto">
          This isn't a PDF. It's a living map of my experience in <strong>Revenue Operations</strong>, <strong>Marketing Strategy</strong>, and <strong>Tech Leadership</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
          <div className="bg-[#1e293b] p-4 rounded-xl border border-gray-700">
            <div className="text-2xl mb-2">🗺️</div>
            <h3 className="font-bold text-white text-sm">Explore</h3>
            <p className="text-xs text-gray-400 mt-1">Drag and zoom the map to discover roles and skills.</p>
          </div>
          <div className="bg-[#1e293b] p-4 rounded-xl border border-gray-700">
            <div className="text-2xl mb-2">⏳</div>
            <h3 className="font-bold text-white text-sm">Time Travel</h3>
            <p className="text-xs text-gray-400 mt-1">Use the timeline to see how my career evolved.</p>
          </div>
          <div className="bg-[#1e293b] p-4 rounded-xl border border-gray-700">
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-bold text-white text-sm">Ask Michael</h3>
            <p className="text-xs text-gray-400 mt-1">Use the panel on the right to get quick answers.</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
        >
          Enter Command Center
        </button>
      </div>
    </div>
  );
};