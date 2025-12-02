// constants.ts
import { District } from './types';

// UPDATE THIS filename to match your new upload
export const MAP_IMAGE_URL = '/map-v2.jpg'; 

// UPDATE THESE if your image dimensions are different
export const MAP_WIDTH = 4096; 
export const MAP_HEIGHT = 3072;

export const DISTRICTS: Record<string, District> = {
  'wall-street': {
    id: 'wall-street',
    name: 'Wall Street District',
    description: 'Early career, finance, business analysis, enterprise training.',
    color: 'bg-green-500',
    icon: 'chart-line',
    hexColor: '#4ade80',
  },
  'silicon-valley': {
    id: 'silicon-valley',
    name: 'Silicon Valley District',
    description: 'SaaS, tech companies, ABM roles, enterprise program management.',
    color: 'bg-blue-400',
    icon: 'chip',
    hexColor: '#60a5fa',
  },
  'marketing': {
    id: 'marketing',
    name: 'Marketing Expertise',
    description: 'Skills, strategies, frameworks, achievements, ABM, operations, demand gen.',
    color: 'bg-pink-500',
    icon: 'bullhorn',
    hexColor: '#f472b6',
  },
  'technologies': {
    id: 'technologies',
    name: 'Technologies District',
    description: 'MarTech stack, CRM, MAP, ABM platforms, data tools, analytics.',
    color: 'bg-indigo-500',
    icon: 'server',
    hexColor: '#a78bfa',
  },
  'industries': {
    id: 'industries',
    name: 'Industries District',
    description: 'Sectors supported: SaaS, Manufacturing, Financial Services, Tech, Logistics.',
    color: 'bg-amber-500',
    icon: 'building',
    hexColor: '#fbbf24',
  },
};