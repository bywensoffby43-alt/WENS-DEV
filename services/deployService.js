import fs from "fs";
import path from "path";
import { exec } from "child_process";

export const deployZip = async (req, res) => {
    try {

        const { botId } = req.body;

        if (!botId) {
            return res.status(400).json({
                success: false,
                message: "Bot ID is required"
            });
        }

        const botPath = path.join(
            process.cwd(),
            "bots",
            botId
        );

        if (!fs.existsSync(botPath)) {
            fs.mkdirSync(
                botPath,
                {
                    recursive: true
                }
            );
        }

        res.json({
            success: true,
            message: "ZIP deployment completed",
            path: botPath
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const deployGithub = async (req, res) => {
    try {

        const {
            botId,
            repoUrl
        } = req.body;

        if (
            !botId ||
            !repoUrl
        ) {
            return res.status(400).json({
                success: false,
                message: "Bot ID and Repo URL are required"
            });
        }

        const botPath = path.join(
            process.cwd(),
            "bots",
            botId
        );

        if (
            fs.existsSync(botPath)
        ) {
            fs.rmSync(
                botPath,
                {
                    recursive: true,
                    force: true
                }
            );
        }

        exec(
            `git clone ${repoUrl} ${botPath}`,
            (error) => {

                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error.message
                    });
                }

                return res.json({
                    success: true,
                    message: "GitHub deployment completed",
                    path: botPath
                });

            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};