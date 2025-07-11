"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const session_1 = __importDefault(require("./routes/session"));
const users_1 = __importDefault(require("./routes/users"));
const profesional_1 = __importDefault(require("./routes/profesional"));
const appointment_1 = __importDefault(require("./routes/appointment"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.use("/public", express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/session", session_1.default);
app.use("/professionals", profesional_1.default);
app.use("/users", users_1.default);
app.use("/appointments", appointment_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({
        error: "Server error",
        details: err.message || "Unknown error",
    });
});
app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
