import axios from "axios";
import type { Professional, ProfessionalFormValues } from "../types/profesional";

export const getProfessionals = async (): Promise<Professional[]> => {
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/professionals`
    );
    return result.data.professionals;
  } catch {
    throw Error("Could not fetch professionals");
  }
};

export const createProfessional = async (
  professional: ProfessionalFormValues
): Promise<Professional> => {
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/professionals`,
      professional
    );
    return result.data.professional;
  } catch {
    throw Error("Could not create professional");
  }
};