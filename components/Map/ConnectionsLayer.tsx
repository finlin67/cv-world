import React from 'react';

interface ConnectionProps {
  hotspots: any[];
  activeHotspotId: string | null;
  currentYear: number;
}

export const ConnectionsLayer: React.FC<ConnectionProps> = ({ hotspots, activeHotspotId, currentYear }) => {
  // Safe default if data is missing
  if (!hotspots) return null;

  const activeNodes = hotspots.filter(h => 
    currentYear >= h.startYear && currentYear <= (h.endYear || 2025)
  );

  const lines: any[] = [];

  activeNodes.forEach(source => {
    if (source.relatedIds) {
      source.relatedIds.forEach((targetId: string) => {
        const target = hotspots.find(h => h.id === targetId);
        // Only draw if target exists
        if (target) {
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
        <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="10" refY="2" orient="auto">
          <polygon points="0 0, 4 2, 0 4" fill="#60a5fa" />
        </marker>
      </defs>
      {lines.map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={line.isHighlighted ? "#60a5fa" : "#4b5563"}
          strokeWidth={line.isHighlighted ? 15 : 4} // Thick lines for 5K map
          strokeOpacity={line.isHighlighted ? 1 : 0.3}
          strokeDasharray={line.isHighlighted ? "none" : "20,20"}
          markerEnd={line.isHighlighted ? "url(#arrowhead)" : ""}
        />
      ))}
    </svg>
  );
};