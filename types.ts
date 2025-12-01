export type DistrictId = 'wall-street' | 'silicon-valley' | 'marketing' | 'technologies' | 'industries';

export interface District {
  id: DistrictId;
  name: string;
  description: string;
  color: string;
  icon: string;
  hexColor: string;
}

export interface Coordinates {
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
}

export interface Hotspot {
  id: string;
  districtId: DistrictId;
  label: string;
  summary: string;
  description: string; // Detailed HTML or text
  coordinates: Coordinates;
  relatedIds: string[]; // Relationship mapping
  type: 'role' | 'skill' | 'technology' | 'industry';
  metrics?: string[];
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}