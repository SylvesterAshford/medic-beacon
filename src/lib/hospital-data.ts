export interface Hospital {
  id: number;
  name: string;
  city: string;
  state: string;
  beds: string;
  latitude: number;
  longitude: number;
  ownership: string;
  type: string;
}

export const hospitals: Hospital[] = [
  {
    id: 1,
    name: "Yangon General Hospital",
    city: "Yangon",
    state: "Yangon Region",
    beds: "1500",
    latitude: 16.7784,
    longitude: 96.1561,
    ownership: "Government",
    type: "Teaching Hospital",
  },
  {
    id: 2,
    name: "Victoria Hospital",
    city: "Yangon",
    state: "Yangon Region",
    beds: "120",
    latitude: 16.8025,
    longitude: 96.1496,
    ownership: "Private",
    type: "Multi-Specialty",
  },
  {
    id: 3,
    name: "Pun Hlaing Siloam Hospital",
    city: "Yangon",
    state: "Yangon Region",
    beds: "350",
    latitude: 16.8543,
    longitude: 96.0891,
    ownership: "Private",
    type: "Multi-Specialty",
  },
  {
    id: 4,
    name: "Asia Royal Hospital",
    city: "Yangon",
    state: "Yangon Region",
    beds: "250",
    latitude: 16.8176,
    longitude: 96.1351,
    ownership: "Private",
    type: "Multi-Specialty",
  },
  {
    id: 5,
    name: "Mandalay General Hospital",
    city: "Mandalay",
    state: "Mandalay Region",
    beds: "1000",
    latitude: 21.9588,
    longitude: 96.0891,
    ownership: "Government",
    type: "Teaching Hospital",
  },
  {
    id: 6,
    name: "Shwe Pyi Thar Hospital",
    city: "Yangon",
    state: "Yangon Region",
    beds: "200",
    latitude: 16.8849,
    longitude: 96.0891,
    ownership: "Private",
    type: "General Hospital",
  },
  {
    id: 7,
    name: "Naypyidaw General Hospital",
    city: "Naypyidaw",
    state: "Naypyidaw Union Territory",
    beds: "800",
    latitude: 19.7633,
    longitude: 96.0785,
    ownership: "Government",
    type: "Teaching Hospital",
  },
  {
    id: 8,
    name: "Grand Hantha International Hospital",
    city: "Yangon",
    state: "Yangon Region",
    beds: "180",
    latitude: 16.8294,
    longitude: 96.1642,
    ownership: "Private",
    type: "Multi-Specialty",
  },
  {
    id: 9,
    name: "Thingangyun Sanpya Hospital",
    city: "Yangon",
    state: "Yangon Region",
    beds: "300",
    latitude: 16.8092,
    longitude: 96.1772,
    ownership: "Private",
    type: "General Hospital",
  },
  {
    id: 10,
    name: "Bago General Hospital",
    city: "Bago",
    state: "Bago Region",
    beds: "500",
    latitude: 17.3354,
    longitude: 96.4807,
    ownership: "Government",
    type: "General Hospital",
  },
];

export const getStates = (): string[] => {
  const states = new Set(hospitals.map((h) => h.state));
  return Array.from(states).sort();
};

export const getCities = (): string[] => {
  const cities = new Set(hospitals.map((h) => h.city));
  return Array.from(cities).sort();
};

export const getEstimatedCost = (hospital: Hospital, procedure: string): number => {
  const baseCost = hospital.ownership === "Private" ? 5000 : 2000;
  const procedureMultiplier = procedure === "All Procedures" ? 1 : 1.5;
  return Math.round(baseCost * procedureMultiplier);
};

export const getEstimatedRating = (hospital: Hospital): number => {
  const baseRating = hospital.ownership === "Private" ? 4.2 : 3.8;
  const randomVariation = Math.random() * 0.6 - 0.3;
  return Math.round((baseRating + randomVariation) * 10) / 10;
};

export const getEstimatedWaitTime = (hospital: Hospital): string => {
  const beds = hospital.beds === "NA" ? 100 : parseInt(hospital.beds);
  
  if (beds > 800) return "45-60 min";
  if (beds > 400) return "30-45 min";
  if (beds > 200) return "20-30 min";
  return "15-25 min";
};
