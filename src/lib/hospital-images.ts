import hospital1 from "@/assets/hospital-1.jpg";
import hospital2 from "@/assets/hospital-2.jpg";
import hospital3 from "@/assets/hospital-3.jpg";
import hospital4 from "@/assets/hospital-4.jpg";
import hospital5 from "@/assets/hospital-5.jpg";
import hospital6 from "@/assets/hospital-6.jpg";

export const hospitalImages = [
  hospital1,
  hospital2,
  hospital3,
  hospital4,
  hospital5,
  hospital6,
];

export const getHospitalImage = (hospitalId: number): string => {
  // Use modulo to cycle through available images
  const index = (hospitalId - 1) % hospitalImages.length;
  return hospitalImages[index];
};
