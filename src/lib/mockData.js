export const PERSONAS = [
  { id: "founder", name: "Founder Member", subtitle: "Balanced week • strong recovery" },
  { id: "strain", name: "High Strain Week", subtitle: "Heavy training • watch recovery" },
  { id: "recovery", name: "Great Recovery", subtitle: "Peak readiness • book performance session" }
];

export function metricsForPersona(personaId) {
  // all fake numbers; adjust anytime
  const base = {
    founder: {
      bodyScore: 86,
      sleep: { v: 7.6, unit: "hrs", trend: "+0.4" },
      recovery: { v: 78, unit: "%", trend: "+6" },
      strain: { v: 12.8, unit: "", trend: "-1.2" },
      calories: { v: 2680, unit: "kcal", trend: "+120" },
      steps: { v: 9200, unit: "", trend: "+900" }
    },
    strain: {
      bodyScore: 68,
      sleep: { v: 6.1, unit: "hrs", trend: "-0.7" },
      recovery: { v: 52, unit: "%", trend: "-10" },
      strain: { v: 18.4, unit: "", trend: "+4.1" },
      calories: { v: 3150, unit: "kcal", trend: "+320" },
      steps: { v: 12100, unit: "", trend: "+2100" }
    },
    recovery: {
      bodyScore: 92,
      sleep: { v: 8.2, unit: "hrs", trend: "+0.9" },
      recovery: { v: 86, unit: "%", trend: "+8" },
      strain: { v: 10.1, unit: "", trend: "-2.3" },
      calories: { v: 2440, unit: "kcal", trend: "-90" },
      steps: { v: 8400, unit: "", trend: "+300" }
    }
  };
  return base[personaId] ?? base.founder;
}

export const SERVICES = [
  {
    id: "cryo",
    name: "Cryotherapy",
    desc: "Cold exposure session for recovery and resilience.",
    duration: "10–15 min",
    badge: "Recovery"
  },
  {
    id: "hbot",
    name: "Hyperbaric Oxygen (HBOT)",
    desc: "High-oxygen environment to support recovery protocols.",
    duration: "60 min",
    badge: "Performance"
  },
  {
    id: "redlight",
    name: "Red Light Therapy",
    desc: "Light-based session designed for wellness routines.",
    duration: "15–20 min",
    badge: "Wellness"
  },
  {
    id: "infra",
    name: "Infrared Sauna",
    desc: "Heat session to complement recovery and relaxation.",
    duration: "30–45 min",
    badge: "Relax"
  },
  {
    id: "icebath",
    name: "Ice Bath",
    desc: "Contrast option for recovery days.",
    duration: "8–12 min",
    badge: "Recovery"
  },
  {
    id: "consult",
    name: "Clinician Consult",
    desc: "General wellness consultation (demo UI only).",
    duration: "30 min",
    badge: "Concierge"
  },
  {
    id: "biomarker",
    name: "Biomarker Panel",
    desc: "Lab markers overview screen (demo UI only).",
    duration: "15 min intake",
    badge: "Data"
  }
];

export function timeSlots() {
  return [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM"
  ];
}

export const MEMBERSHIPS = [
  {
    id: "founding",
    name: "Founding Member",
    price: "$299 / mo",
    bullets: ["2 recovery sessions / week", "Wearable data dashboard", "Concierge booking"]
  },
  {
    id: "signature",
    name: "Signature",
    price: "$599 / mo",
    bullets: ["Unlimited recovery services", "Monthly biomarker check-in", "Priority scheduling"]
  },
  {
    id: "elite",
    name: "Elite",
    price: "$999 / mo",
    bullets: ["White-glove concierge", "Personal protocol planning", "VIP events + perks"]
  }
];
