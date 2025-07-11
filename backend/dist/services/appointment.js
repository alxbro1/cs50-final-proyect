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
class AppointmentService {
    static getAppointments(userId, professionalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = Object.assign(Object.assign({}, (userId && { userId })), (professionalId && { professionalId }));
            const appointments = yield db_1.default.appointment.findMany({
                where,
                include: {
                    professional: {
                        select: {
                            name: true,
                        },
                    },
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
                orderBy: [
                    { date: "asc" },
                    { hour: "asc" },
                ],
            });
            return appointments;
        });
    }
    static createAppointment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Creating appointment with data:", data);
            const newAppointment = yield db_1.default.appointment.create({
                data,
            });
            return newAppointment;
        });
    }
    static deleteAppointment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedAppointment = yield db_1.default.appointment.delete({
                where: { id },
            });
            return deletedAppointment;
        });
    }
    static getFields() {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = [
                { label: "ID", name: "id", type: "number" },
                { label: "name", name: "user", type: "object" },
                { label: "Date", name: "date", type: "date" },
                { label: "Hour", name: "hour", type: "number" },
                { label: "Status", name: "status", type: "string", select: true, options: ["PENDING", "CONFIRMED", "CANCELLED"] },
                { label: "Created At", name: "createdAt", type: "date" },
                { label: "Updated At", name: "updatedAt", type: "date" },
                { label: "Professional", name: "professional", type: "object" },
            ];
            return fields;
        });
    }
    static updateAppointment(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedAppointment = yield db_1.default.appointment.update({
                where: { id },
                data,
            });
            return updatedAppointment;
        });
    }
}
exports.default = AppointmentService;
