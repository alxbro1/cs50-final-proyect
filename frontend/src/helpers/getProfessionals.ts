import axios from "axios";
import type { Professional } from "../types/profesional";

export const getProfessionals = async (): Promise<Professional[]> => {
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/professionals`
    );
    return result.data.professionals; // Ajusta según la respuesta real del backend
  } catch {
    throw Error("Could not fetch professionals");
  }
};