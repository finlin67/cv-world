import React from 'react';

interface ConnectionProps {
  hotspots: any[];
  activeHotspotId: string | null;
  currentYear: number;
}

export const ConnectionsLayer: React.FC<ConnectionProps> = ({ hotspots, activeHotspotId, currentYear }) => {
  
  // 1. Identify which nodes are currently visible based on timeline
  const activeNodes = hotspots.filter(h => 
    currentYear >= h.startYear && currentYear <= (h.endYear || 2025)
  );

  // 2. Calculate lines
  const lines: any[] = [];

  activeNodes.forEach(source => {
    if (source.relatedIds) {
      source.relatedIds.forEach((targetId: string) => {
        // Find the target node
        const target = hotspots.find(h => h.id === targetId);
        
        // Only draw if target exists AND is active in this year
        // (Or if we want to show connections even if target is from a different time, remove the time check)
        const isTargetActive = target && currentYear >= target.startYear && currentYear <= (target.endYear || 2025);

        if (target && isTargetActive) {
          // Check if this specific connection involves the "Selected" item
          const isHighlighted = activeHotspotId === source.id || activeHotspotId === target.id;

          lines.push({
            x1: source.x,
            y1: source.y,
            x2: target.x,
            y2: target.y,
            isHighlighted
          });
        }
      });
    }
  });

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 overflow-visible">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="22" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
        </marker>
      </defs>
      
      {lines.map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={line.isHighlighted ? "#60a5fa" : "#4b5563"} // Blue if active, dark gray if background
          strokeWidth={line.isHighlighted ? 3 : 1}
          strokeOpacity={line.isHighlighted ? 1 : 0.3}
          strokeDasharray={line.isHighlighted ? "none" : "5,5"} // Dashed for background connections
          markerEnd={line.isHighlighted ? "url(#arrowhead)" : ""}
        />
      ))}
    </svg>
  );
};