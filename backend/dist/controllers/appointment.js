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
const appointment_1 = __importDefault(require("../services/appointment"));
class AppointmentController {
    getAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.query.userId ? Number(req.query.userId) : undefined;
            if (userId) {
                const appointments = yield appointment_1.default.getAppointments(userId);
                return res.json(appointments);
            }
            const professionalId = req.query.professionalId
                ? Number(req.query.professionalId)
                : undefined;
            if (professionalId) {
                const appointments = yield appointment_1.default.getAppointments(undefined, professionalId);
                return res.json(appointments);
            }
            const appointments = yield appointment_1.default.getAppointments();
            return res.json(appointments);
        });
    }
    createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const newAppointment = yield appointment_1.default.createAppointment(data);
            res.status(201).json(newAppointment);
        });
    }
    deleteAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deletedAppointment = yield appointment_1.default.deleteAppointment(Number(id));
            if (!deletedAppointment) {
                return res.status(404).json({ error: "Appointment not found" });
            }
            res.status(204).send();
        });
    }
    getFields(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = yield appointment_1.default.getFields();
            return res.json(fields);
        });
    }
    updateAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            const updatedAppointment = yield appointment_1.default.updateAppointment(Number(id), data);
            if (!updatedAppointment) {
                return res.status(404).json({ error: "Appointment not found" });
            }
            res.json(updatedAppointment);
        });
    }
}
exports.default = AppointmentController;
