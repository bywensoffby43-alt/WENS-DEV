import Bot from "../models/Bot.js";
import {
    startBot as pm2StartBot,
    stopBot as pm2StopBot,
    restartBot as pm2RestartBot
} from "../services/processService.js";

export const startBot = async (req, res) => {
    try {

        const bot = await Bot.findById(req.params.id);

        if (!bot) {
            return res.status(404).json({
                success: false,
                message: "Bot not found"
            });
        }

        await pm2StartBot(
            bot.name,
            `./bots/${bot._id}/index.js`
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
};

export const stopBot = async (req, res) => {
    try {

        const bot = await Bot.findById(req.params.id);

        if (!bot) {
            return res.status(404).json({
                success: false,
                message: "Bot not found"
            });
        }

        await pm2StopBot(bot.name);

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
};

export const restartBot = async (req, res) => {
    try {

        const bot = await Bot.findById(req.params.id);

        if (!bot) {
            return res.status(404).json({
                success: false,
                message: "Bot not found"
            });
        }

        await pm2RestartBot(bot.name);

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
};