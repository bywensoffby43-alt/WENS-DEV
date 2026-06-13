import express from "express";

import {
    getLogs,
    getBotLogs
} from "../services/logService.js";

const router = express.Router();

// All Logs
router.get("/", getLogs);

// Bot Logs
router.get("/:botId", getBotLogs);

export default router;