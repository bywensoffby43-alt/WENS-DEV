import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const SETTINGS_FILE = path.join(
    process.cwd(),
    "data",
    "settings.json"
);

const ensureSettingsFile = () => {

    const dir = path.dirname(
        SETTINGS_FILE
    );

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }

    if (!fs.existsSync(SETTINGS_FILE)) {
        fs.writeFileSync(
            SETTINGS_FILE,
            JSON.stringify(
                {},
                null,
                2
            )
        );
    }

};

// GET SETTINGS
router.get("/", async (req, res) => {

    try {

        ensureSettingsFile();

        const settings =
            JSON.parse(
                fs.readFileSync(
                    SETTINGS_FILE,
                    "utf8"
                )
            );

        res.json({
            success: true,
            settings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

// UPDATE SETTINGS
router.put("/", async (req, res) => {

    try {

        ensureSettingsFile();

        fs.writeFileSync(
            SETTINGS_FILE,
            JSON.stringify(
                req.body,
                null,
                2
            )
        );

        res.json({
            success: true,
            message: "Settings Updated",
            settings: req.body
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

export default router;