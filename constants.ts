import { District } from './types';

// The requested background image
export const MAP_IMAGE_URL = 'https://michaelfindling.com/wp-content/uploads/2025/11/resume-world-bkgrd.jpg';
export const MAP_WIDTH = 4055;
export const MAP_HEIGHT = 1720;

export const DISTRICTS: Record<string, District> = {
  'wall-street': {
    id: 'wall-street',
    name: 'Wall Street District',
    description: 'Early career, finance, business analysis, enterprise training.',
    color: 'bg-district-wallstreet',
    icon: 'chart-line',
    hexColor: '#4ade80',
  },
  'silicon-valley': {
    id: 'silicon-valley',
    name: 'Silicon Valley District',
    description: 'SaaS, tech companies, ABM roles, enterprise program management.',
    color: 'bg-district-silicon',
    icon: 'chip',
    hexColor: '#60a5fa',
  },
  'marketing': {
    id: 'marketing',
    name: 'Marketing Expertise',
    description: 'Skills, strategies, frameworks, achievements, ABM, operations, demand gen.',
    color: 'bg-district-marketing',
    icon: 'bullhorn',
    hexColor: '#f472b6',
  },
  'technologies': {
    id: 'technologies',
    name: 'Technologies District',
    description: 'MarTech stack, CRM, MAP, ABM platforms, data tools, analytics.',
    color: 'bg-district-tech',
    icon: 'server',
    hexColor: '#a78bfa',
  },
  'industries': {
    id: 'industries',
    name: 'Industries District',
    description: 'Sectors supported: SaaS, Manufacturing, Financial Services, Tech, Logistics.',
    color: 'bg-district-industries',
    icon: 'building',
    hexColor: '#fbbf24',
  },
};