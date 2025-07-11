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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_1 = __importDefault(require("../services/session"));
const session_2 = require("../schema/session/session");
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = session_2.loginSchema.parse(req.body);
            if (!data) {
                return res.status(400).json({ error: "Invalid login data" });
            }
            const result = yield session_1.default.login(data);
            if (result.status === 401) {
                return res.status(result.status).json({ message: result.message });
            }
            else if (result.status === 404) {
                return res.status(result.status).json({ message: result.message });
            }
            return res.json(result);
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = session_2.registerSchema.parse(req.body);
            if (!data) {
                return res.status(400).json({ error: "Invalid registration data" });
            }
            const result = yield session_1.default.register(data);
            return res.json(result);
        });
    }
    static checkSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "No token provided" });
            }
            const token = authHeader.split(" ")[1];
            const result = yield session_1.default.checkSession({ token });
            if (result.status === 401) {
                return res.status(result.status).json({ message: result.message });
            }
            return res.status(result.status).json(result.data);
        });
    }
}
exports.default = AuthController;
