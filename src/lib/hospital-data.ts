import hospitalsData from "@/data/hospitals.json";

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

// Transform JSON data to match Hospital interface
export const hospitals: Hospital[] = hospitalsData.map((hospital) => ({
  id: hospital.id,
  name: hospital.name,
  city: hospital.city,
  state: hospital.state,
  beds: hospital.beds,
  latitude: hospital.coordinates[1], // coordinates are [lng, lat]
  longitude: hospital.coordinates[0],
  ownership: hospital.beds === "NA" || parseInt(hospital.beds) < 200 ? "Private" : "Government",
  type: hospital.beds === "NA" || parseInt(hospital.beds) < 200 ? "General Hospital" : parseInt(hospital.beds) > 500 ? "Teaching Hospital" : "Multi-Specialty",
}));

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
