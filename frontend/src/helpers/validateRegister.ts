const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const birthdatePattern = /^\d{4}-\d{2}-\d{2}$/;
const dniPattern = /^\d{8}$/;
const passwordPattern = /^.{5,30}$/;
const usernamePattern = /^[A-Za-z0-9_]{5,30}$/;

export interface RegisterFormValues {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  nDni: number | string;
  birthdate: string;
}

export const validationRegisterForm = ({
  name,
  username,
  password,
  confirmPassword,
  email,
  nDni,
  birthdate,
}: RegisterFormValues) => {
  const error: { [key: string]: string } = {};

  const datosArray = [
    {
      key: "name",
      value: name,
      pattern: namePattern,
      errorMsg:
        "Name must be a string of letters, spaces, and up to 50 characters",
    },
    {
      key: "email",
      value: email,
      pattern: emailPattern,
      errorMsg: "Invalid email format",
    },
    {
      key: "birthdate",
      value: birthdate,
      pattern: birthdatePattern,
      errorMsg: "Birthdate must be in ISO format and not in the future",
    },
    {
      key: "nDni",
      value: nDni.toString(),
      pattern: dniPattern,
      errorMsg: "DNI must be an 8-digit number",
    },
    {
      key: "password",
      value: password,
      pattern: passwordPattern,
      errorMsg: "Password must be between 5 and 30 characters",
    },
    {
      key: "username",
      value: username,
      pattern: usernamePattern,
      errorMsg:
        "Username must be between 5 and 30 characters, containing only letters, numbers, or underscores",
    },
  ];

  for (const dato of datosArray) {
    const { key, value, pattern, errorMsg } = dato;

    if (!value) {
      error[key] = `${key} is required`;
      continue; 
    }

    if (!pattern.test(value)) {
      error[key] = errorMsg;
    }

    if (key === "password" && confirmPassword !== password) {
      error.confirmPassword =
        "The confirm password does not match the main password";
    }

    if (key === "birthdate") {
      const parsedDate = new Date(value);
      const today = new Date();
      if (parsedDate > today) {
        error["birthdate"] = "Birthdate cannot be in the future";
      }
    }
  }

  return error; 
};
