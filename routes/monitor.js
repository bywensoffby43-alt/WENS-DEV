import express from "express";
import { getBotStatus } from "../services/monitorService.js";

const router = express.Router();

router.get("/:name", async (req, res) => {

    try {

        const status =
            await getBotStatus(
                req.params.name
            );

        res.json({
            success: true,
            ...status
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

export default router;