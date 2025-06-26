import type { Professional, ProfessionalFormValues } from "../types/profesional";

export const validateProfessional = (values: ProfessionalFormValues) => {
  const errors: Partial<Record<keyof Professional, string>> = {};
  if (!values.name) {
    errors.name = "Required";
  }
  else if (typeof values.name !== "string") {
    errors.name = "Invalid name";
  }
  return errors;
};
