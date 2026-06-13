import express from "express";
import Bot from "../models/Bot.js";

const router = express.Router();

// Get All Bots
router.get("/", async (req, res) => {
    try {

        const bots = await Bot.find();

        res.json(bots);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});

// Get Single Bot
router.get("/:id", async (req, res) => {
    try {

        const bot = await Bot.findById(
            req.params.id
        );

        if (!bot) {
            return res.status(404).json({
                success: false,
                message: "Bot not found"
            });
        }

        res.json(bot);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});

// Create Bot
router.post("/", async (req, res) => {
    try {

        const bot = await Bot.create(
            req.body
        );

        res.status(201).json({
            success: true,
            bot
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});

// Update Bot
router.put("/:id", async (req, res) => {
    try {

        const bot =
            await Bot.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

        if (!bot) {
            return res.status(404).json({
                success: false,
                message: "Bot not found"
            });
        }

        res.json({
            success: true,
            bot
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});

// Delete Bot
router.delete("/:id", async (req, res) => {
    try {

        const bot =
            await Bot.findByIdAndDelete(
                req.params.id
            );

        if (!bot) {
            return res.status(404).json({
                success: false,
                message: "Bot not found"
            });
        }

        res.json({
            success: true,
            message: "Bot deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});

export default router;