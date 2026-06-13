import fs from "fs";
import path from "path";

const CREDS_DIR = path.join(
    process.cwd(),
    "creds"
);

const ensureCredsDir = () => {

    if (!fs.existsSync(CREDS_DIR)) {
        fs.mkdirSync(CREDS_DIR, {
            recursive: true
        });
    }

};

// Save Creds
export const saveCreds = async (
    botId,
    creds
) => {

    ensureCredsDir();

    const filePath = path.join(
        CREDS_DIR,
        `${botId}.json`
    );

    fs.writeFileSync(
        filePath,
        JSON.stringify(
            creds,
            null,
            2
        )
    );

    return {
        success: true,
        filePath
    };

};

// Get Creds
export const getCreds = async (
    botId
) => {

    ensureCredsDir();

    const filePath = path.join(
        CREDS_DIR,
        `${botId}.json`
    );

    if (!fs.existsSync(filePath)) {

        return {
            success: false,
            message: "Creds not found"
        };

    }

    return JSON.parse(
        fs.readFileSync(
            filePath,
            "utf8"
        )
    );

};

// Delete Creds
export const deleteCreds = async (
    botId
) => {

    ensureCredsDir();

    const filePath = path.join(
        CREDS_DIR,
        `${botId}.json`
    );

    if (
        fs.existsSync(filePath)
    ) {
        fs.unlinkSync(filePath);
    }

    return {
        success: true,
        message: "Creds deleted"
    };

};

// Check Creds
export const hasCreds = async (
    botId
) => {

    ensureCredsDir();

    const filePath = path.join(
        CREDS_DIR,
        `${botId}.json`
    );

    return fs.existsSync(
        filePath
    );

};