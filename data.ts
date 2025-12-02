import { DISTRICTS } from './constants';

export const RESUME_DATA = [
  // =========================================================================
  // WALL STREET DISTRICT (2000 - 2006)
  // Location: Top Left (The Stone Buildings)
  // =========================================================================
  {
    id: "role-goldman",
    label: "Goldman Sachs",
    districtId: "wall-street",
    type: "role",
    startYear: 2000,
    endYear: 2002,
    x: 650, y: 750, 
    summary: "L&PD Analyst.",
    description: "Directed implementation of Enterprise Learning Management System (LMS) and managed all eLearning projects and reporting tools.",
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
    x: 850, y: 650, 
    summary: "LMS Strategist.",
    description: "Recognized by CEO for delivering one of the first Marketing Technology projects completed on-time and within budget in a decade.",
    metrics: ["CEO Recognition", "Global Reporting System"],
    relatedIds: ["role-goldman", "skill-training"]
  },
  {
    id: "role-btm",
    label: "Bank of Tokyo-Mitsubishi",
    districtId: "wall-street",
    type: "role",
    startYear: 2005,
    endYear: 2006,
    x: 800, y: 900, 
    summary: "Business Analyst.",
    description: "Designed, implemented and trained team members on internal Credit Portfolio Management System (CPMS).",
    metrics: ["App Development", "Test Planning"],
    relatedIds: ["role-sp", "ind-fintech"]
  },

  // =========================================================================
  // MARKETING DISTRICT (The Bridge: 2006 - 2011)
  // Location: Top Right (Media Towers)
  // =========================================================================
  {
    id: "role-salem",
    label: "SalemGlobal Internet",
    districtId: "marketing",
    type: "role",
    startYear: 2006,
    endYear: 2008,
    x: 3000, y: 700,
    summary: "Sr. Manager Online Marketing.",
    description: "Achieved 500% growth in new clients YoY and consistently maintained 85% retention and renewal rate.",
    metrics: ["500% Client Growth", "85% Retention"],
    relatedIds: ["skill-seo", "skill-ppc"]
  },
  {
    id: "role-embarcadero",
    label: "Embarcadero Tech",
    districtId: "marketing",
    type: "role",
    startYear: 2008,
    endYear: 2011,
    x: 3300, y: 600,
    summary: "Global Online Marketing Mgr.",
    description: "Managed SEO, Paid Advertising (SEM), and Marketing Operations (Eloqua/Salesforce) for global campaigns.",
    metrics: ["SEO Analysis", "Marketing Ops Lead"],
    relatedIds: ["role-salem", "tech-salesforce"]
  },
  {
    id: "skill-seo",
    label: "SEO & Content",
    districtId: "marketing",
    type: "skill",
    startYear: 2006,
    endYear: 2025,
    x: 3600, y: 550,
    summary: "Organic Growth Strategy.",
    description: "Technical SEO, site architecture, and content strategy for long-term visibility.",
    metrics: [],
    relatedIds: ["role-salem", "role-embarcadero"]
  },
  {
    id: "skill-ppc",
    label: "Paid Media / SEM",
    districtId: "marketing",
    type: "skill",
    startYear: 2006,
    endYear: 2025,
    x: 3600, y: 750,
    summary: "Performance Marketing.",
    description: "Managing Google Ads and LinkedIn campaigns with a focus on ROAS and CAC.",
    metrics: [],
    relatedIds: ["role-salem", "role-prgx"]
  },

  // =========================================================================
  // SILICON VALLEY DISTRICT (The Scale Up: 2011 - Present)
  // Location: Center (The Future Hub)
  // =========================================================================
  {
    id: "role-crowd",
    label: "Crowd Factory",
    districtId: "silicon-valley",
    type: "role",
    startYear: 2011,
    endYear: 2012,
    x: 1700, y: 1600, 
    summary: "Sr. Mgr Marketing.",
    description: "Delivered lead gen roadmap with Marketo/Salesforce. Acquired by Marketo.",
    metrics: ["43% Net New Leads QoQ", "164% Visitor Growth"],
    relatedIds: ["role-embarcadero", "tech-marketo"]
  },
  {
    id: "role-get-sat",
    label: "Get Satisfaction",
    districtId: "silicon-valley",
    type: "role",
    startYear: 2012,
    endYear: 2014,
    x: 1800, y: 1450, 
    summary: "Director Demand Gen.",
    description: "Responsible for all Demand Gen: Lead Gen, Automation, SEM, SEO, and Sales Enablement.",
    metrics: ["End-to-End Demand Gen", "ROI Analysis"],
    relatedIds: ["role-crowd", "tech-marketo"]
  },
  {
    id: "role-salesforce",
    label: "Salesforce",
    districtId: "silicon-valley",
    type: "role",
    startYear: 2014,
    endYear: 2021,
    x: 2048, y: 1500, // Center Stage
    summary: "Global Practice Leader.",
    description: "7+ years leading Global Marketing Ops and Enterprise Campaigns. Supported 95+ marketers and Fortune 50 accounts.",
    metrics: ["87% Pipeline Lift", "Reduced Reporting 4d to 2h"],
    relatedIds: ["tech-salesforce", "skill-ops", "role-get-sat"]
  },
  {
    id: "role-redhat",
    label: "Red Hat",
    districtId: "silicon-valley",
    type: "role",
    startYear: 2021,
    endYear: 2023,
    x: 2300, y: 1300, 
    summary: "Sr. Principal PM, ABM.",
    description: "Designed Global ABM Customer Activation framework providing guidance for 200+ Enterprise customers.",
    metrics: ["33% of Global Pipeline", "25% MQL Increase"],
    relatedIds: ["role-salesforce", "skill-abm"]
  },
  {
    id: "role-amcs",
    label: "AMCS Group",
    districtId: "silicon-valley",
    type: "role",
    startYear: 2023,
    endYear: 2024,
    x: 2400, y: 1550, 
    summary: "Director ABM.",
    description: "Generated $1.2M pipeline in 90 days by deploying industry-related paid media campaigns.",
    metrics: ["$1.2M Pipeline in 90d", "50% ROI Improvement"],
    relatedIds: ["role-redhat", "ind-logistics"]
  },
  {
    id: "role-prgx",
    label: "PRGX Global",
    districtId: "silicon-valley",
    type: "role",
    startYear: 2024,
    endYear: 2025,
    x: 2200, y: 1700, 
    summary: "Director Digital & ABM.",
    description: "Architected unified revenue operating model integrating Demandbase and CRM. Current role.",
    metrics: ["87% Pipeline Boost YoY", "500% Team Expansion"],
    relatedIds: ["role-amcs", "tech-6sense"]
  },

  // =========================================================================
  // TECH STACK DISTRICT (Tools & Platforms)
  // Location: Bottom Right (The Servers)
  // =========================================================================
  {
    id: "tech-salesforce",
    label: "Salesforce CRM",
    districtId: "technologies",
    type: "technology",
    startYear: 2011, // Started using at Crowd Factory
    endYear: 2025,
    x: 3300, y: 2200,
    summary: "CRM & Ecosystem.",
    description: "Deep experience in configuration, flow automation, and sales alignment within SFDC.",
    metrics: [],
    relatedIds: ["role-salesforce"]
  },
  {
    id: "tech-marketo",
    label: "Marketo / Adobe",
    districtId: "technologies",
    type: "technology",
    startYear: 2011,
    endYear: 2025,
    x: 3500, y: 2300,
    summary: "Marketing Automation.",
    description: "Expert level workflow automation, email marketing, and lead lifecycle management.",
    metrics: [],
    relatedIds: ["role-crowd", "role-salesforce"]
  },
  {
    id: "tech-6sense",
    label: "6sense / Demandbase",
    districtId: "technologies",
    type: "technology",
    startYear: 2018,
    endYear: 2025,
    x: 3000, y: 2100,
    summary: "ABM Platforms.",
    description: " leveraging intent data and predictive analytics to prioritize sales outreach.",
    metrics: [],
    relatedIds: ["skill-abm", "role-prgx"]
  },
  {
    id: "tech-hubspot",
    label: "HubSpot",
    districtId: "technologies",
    type: "technology",
    startYear: 2016,
    endYear: 2025,
    x: 3600, y: 2100,
    summary: "Inbound Marketing.",
    description: "Full stack marketing automation and CRM management for growth stage companies.",
    metrics: [],
    relatedIds: ["role-salem"]
  },

  // =========================================================================
  // EXPERTISE & INDUSTRIES (Strategic Layer)
  // Location: Bottom Left & Scattered
  // =========================================================================
  {
    id: "skill-abm",
    label: "ABM Strategy",
    districtId: "marketing", // Visually near marketing
    type: "skill",
    startYear: 2014,
    endYear: 2025,
    x: 3200, y: 950,
    summary: "Account Based Marketing.",
    description: "Orchestrating multi-channel campaigns targeting high-value enterprise accounts.",
    metrics: ["Targeted Fortune 500s"],
    relatedIds: ["role-salesforce", "role-redhat"]
  },
  {
    id: "skill-ops",
    label: "RevOps / Mktg Ops",
    districtId: "marketing",
    type: "skill",
    startYear: 2008,
    endYear: 2025,
    x: 3500, y: 1050,
    summary: "Operational Excellence.",
    description: "Building scalable tech stacks, naming conventions, and attribution models to prove ROI.",
    metrics: ["Attribution Modeling"],
    relatedIds: ["role-salesforce", "role-prgx"]
  },
  {
    id: "ind-fintech",
    label: "FinTech & Banking",
    districtId: "industries",
    type: "industry",
    startYear: 2000,
    endYear: 2006,
    x: 800, y: 2400, // Bottom Left
    summary: "Financial Services.",
    description: "Navigating high-compliance, data-sensitive financial sectors.",
    metrics: [],
    relatedIds: ["role-goldman", "role-btm"]
  },
  {
    id: "ind-saas",
    label: "SaaS / Enterprise",
    districtId: "industries",
    type: "industry",
    startYear: 2011,
    endYear: 2025,
    x: 1000, y: 2100,
    summary: "B2B Technology.",
    description: "Growth strategies for subscription-based enterprise technology.",
    metrics: [],
    relatedIds: ["role-salesforce", "role-redhat"]
  },
  {
    id: "ind-logistics",
    label: "Logistics & Mfg",
    districtId: "industries",
    type: "industry",
    startYear: 2023,
    endYear: 2024,
    x: 1200, y: 2300,
    summary: "Industrial Tech.",
    description: "Digital transformation for traditional industrial sectors.",
    metrics: [],
    relatedIds: ["role-amcs"]
  }
];

// --- GROUPING LOGIC ---
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