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
const profesional_1 = __importDefault(require("../services/profesional"));
class ProfessionalController {
    getProfessionals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const professionals = yield profesional_1.default.getProfessionals();
            return res.json(professionals);
        });
    }
    createProfessional(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const newProfessional = yield profesional_1.default.createProfessional(data);
            res.status(201).json(newProfessional);
        });
    }
    deleteProfessional(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deletedProfessional = yield profesional_1.default.deleteProfessional(Number(id));
            if (!deletedProfessional) {
                return res.status(404).json({ error: "Professional not found" });
            }
            res.status(204).send();
        });
    }
    getFields(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = yield profesional_1.default.getFields();
            return res.json(fields);
        });
    }
    updateProfessional(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            const updatedProfessional = yield profesional_1.default.updateProfessional(Number(id), data);
            if (!updatedProfessional) {
                return res.status(404).json({ error: "Professional not found" });
            }
            res.json(updatedProfessional);
        });
    }
}
exports.default = ProfessionalController;
