const passwordPattern = /^.{5,30}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LoginData {
  email?: string;
  password?: string;
}

export const validateLoginForm = (data: LoginData) => {
    const errorObjet: Record<string, string> = {}
  if (!data.password || !passwordPattern.test(data.password)) {
    errorObjet.password = "Password must be between 5 and 30 characters";
  }
  if (!data.email || !emailPattern.test(data.email)) {
    errorObjet.email =
      "Email must be a valid email address";
  }

  return errorObjet
}