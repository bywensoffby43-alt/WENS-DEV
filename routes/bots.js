import express from "express";
import Bot from "../models/Bot.js";

import {
    startBot,
    stopBot,
    restartBot
} from "../services/processService.js";

import fs from "fs";
import path from "path";
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

const exists = await Bot.findOne({
    name: req.body.name
});

if (exists) {
    return res.status(400).json({
        success: false,
        message: "Bot already exists"
    });
}
        const bot = await Bot.create({
    ...req.body,
    status: "offline"
});

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

// Start Bot
router.post("/:id/start", async (req, res) => {
    ...
});

// Stop Bot
router.post("/:id/stop", async (req, res) => {
    ...
});

// Restart Bot
router.post("/:id/restart", async (req, res) => {
    ...
});

// Get Logs
router.get("/:id/logs", async (req, res) => {
    ...
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