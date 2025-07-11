"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class SessionService {
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield db_1.default.user.findUnique({
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
                const isPasswordValid = yield bcrypt_1.default.compare(data.password, user.password);
                if (!isPasswordValid) {
                    return {
                        status: 401,
                        message: "Invalid password",
                    };
                }
                const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
                return {
                    status: 200,
                    message: "Login successful",
                    data: userWithoutPassword,
                    token,
                };
            }
            catch (error) {
                console.error("Login error:", error);
                return {
                    status: 500,
                    message: "Failed to login",
                };
            }
        });
    }
    static register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield db_1.default.user.findUnique({
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
                const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
                const user = yield db_1.default.user.create({
                    data: {
                        email: data.email,
                        password: hashedPassword,
                        name: data.name,
                        role: data.role || "PATIENT",
                    },
                });
                const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                return {
                    status: 201,
                    message: "User created successfully",
                    data: userWithoutPassword,
                };
            }
            catch (error) {
                console.error("Registration error:", error);
                return {
                    status: 500,
                    message: "Failed to register user",
                };
            }
        });
    }
    static checkSession(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(data.token, process.env.JWT_SECRET);
                const user = yield db_1.default.user.findUnique({
                    where: {
                        id: decoded.id,
                    },
                });
                if (!user) {
                    return {
                        status: 404,
                        message: "User not found",
                    };
                }
                const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                return {
                    status: 200,
                    message: "Session is valid",
                    data: userWithoutPassword,
                };
            }
            catch (error) {
                console.error("Session check error:", error);
                return {
                    status: 401,
                    message: "Invalid session",
                };
            }
        });
    }
}
exports.default = SessionService;
