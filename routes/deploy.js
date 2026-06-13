import express from "express";

import {
    deployZip,
    deployGithub
} from "../services/deployService.js";

import {
    startBot,
    stopBot,
    restartBot
} from "../services/processService.js";

const router = express.Router();

// Deploy Routes
router.post("/zip", deployZip);
router.post("/github", deployGithub);

// Bot Process Routes
router.post("/start/:id", startBot);
router.post("/stop/:id", stopBot);
router.post("/restart/:id", restartBot);

export default router;