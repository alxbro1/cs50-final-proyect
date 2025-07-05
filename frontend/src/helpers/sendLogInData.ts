import axios from "axios"

interface LogInData {
    email: string;
    password: string;
}

interface User {
    id?: string;
    name: string;
    email: string;
    role: string;
}

export const sendLogInData = async (data: LogInData): Promise<User> => {
    try {
        const result = await axios.post(
            `${import.meta.env.VITE_API_URL}/session/login`,
            data
        );
     
        if (result && result.status == 200) {
            localStorage.setItem("token", result.data.token);
            return result.data;
        }
        throw Error("Invalid response");
    } catch {
        throw Error("user not found");
    }
} 