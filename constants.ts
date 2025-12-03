import { District } from './types';

// Matches your new file
export const MAP_IMAGE_URL = 'map-panoramic.jpg'; 

// NEW 6K DIMENSIONS
export const MAP_WIDTH = 6336; 
export const MAP_HEIGHT = 2688;

export const DISTRICTS: Record<string, District> = {
  'wall-street': {
    id: 'wall-street',
    name: 'Wall Street District',
    description: 'Early career, finance, business analysis.',
    color: 'bg-green-500',
    icon: 'chart-line',
    hexColor: '#4ade80',
  },
  'silicon-valley': {
    id: 'silicon-valley',
    name: 'Silicon Valley District',
    description: 'SaaS, tech companies, ABM roles.',
    color: 'bg-blue-400',
    icon: 'chip',
    hexColor: '#60a5fa',
  },
  'marketing': {
    id: 'marketing',
    name: 'Marketing Expertise',
    description: 'Strategy, ABM, operations, demand gen.',
    color: 'bg-pink-500',
    icon: 'bullhorn',
    hexColor: '#f472b6',
  },
  'technologies': {
    id: 'technologies',
    name: 'Technologies District',
    description: 'MarTech stack, CRM, MAP, Analytics.',
    color: 'bg-indigo-500',
    icon: 'server',
    hexColor: '#a78bfa',
  },
  'industries': {
    id: 'industries',
    name: 'Industries District',
    description: 'Sectors supported: SaaS, FinTech, Logistics.',
    color: 'bg-amber-500',
    icon: 'building',
    hexColor: '#fbbf24',
  },
};