import mongoose from "mongoose";

const botSchema = new mongoose.Schema(
{
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: [
            "online",
            "offline",
            "deploying",
            "error"
        ],
        default: "offline"
    },

    deployType: {
        type: String,
        enum: [
            "github",
            "zip"
        ],
        default: "zip"
    },

    repoUrl: {
        type: String,
        default: ""
    },

    folderPath: {
        type: String,
        default: ""
    },

    sessionPath: {
        type: String,
        default: ""
    },

    logPath: {
        type: String,
        default: ""
    },

    pid: {
        type: Number,
        default: null
    }

},
{
    timestamps: true
});

const Bot = mongoose.model(
    "Bot",
    botSchema
);

export default Bot;