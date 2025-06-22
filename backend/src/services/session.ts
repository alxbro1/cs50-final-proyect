import prisma from "../config/db";
import {
  CheckSessionSchema,
  LoginSchema,
  RegisterSchema,
} from "../schema/session/session";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class SessionService {
  static async login(data: LoginSchema) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: "User not found",
        };
      }

      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
      );
      if (!isPasswordValid) {
        return {
          status: 401,
          message: "Invalid password",
        };
      }

      const { password, ...userWithoutPassword } = user;
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      return {
        status: 200,
        message: "Login successful",
        data: userWithoutPassword,
        token,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        status: 500,
        message: "Failed to login",
      };
    }
  }

  static async register(data: RegisterSchema) {
    try {
      const userExists = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (userExists) {
        return {
          status: 400,
          message: "User already exists",
        };
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name,
          role: data.role || "PATIENT",
        },
      });

      const { password, ...userWithoutPassword } = user;
      return {
        status: 201,
        message: "User created successfully",
        data: userWithoutPassword,
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        status: 500,
        message: "Failed to register user",
      };
    }
  }

  static async checkSession(data: CheckSessionSchema) {
    try {
      const decoded = jwt.verify(data.token, process.env.JWT_SECRET!);
      const user = await prisma.user.findUnique({
        where: {
          id: (decoded as any).id,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: "User not found",
        };
      }

      const { password, ...userWithoutPassword } = user;
      return {
        status: 200,
        message: "Session is valid",
        data: userWithoutPassword,
      };
    } catch (error) {
      console.error("Session check error:", error);
      return {
        status: 401,
        message: "Invalid session",
      };
    }
  }
}
