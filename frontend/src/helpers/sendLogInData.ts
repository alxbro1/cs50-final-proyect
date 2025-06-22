import axios from "axios"

interface LogInData {
    email: string;
    password: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export const sendLogInData = async (data: LogInData): Promise<User> => {
    try {
        const result = await axios.post(
            "https://appoinments-system-backend.vercel.app/users/login",
            data
        );
     
        if (result && result.status == 200) {
            return result.data.user;
        }
        throw Error("Invalid response");
    } catch {
        throw Error("user not found");
    }
} 