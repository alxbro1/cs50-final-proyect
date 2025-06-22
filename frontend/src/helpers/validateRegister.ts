const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^.{5,30}$/;
const usernamePattern = /^[A-Za-z0-9_]{5,30}$/;

export interface RegisterFormValues {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export const validationRegisterForm = ({
  name,
  username,
  password,
  confirmPassword,
  email,
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
