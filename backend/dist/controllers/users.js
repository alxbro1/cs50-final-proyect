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
const users_1 = __importDefault(require("../services/users"));
class UsersController {
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield users_1.default.getUsers();
            return res.json(users);
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deletedUser = yield users_1.default.deleteUser(Number(id));
            if (!deletedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(204).send();
        });
    }
    static getFields(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = yield users_1.default.getFields();
            return res.json(fields);
        });
    }
}
exports.default = UsersController;
