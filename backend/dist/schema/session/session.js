"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSessionSchema = exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6).max(100),
});
exports.registerSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6).max(100),
    name: zod_1.default.string().min(2).max(100),
    role: zod_1.default.enum(["PATIENT", "ADMIN"]).default("PATIENT"),
});
exports.checkSessionSchema = zod_1.default.object({
    token: zod_1.default.string().min(10).max(100),
});
