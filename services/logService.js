import fs from "fs";
import path from "path";

const LOGS_DIR = path.join(
    process.cwd(),
    "logs"
);

const ensureLogsDir = () => {

    if (!fs.existsSync(LOGS_DIR)) {
        fs.mkdirSync(LOGS_DIR, {
            recursive: true
        });
    }

};

// Get All Logs
export const getLogs = async (
    req,
    res
) => {

    try {

        ensureLogsDir();

        const logs =
            fs.readdirSync(
                LOGS_DIR
            );

        res.json({
            success: true,
            logs
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                error.message
        });

    }

};

// Get Single Bot Logs
export const getBotLogs = async (
    req,
    res
) => {

    try {

        ensureLogsDir();

        const filePath =
            path.join(
                LOGS_DIR,
                `${req.params.botId}.log`
            );

        if (
            !fs.existsSync(
                filePath
            )
        ) {
            return res.status(404).json({
                success: false,
                message:
                    "Log not found"
            });
        }

        const logs =
            fs.readFileSync(
                filePath,
                "utf8"
            );

        res.json({
            success: true,
            botId:
                req.params.botId,
            logs
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                error.message
        });

    }

};