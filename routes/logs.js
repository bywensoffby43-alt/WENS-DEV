import express from "express";

import {
    getLogs,
    getBotLogs
} from "../services/logService.js";

import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    res.json({
        success: true,
        logs: []
    });
});

router.get("/:botId", async (req, res) => {
    res.json({
        success: true,
        botId: req.params.botId
    });
});

export default router;