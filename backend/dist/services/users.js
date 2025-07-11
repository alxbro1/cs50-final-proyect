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
const db_1 = __importDefault(require("../config/db"));
class UsersService {
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield db_1.default.user.findMany();
            return users;
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield db_1.default.user.delete({
                where: { id },
            });
            return deletedUser;
        });
    }
    static getFields() {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = [
                { label: "ID", name: "id", type: "string" },
                { label: "Name", name: "name", type: "string" },
                { label: "Email", name: "email", type: "string" },
                { label: "Role", name: "role", type: "string" },
                { label: "Created At", name: "createdAt", type: "date" },
                { label: "Updated At", name: "updatedAt", type: "date" },
            ];
            return fields;
        });
    }
}
exports.default = UsersService;
