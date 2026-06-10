import express from "express";
import Bot from "../models/Bot.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const bots = await Bot.find();
    res.json(bots);
});

router.get("/:id", async (req, res) => {
    const bot = await Bot.findById(req.params.id);
    res.json(bot);
});

router.post("/", async (req, res) => {
    const bot = await Bot.create(req.body);
    res.json(bot);
});

router.put("/:id", async (req, res) => {
    const bot = await Bot.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(bot);
});

router.delete("/:id", async (req, res) => {
    await Bot.findByIdAndDelete(req.params.id);

    res.json({
        success: true
    });
});

export default router;