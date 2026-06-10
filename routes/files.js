import express from "express";

import {
    uploadImage,
    uploadZip,
    uploadCreds
} from "../services/uploadService.js";

import express from "express";

const router = express.Router();

router.post("/upload-image", async (req, res) => {
    res.json({
        success: true,
        message: "Image Uploaded"
    });
});

router.post("/upload-zip", async (req, res) => {
    res.json({
        success: true,
        message: "ZIP Uploaded"
    });
});

router.post("/upload-creds", async (req, res) => {
    res.json({
        success: true,
        message: "Creds Uploaded"
    });
});

export default router;