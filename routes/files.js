import express from "express";

import {
    uploadImage,
    uploadZip,
    uploadCreds
} from "../services/uploadService.js";

const router = express.Router();

// Upload Image
router.post(
    "/upload-image",
    uploadImage
);

// Upload ZIP
router.post(
    "/upload-zip",
    uploadZip
);

// Upload Creds
router.post(
    "/upload-creds",
    uploadCreds
);

export default router;