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