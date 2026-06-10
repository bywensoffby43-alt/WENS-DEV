import express from "express";

const router = express.Router();

router.post("/zip", async (req, res) => {
    res.json({
        success: true,
        message: "ZIP Deploy Route"
    });
});

router.post("/github", async (req, res) => {
    res.json({
        success: true,
        message: "GitHub Deploy Route"
    });
});

router.post("/start/:id", async (req, res) => {
    res.json({
        success: true,
        message: "Bot Started"
    });
});

router.post("/stop/:id", async (req, res) => {
    res.json({
        success: true,
        message: "Bot Stopped"
    });
});

router.post("/restart/:id", async (req, res) => {
    res.json({
        success: true,
        message: "Bot Restarted"
    });
});

export default router;