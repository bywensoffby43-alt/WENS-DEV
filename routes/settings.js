import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    res.json({
        success: true,
        settings: {}
    });
});

router.put("/", async (req, res) => {
    res.json({
        success: true,
        message: "Settings Updated"
    });
});

export default router;