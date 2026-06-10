import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    try {

        const {
            username,
            email,
            password
        } = req.body;

        const existingUser =
            await User.findOne({
                $or: [
                    { email },
                    { username }
                ]
            });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message:
                    "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const user =
            await User.create({
                username,
                email,
                password:
                    hashedPassword
            });

        res.status(201).json({
            success: true,
            message:
                "Account created",
            user: {
                id: user._id,
                username:
                    user.username,
                email:
                    user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                error.message
        });

    }
});

// Login
router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await User.findOne({
                email
            });

        if (!user) {
            return res.status(404).json({
                success: false,
                message:
                    "User not found"
            });
        }

        const match =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!match) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid password"
            });
        }

        const token =
            jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                username:
                    user.username,
                email:
                    user.email,
                role:
                    user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                error.message
        });

    }

});

export default router;