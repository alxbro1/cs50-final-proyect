import { CheckSessionSchema, LoginSchema, RegisterSchema } from "../schema/session/loggin";

export default class SessionService {
  static async login(data: LoginSchema) {
    // Logic for user login
    // Validate credentials and return user data or error
  }

  static async register(data: RegisterSchema) {
    // Logic for user registration
    // Create a new user and return user data or error
  }

  static async checkSession(data: CheckSessionSchema) {
    // Logic to check if the session is valid
    // Return session data or error
  }
}