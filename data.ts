import { Hotspot } from './types';

// Aggregated dataset based on Michael Findling's resume

export const HOTSPOTS: Hotspot[] = [
  // --- Wall Street District (Early Career & Finance) ---
  {
    id: 'role-early-finance',
    districtId: 'wall-street',
    type: 'role',
    label: 'Early Career: Finance',
    summary: 'Foundations at Goldman Sachs, S&P, and Bank of Tokyo.',
    description: 'Built a disciplined foundation in data analysis and systems strategy. \n\nAt **Standard & Poor\'s**, led the implementation of Learning Management Systems (LMS), delivering projects on-time and within budget. \n\nAt **Bank of Tokyo-Mitsubishi**, designed and trained teams on Credit Portfolio Management Systems. \n\nAt **Goldman Sachs**, directed enterprise LMS implementation. These roles honed the ability to manage complex data structures that would later fuel Marketing Operations success.',
    coordinates: { x: 18, y: 75 },
    relatedIds: ['ind-fintech', 'skill-analytics'],
    metrics: ['Delivered LMS on-time/budget (S&P)', 'Training & Dev Analyst (Goldman)'],
    icon: 'briefcase'
  },
  {
    id: 'role-salem',
    districtId: 'wall-street',
    type: 'role',
    label: 'SalemGlobal Internet',
    summary: 'Senior Manager of Online Marketing.',
    description: 'Managed business development and client prospecting. Achieved significant growth in new clients year-over-year and maintained high retention rates through dedicated client support and onboarding.',
    coordinates: { x: 25, y: 65 },
    relatedIds: ['skill-demand'],
    metrics: ['500% growth in new clients YoY', '85% retention rate'],
    icon: 'briefcase'
  },

  // --- Silicon Valley District (Tech & Leadership) ---
  {
    id: 'role-prgx',
    districtId: 'silicon-valley',
    type: 'role',
    label: 'PRGX Global',
    summary: 'Director of Digital Marketing & ABM (2024-2025).',
    description: 'Architected the company’s first unified revenue operating model. Integrated Demandbase, CRM, and analytics to synchronize workflows. Spearheaded a BDR performance audit generating 150 qualified opportunities per quarter.',
    coordinates: { x: 20, y: 25 },
    relatedIds: ['skill-ops', 'tech-abm-platforms', 'ind-saas'],
    metrics: ['87% pipeline boost YoY', '45% YoY Marketing attributed pipeline', 'Cut reporting time by 30 hrs/mo'],
    icon: 'briefcase'
  },
  {
    id: 'role-amcs',
    districtId: 'silicon-valley',
    type: 'role',
    label: 'AMCS Group',
    summary: 'Director of Account-Based Marketing (2023-2024).',
    description: 'Built an end-to-end ABM framework targeting 50+ enterprise companies in logistics and manufacturing. Synchronized GTM narratives to restructure outbound communications prioritization.',
    coordinates: { x: 28, y: 35 },
    relatedIds: ['skill-abm', 'ind-logistics'],
    metrics: ['$1.2M pipeline in 90 days', '35% MQL lift in 60 days', '50% improvement in campaign ROI'],
    icon: 'briefcase'
  },
  {
    id: 'role-redhat',
    districtId: 'silicon-valley',
    type: 'role',
    label: 'Red Hat',
    summary: 'Sr. Principal Program Manager, ABM (2021-2023).',
    description: 'Guided marketing activation for Global Enterprise accounts. Developed verticalized ABM strategies and internal communication workflows. Created focused strategies for customer lifecycle stages.',
    coordinates: { x: 15, y: 40 },
    relatedIds: ['skill-abm', 'ind-saas'],
    metrics: ['30% new enterprise account intros', '25% MQL increase', '30% decrease in Cost Per Lead'],
    icon: 'briefcase'
  },
  {
    id: 'role-salesforce',
    districtId: 'silicon-valley',
    type: 'role',
    label: 'Salesforce',
    summary: 'Global Marketing Ops Leader (2014-2021).',
    description: 'A 7-year tenure driving global marketing operations and enterprise campaigns. Implemented sales KPI dashboards, led cross-functional initiatives for 6sense implementation, and built enablement programs for resellers.',
    coordinates: { x: 35, y: 30 },
    relatedIds: ['tech-salesforce', 'skill-ops', 'tech-abm-platforms'],
    metrics: ['65% lift in SQLs', '20% marketing pipeline lift', '40% partner revenue boost'],
    icon: 'briefcase'
  },
  {
    id: 'role-startups',
    districtId: 'silicon-valley',
    type: 'role',
    label: 'Growth Stage Leadership',
    summary: 'Get Satisfaction, Crowd Factory, Embarcadero.',
    description: 'Held various leadership roles including **Director of Demand Gen** at Get Satisfaction and **Sr. Manager Marketing** at Crowd Factory (acquired by Marketo). focused on full-funnel demand generation, SEO/SEM, and lead management.',
    coordinates: { x: 10, y: 50 },
    relatedIds: ['skill-demand', 'tech-martech'],
    metrics: ['164% unique visitor increase (Crowd Factory)', '43% net new leads QoQ (Crowd Factory)'],
    icon: 'briefcase'
  },

  // --- Marketing Expertise District ---
  {
    id: 'skill-abm',
    districtId: 'marketing',
    type: 'skill',
    label: 'ABM Strategy',
    summary: 'High-value account targeting & orchestration.',
    description: 'ITSMA ABM Certified expert. Comprehensive framework development for 1:1, 1:Few, and 1:Many campaigns. Proven track record of aligning Sales and Marketing around target accounts to drive revenue.',
    coordinates: { x: 50, y: 50 },
    relatedIds: ['role-amcs', 'role-redhat', 'tech-abm-platforms'],
    icon: 'lightbulb'
  },
  {
    id: 'skill-ops',
    districtId: 'marketing',
    type: 'skill',
    label: 'Marketing Operations',
    summary: 'RevOps, Data Governance & Efficiency.',
    description: 'Architecting revenue engines. Expertise in reducing manual reporting times (e.g., from 4 days to 2 hours at Salesforce), improving database health by 30%+, and implementing scoring models.',
    coordinates: { x: 58, y: 45 },
    relatedIds: ['role-prgx', 'role-salesforce', 'tech-salesforce'],
    icon: 'lightbulb'
  },
  {
    id: 'skill-demand',
    districtId: 'marketing',
    type: 'skill',
    label: 'Demand Generation',
    summary: 'Integrated multi-channel campaigns.',
    description: 'Full-funnel optimization strategies. Mastery of SEO/SEM, paid social, and content syndication to drive MQL to SQL conversion. Experience managing multi-million dollar budgets.',
    coordinates: { x: 62, y: 55 },
    relatedIds: ['role-prgx', 'role-startups'],
    icon: 'lightbulb'
  },
  {
    id: 'skill-analytics',
    districtId: 'marketing',
    type: 'skill',
    label: 'Analytics & Attribution',
    summary: 'Data-driven decision making.',
    description: 'Expertise in multi-touch attribution models, Tableau, GA4, and connecting disparate data sources to tell a cohesive performance story. Formulated data quality frameworks.',
    coordinates: { x: 55, y: 65 },
    relatedIds: ['role-early-finance', 'tech-analytics'],
    icon: 'lightbulb'
  },

  // --- Technologies District ---
  {
    id: 'tech-salesforce',
    districtId: 'technologies',
    type: 'technology',
    label: 'Salesforce Ecosystem',
    summary: 'CRM Architecture & Admin.',
    description: 'Deep expertise in Salesforce CRM, dashboard creation, and integration management. Experience instructing teams on Salesforce usage for campaign tracking.',
    coordinates: { x: 80, y: 20 },
    relatedIds: ['role-salesforce', 'skill-ops'],
    icon: 'cog'
  },
  {
    id: 'tech-abm-platforms',
    districtId: 'technologies',
    type: 'technology',
    label: 'ABM Platforms',
    summary: 'Demandbase & 6sense.',
    description: 'Implementation and orchestration of ABM platforms. Leveraging intent data and predictive analytics to identify in-market accounts and personalize journeys.',
    coordinates: { x: 75, y: 28 },
    relatedIds: ['role-prgx', 'skill-abm'],
    icon: 'cog'
  },
  {
    id: 'tech-martech',
    districtId: 'technologies',
    type: 'technology',
    label: 'Marketing Automation',
    summary: 'Marketo, Eloqua, HubSpot.',
    description: 'Advanced nurture streams, lead scoring models, and revenue cycle analytics. Managed end-to-end demand gen programs using Marketo and Salesforce.',
    coordinates: { x: 85, y: 25 },
    relatedIds: ['role-startups', 'skill-demand'],
    icon: 'cog'
  },
  {
    id: 'tech-analytics',
    districtId: 'technologies',
    type: 'technology',
    label: 'Analytics Stack',
    summary: 'Tableau, GA4, Power BI.',
    description: 'Visualizing data to drive business decisions. Migrated spreadsheet-based scorecards to Tableau at Salesforce.',
    coordinates: { x: 82, y: 35 },
    relatedIds: ['skill-analytics'],
    icon: 'cog'
  },

  // --- Industries District ---
  {
    id: 'ind-saas',
    districtId: 'industries',
    type: 'industry',
    label: 'SaaS / Enterprise Tech',
    summary: 'B2B Software & Subscription Models.',
    description: 'Extensive background in the subscription economy, ARR growth, and retention strategies across Salesforce, Red Hat, and PRGX.',
    coordinates: { x: 75, y: 75 },
    relatedIds: ['role-salesforce', 'role-redhat'],
    icon: 'globe'
  },
  {
    id: 'ind-fintech',
    districtId: 'industries',
    type: 'industry',
    label: 'FinTech & Services',
    summary: 'Financial Services Sector.',
    description: 'Experience bridging traditional banking and modern solutions via roles at Bank of Tokyo, S&P, and Goldman Sachs.',
    coordinates: { x: 82, y: 80 },
    relatedIds: ['role-early-finance'],
    icon: 'globe'
  },
  {
    id: 'ind-logistics',
    districtId: 'industries',
    type: 'industry',
    label: 'Logistics & Manufacturing',
    summary: 'Supply Chain Technologies.',
    description: 'Targeted enterprise companies in Transport Logistics, Fleet Management, and Industrial Manufacturing during tenure at AMCS Group.',
    coordinates: { x: 70, y: 85 },
    relatedIds: ['role-amcs'],
    icon: 'globe'
  },
];