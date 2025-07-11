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
class ProfessionalService {
    static getProfessionals() {
        return __awaiter(this, void 0, void 0, function* () {
            const professionals = yield db_1.default.professional.findMany();
            return professionals;
        });
    }
    static createProfessional(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProfessional = yield db_1.default.professional.create({
                data,
            });
            return newProfessional;
        });
    }
    static deleteProfessional(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProfessional = yield db_1.default.professional.delete({
                where: { id },
            });
            return deletedProfessional;
        });
    }
    static getFields() {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = [{ label: "ID", name: "id", type: "number" }, { label: "Name", name: "name", type: "string" }];
            return fields;
        });
    }
    static updateProfessional(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProfessional = yield db_1.default.professional.update({
                where: { id },
                data,
            });
            return updatedProfessional;
        });
    }
}
exports.default = ProfessionalService;
