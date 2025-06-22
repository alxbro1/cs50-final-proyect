import axios from "axios";
import type { RegisterFormValues } from "./validateRegister";

export const sendRegisterData = async (data: RegisterFormValues) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/session/register`,
      data
    );
    return res;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data?.message) {
      alert(err.response.data.message);
    } else {
      alert("Oops... there was an error");
    }
    throw err;
  }
}
