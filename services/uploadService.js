import fs from "fs";
import path from "path";

const uploadsDir = path.join(
    process.cwd(),
    "uploads"
);

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(
        uploadsDir,
        {
            recursive: true
        }
    );
}

export const uploadImage = async (req, res) => {

    try {

        res.json({
            success: true,
            message: "Image uploaded",
            file: req.file || null
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const uploadZip = async (req, res) => {

    try {

        res.json({
            success: true,
            message: "ZIP uploaded",
            file: req.file || null
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const uploadCreds = async (req, res) => {

    try {

        res.json({
            success: true,
            message: "Creds uploaded",
            file: req.file || null
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};