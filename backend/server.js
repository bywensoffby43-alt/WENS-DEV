import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";
import monitorRoutes from "../routes/monitor.js";

import connectDB from "../config/database.js";

import User from "../models/User.js";

import authRoutes from "../routes/auth.js";
import botRoutes from "../routes/bots.js";
import deployRoutes from "../routes/deploy.js";
import fileRoutes from "../routes/files.js";
import logRoutes from "../routes/logs.js";
import settingsRoutes from "../routes/settings.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Database
//await connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend
app.use(
    express.static(
        path.join(__dirname, "../frontend")
    )
);

// Auto Create Admin
const createAdmin = async () => {
    try {

        const admin = await User.findOne({
            role: "admin"
        });

        if (admin) {
            console.log(
                "👑 Admin already exists"
            );
            return;
        }

        const hashedPassword =
            await bcrypt.hash(
                process.env.ADMIN_PASSWORD,
                10
            );

        await User.create({
            username:
                process.env.ADMIN_USERNAME,
            email:
                process.env.ADMIN_EMAIL,
            password:
                hashedPassword,
            role: "admin"
        });

        console.log(
            "✅ Admin account created"
        );

    } catch (error) {

        console.error(
            "❌ Admin creation error:",
            error.message
        );

    }
};

await createAdmin();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bots", botRoutes);
app.use("/api/deploy", deployRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/settings", settingsRoutes);

// Test Route
app.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "WensCloud Online"
    });
});

// Frontend
app.get("/", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../frontend/index.html"
        )
    );
});

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// Start Server
const PORT =
    process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`
☁️ WensCloud Started

PORT: ${PORT}

🚀 Ready
    `);

});