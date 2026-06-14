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

        const exists =
            await Bot.findOne({
                name: req.body.name
            });

        if (exists) {

            return res.status(400).json({
                success: false,
                message: "Bot already exists"
            });

        }

        const bot =
            await Bot.create({
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

    try {

        const bot =
            await Bot.findById(
                req.params.id
            );

        if (!bot) {

            return res.status(404).json({
                success: false,
                message: "Bot not found"
            });

        }

        await startBot(
            bot.name,
            bot.folderPath
        );

        bot.status = "online";

        await bot.save();

        res.json({
            success: true,
            message: "Bot started"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

// Stop Bot
router.post("/:id/stop", async (req, res) => {

    try {

        const bot =
            await Bot.findById(
                req.params.id
            );

        if (!bot) {

            return res.status(404).json({
                success: false,
                message: "Bot not found"
            });

        }

        await stopBot(
            bot.name
        );

        bot.status = "offline";

        await bot.save();

        res.json({
            success: true,
            message: "Bot stopped"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

// Restart Bot
router.post("/:id/restart", async (req, res) => {

    try {

        const bot =
            await Bot.findById(
                req.params.id
            );

        if (!bot) {

            return res.status(404).json({
                success: false,
                message: "Bot not found"
            });

        }

        await restartBot(
            bot.name
        );

        res.json({
            success: true,
            message: "Bot restarted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

// Get Logs
router.get("/:id/logs", async (req, res) => {

    try {

        const bot =
            await Bot.findById(
                req.params.id
            );

        if (!bot) {

            return res.status(404).json({
                success: false,
                message: "Bot not found"
            });

        }

        const logFile =
            path.join(
                process.cwd(),
                "logs",
                `${bot.name}.log`
            );

        if (!fs.existsSync(logFile)) {

            return res.json({
                success: true,
                logs: ""
            });

        }

        const logs =
            fs.readFileSync(
                logFile,
                "utf8"
            );

        res.json({
            success: true,
            logs
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