import { DISTRICTS } from './constants';

export const RESUME_DATA = [
  // =========================================================================
  // LEFT SIDE: EARLY CAREER & FINANCE (X: 200 - 800)
  // =========================================================================
  {
    id: "role-goldman",
    label: "Goldman Sachs",
    districtId: "wall-street",
    type: "role",
    startYear: 2000,
    endYear: 2002,
    x: 300, y: 500, 
    summary: "L&PD Analyst.",
    description: "Directed implementation of Enterprise Learning Management System (LMS).",
    metrics: ["Enterprise LMS Launch"],
    relatedIds: ["skill-training", "ind-fintech"]
  },
  {
    id: "role-sp",
    label: "Standard & Poor's",
    districtId: "wall-street",
    type: "role",
    startYear: 2003,
    endYear: 2005,
    x: 500, y: 600, 
    summary: "LMS Strategist.",
    description: "Recognized by CEO for delivering Marketing Technology projects on-time.",
    metrics: ["CEO Recognition"],
    relatedIds: ["role-goldman"]
  },
  {
    id: "ind-fintech",
    label: "FinTech Sector",
    districtId: "industries",
    type: "industry",
    startYear: 2000,
    endYear: 2006,
    x: 400, y: 800,
    summary: "Financial Services.",
    description: "Navigating high-compliance, data-sensitive financial sectors.",
    metrics: [],
    relatedIds: ["role-goldman"]
  },

  // =========================================================================
  // MIDDLE LEFT: MARKETING & GROWTH (X: 900 - 1500)
  // =========================================================================
  {
    id: "role-salem",
    label: "SalemGlobal",
    districtId: "marketing",
    type: "role",
    startYear: 2006,
    endYear: 2008,
    x: 1000, y: 400,
    summary: "Sr. Manager Online Mktg.",
    description: "Achieved 500% growth in new clients YoY.",
    metrics: ["500% Client Growth"],
    relatedIds: ["skill-seo"]
  },
  {
    id: "skill-seo",
    label: "SEO & Content",
    districtId: "marketing",
    type: "skill",
    startYear: 2006,
    endYear: 2025,
    x: 1200, y: 300,
    summary: "Organic Growth.",
    description: "Technical SEO and content strategy for visibility.",
    metrics: [],
    relatedIds: ["role-salem"]
  },
  {
    id: "role-embarcadero",
    label: "Embarcadero",
    districtId: "marketing",
    type: "role",
    startYear: 2008,
    endYear: 2011,
    x: 1400, y: 500,
    summary: "Global Online Mgr.",
    description: "Managed SEO, Paid Advertising, and Ops.",
    metrics: ["Ops Lead"],
    relatedIds: ["tech-salesforce"]
  },

  // =========================================================================
  // CENTER: TECH HUB & LEADERSHIP (X: 1600 - 2200)
  // =========================================================================
  {
    id: "role-salesforce",
    label: "Salesforce",
    districtId: "silicon-valley",
    type: "role",
    startYear: 2014,
    endYear: 2021,
    x: 1800, y: 600, // Dead Center
    summary: "Global Practice Leader.",
    description: "7+ years leading Global Marketing Ops. Supported 95+ marketers.",
    metrics: ["87% Pipeline Lift", "Reduced Reporting 4d to 2h"],
    relatedIds: ["tech-salesforce", "skill-ops"]
  },
  {
    id: "tech-salesforce",
    label: "Salesforce CRM",
    districtId: "technologies",
    type: "technology",
    startYear: 2011,
    endYear: 2025,
    x: 1900, y: 800,
    summary: "The Ecosystem.",
    description: "Deep configuration and flow automation expertise.",
    metrics: [],
    relatedIds: ["role-salesforce"]
  },
  {
    id: "skill-ops",
    label: "RevOps Strategy",
    districtId: "marketing",
    type: "skill",
    startYear: 2014,
    endYear: 2025,
    x: 1700, y: 750,
    summary: "Operational Excellence.",
    description: "Building scalable tech stacks and attribution models.",
    metrics: [],
    relatedIds: ["role-salesforce", "role-prgx"]
  },

  // =========================================================================
  // MIDDLE RIGHT: ENTERPRISE & ABM (X: 2300 - 2600)
  // =========================================================================
  {
    id: "role-redhat",
    label: "Red Hat",
    districtId: "silicon-valley",
    type: "role",
    startYear: 2021,
    endYear: 2023,
    x: 2300, y: 500, 
    summary: "Sr. Principal PM, ABM.",
    description: "Designed Global ABM Customer Activation framework.",
    metrics: ["33% of Global Pipeline"],
    relatedIds: ["skill-abm"]
  },
  {
    id: "skill-abm",
    label: "ABM Strategy",
    districtId: "marketing",
    type: "skill",
    startYear: 2014,
    endYear: 2025,
    x: 2400, y: 350,
    summary: "Account Based Marketing.",
    description: "Orchestrating multi-channel campaigns for high-value accounts.",
    metrics: [],
    relatedIds: ["role-redhat", "role-prgx"]
  },
  {
    id: "tech-6sense",
    label: "6sense / Demandbase",
    districtId: "technologies",
    type: "technology",
    startYear: 2018,
    endYear: 2025,
    x: 2500, y: 700,
    summary: "Intent Platforms.",
    description: "Leveraging predictive analytics for sales outreach.",
    metrics: [],
    relatedIds: ["skill-abm"]
  },

  // =========================================================================
  // RIGHT SIDE: CURRENT & INDUSTRIAL (X: 2700 - 3000)
  // =========================================================================
  {
    id: "role-prgx",
    label: "PRGX Global",
    districtId: "silicon-valley",
    type: "role",
    startYear: 2024,
    endYear: 2025,
    x: 2800, y: 550, 
    summary: "Director Digital & ABM.",
    description: "Architected unified revenue operating model integrating Demandbase.",
    metrics: ["87% Pipeline Boost"],
    relatedIds: ["tech-6sense", "ind-logistics"]
  },
  {
    id: "ind-logistics",
    label: "Logistics & Mfg",
    districtId: "industries",
    type: "industry",
    startYear: 2023,
    endYear: 2025,
    x: 2900, y: 800,
    summary: "Industrial Tech.",
    description: "Digital transformation for traditional industrial sectors.",
    metrics: [],
    relatedIds: ["role-prgx"]
  }
];

export const getGroupedData = () => {
  const groups = {
    "role": { label: "Experience", items: [] },
    "skill": { label: "Expertise", items: [] },
    "technology": { label: "Technologies", items: [] },
    "industry": { label: "Industries", items: [] }
  };

  RESUME_DATA.forEach(item => {
    if (groups[item.type]) {
      groups[item.type].items.push(item);
    }
  });

  return groups;
};