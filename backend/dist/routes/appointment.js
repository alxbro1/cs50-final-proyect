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
const express_1 = require("express");
const appointment_1 = __importDefault(require("../controllers/appointment"));
const router = (0, express_1.Router)();
const controller = new appointment_1.default();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.createAppointment(req, res);
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.getAppointments(req, res);
}));
router.get("/fields", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.getFields(req, res);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.deleteAppointment(req, res);
}));
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.updateAppointment(req, res);
}));
exports.default = router;
